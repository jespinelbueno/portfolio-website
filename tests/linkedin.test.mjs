import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'
import fs from 'node:fs'
import vm from 'node:vm'
const fallback = [{ title: 'Developer', institution: 'Example', type: 'experience', startYear: 2020, endYear: 'Present', description: 'Saved', details: 'Details' }]
function load(env, fetch) {
  const testModule = { exports: {} }
  const source = ts.transpileModule(fs.readFileSync('lib/linkedin.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  vm.runInNewContext(source, { module: testModule, exports: testModule.exports, process: { env }, fetch, AbortSignal, URLSearchParams, console: { warn() {} }, require(name) {
    if (name === 'server-only') return {}
    if (name === 'next/cache') return { unstable_cache: fn => fn }
    if (name === '@/data/timeline') return { timelineItems: fallback }
    throw Error(name)
  } })
  return testModule.exports.getLinkedInTimeline
}
const configured = { LINKEDIN_API_VERSION: 'test', LINKEDIN_MEMBER_ID: 'owner', LINKEDIN_ACCESS_TOKEN: 'secret' }
const localized = text => ({ localized: { en_US: text } })
test('no configuration avoids network and retains fallback', async () => {
  assert.equal(await load({}, () => { throw Error('Unexpected fetch') })(), fallback)
})
test('API rejection or incorrect member retains fallback', async () => {
  for (const result of [{ ok: false }, { ok: true, json: async () => ({ id: 'someone-else' }) }]) {
    assert.equal(await load(configured, async () => result)(), fallback)
  }
})
test('matching entry retains local details; new education has no invented dates', async () => {
  const items = await load(configured, async () => ({ ok: true, json: async () => ({ id: 'owner',
    primaryCurrentPosition: { title: localized('Developer'), companyName: localized('Example'), startedOn: { year: 2021 } },
    mostRecentEducation: { degreeName: localized('MS'), schoolName: localized('University') },
    basicInfo: { primaryEmailAddress: 'private@example.com' },
  }) }))()
  assert.equal(items.length, 2)
  assert.equal(items[0].startYear, 2021)
  assert.equal(items[0].details, 'Details')
  assert.equal(items[1].startYear, undefined)
  assert.equal(JSON.stringify(items).includes('private@example.com'), false)
})
test('refresh grant stays server-side and uses resulting token', async () => {
  let calls = 0
  const items = await load({ ...configured, LINKEDIN_REFRESH_TOKEN: 'refresh', LINKEDIN_CLIENT_ID: 'client', LINKEDIN_CLIENT_SECRET: 'client-secret' }, async (url, options) => {
    calls++
    if (calls === 1) {
      assert.equal(options.body.get('grant_type'), 'refresh_token')
      return { ok: true, json: async () => ({ access_token: 'renewed' }) }
    }
    assert.equal(options.headers.Authorization, 'Bearer renewed')
    return { ok: true, json: async () => ({ id: 'owner' }) }
  })()
  assert.equal(calls, 2)
  assert.equal(items.length, 1)
})
