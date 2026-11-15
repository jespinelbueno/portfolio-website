import 'server-only'
import { unstable_cache } from 'next/cache'
import { timelineItems, type TimelineItem } from '@/data/timeline'

type Localized = { localized?: Record<string, string>; preferredLocale?: { language: string; country: string } }
type Profile = {
  id?: string
  primaryCurrentPosition?: { title?: Localized; companyName?: Localized; startedOn?: { year?: number } }
  mostRecentEducation?: { degreeName?: Localized; schoolName?: Localized }
}

function label(value?: Localized) {
  const locale = value?.preferredLocale
  return (locale && value?.localized?.[`${locale.language}_${locale.country}`]) || Object.values(value?.localized ?? {})[0] || ''
}

// Only public timeline fields cross the server/client boundary. Tokens and the
// member's email, photo, and other private profile fields are never returned.
const fetchTimeline = unstable_cache(async (): Promise<TimelineItem[]> => {
  let token = process.env.LINKEDIN_ACCESS_TOKEN
  const refreshToken = process.env.LINKEDIN_REFRESH_TOKEN
  if (refreshToken) {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(8000),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken,
        client_id: process.env.LINKEDIN_CLIENT_ID!, client_secret: process.env.LINKEDIN_CLIENT_SECRET! }),
    })
    if (!response.ok) throw new Error('LinkedIn token refresh failed')
    const result = await response.json()
    token = result.access_token
  }
  if (!token) throw new Error('LinkedIn access token missing')
  const response = await fetch('https://api.linkedin.com/rest/identityMe', {
    cache: 'no-store', signal: AbortSignal.timeout(8000),
    headers: { Authorization: `Bearer ${token}`, 'LinkedIn-Version': process.env.LINKEDIN_API_VERSION! },
  })
  if (!response.ok) throw new Error('LinkedIn profile request failed')
  const profile: Profile = await response.json()
  if (!profile.id || profile.id !== process.env.LINKEDIN_MEMBER_ID) throw new Error('LinkedIn member mismatch')
  const current = profile.primaryCurrentPosition
  const education = profile.mostRecentEducation
  const imported: TimelineItem[] = []
  if (label(current?.title) && label(current?.companyName)) imported.push({
    title: label(current?.title), institution: label(current?.companyName),
    startYear: current?.startedOn?.year, endYear: 'Present', type: 'experience', description: '', details: '',
  })
  if (label(education?.degreeName) && label(education?.schoolName)) imported.push({
    title: label(education?.degreeName), institution: label(education?.schoolName),
    type: 'education', description: '', details: '',
  })
  // Match both title and institution: never attach old dates or descriptions to
  // a different role or degree. Older history remains manually maintained.
  const normalize = (value: string) => value.trim().toLowerCase()
  const matches = (a: TimelineItem, b: TimelineItem) => a.type === b.type &&
    normalize(a.title) === normalize(b.title) && normalize(a.institution) === normalize(b.institution)
  return [...imported.map(item => {
    const existing = timelineItems.find(old => matches(old, item))
    return existing ? { ...existing, ...item, startYear: item.startYear ?? existing.startYear,
      endYear: item.endYear ?? existing.endYear, description: existing.description, details: existing.details } : item
  }), ...timelineItems.filter(old => !imported.some(item => matches(old, item)))]
}, ['linkedin-timeline-v1'], { revalidate: 3600 })

export async function getLinkedInTimeline(): Promise<TimelineItem[]> {
  if (!process.env.LINKEDIN_API_VERSION || !process.env.LINKEDIN_MEMBER_ID ||
    (!process.env.LINKEDIN_ACCESS_TOKEN && !process.env.LINKEDIN_REFRESH_TOKEN)) return timelineItems
  if (process.env.LINKEDIN_REFRESH_TOKEN &&
    (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET)) return timelineItems
  try { return await fetchTimeline() } catch {
    console.warn('LinkedIn timeline unavailable; using local timeline. Check API access, member ID and token expiry.')
    return timelineItems
  }
}
