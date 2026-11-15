'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { timelineItems, type TimelineItem } from '@/data/timeline'

type Filter = 'all' | TimelineItem['type']

const filters = [
  { value: 'all', label: 'All' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
] as const

function itemKey(item: TimelineItem) {
  return `${item.type}-${item.institution}-${item.title}-${item.startYear ?? ''}`
}

export function EducationExperience({ items = timelineItems }: { items?: TimelineItem[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const sectionId = useId()
  const reducedMotion = useReducedMotion()
  const visibleItems = items.filter(item => filter === 'all' || item.type === filter)

  function toggleItem(key: string) {
    setExpandedItems(previous => previous.includes(key)
      ? previous.filter(item => item !== key)
      : [...previous, key])
  }

  return (
    <section
      id="education-experience"
      aria-labelledby={`${sectionId}-heading`}
      className="section-grid w-full border-t border-slate-800 bg-gradient-to-r from-black to-slate-900 py-16 text-white sm:py-24"
    >
      <div className="portfolio-container relative">
        <p className="eyebrow mb-5">Background</p>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h2 id={`${sectionId}-heading`} className="section-title max-w-lg">
            Education &amp; Experience
          </h2>
          <p className="max-w-lg text-base leading-7 text-slate-400">
            A foundation in software engineering. A focus on healthcare data.
            The experience that connects the two.
          </p>
        </div>

        <div role="group" aria-label="Filter education and experience" className="mt-10 flex gap-6 sm:mt-12 sm:gap-8">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`relative -mb-px min-h-12 border-b-2 pb-4 pt-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900 ${filter === value
                ? 'border-white text-white'
                : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">Showing {visibleItems.length} {filter === 'all' ? 'education and experience entries' : `${filter} entries`}.</p>

        <ol className="mt-7 grid gap-4">
          {visibleItems.map(item => {
            const key = itemKey(item)
            const expanded = expandedItems.includes(key)
            const detailsId = `${sectionId}-${encodeURIComponent(key)}`
            const isCurrent = item.endYear === 'Present'
            const date = item.dateLabel ?? [item.startYear, item.endYear].filter(Boolean).join(' – ')

            return (
              <li key={key} className="border border-slate-700/70 bg-slate-900/40 transition-colors hover:border-slate-500">
                <article className="grid gap-4 p-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-x-8 sm:p-8 lg:grid-cols-[160px_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-10">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-6 sm:block">
                    <p className="text-slate-400">{date}</p>
                    <p className={`sm:mt-2 ${isCurrent ? 'text-gray-200' : 'text-slate-500'}`}>
                      {isCurrent ? 'Current role' : item.type === 'education' ? 'Education' : 'Experience'}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-medium leading-snug tracking-[-0.025em] sm:text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.institution}</p>
                  </div>
                  <div className="min-w-0 sm:col-start-2 lg:col-start-auto">
                    <p className="max-w-xl text-sm leading-7 text-slate-300">{item.description}</p>
                    {item.details && (
                      <>
                        <div id={detailsId}>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="max-w-xl pt-4 text-sm leading-7 text-slate-400">{item.details}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={detailsId}
                          aria-label={`${expanded ? 'Hide' : 'Read'} details about ${item.title} at ${item.institution}`}
                          onClick={() => toggleItem(key)}
                          className="mt-2 min-h-11 rounded-sm text-xs font-medium text-gray-200 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-900"
                        >
                          {expanded ? 'Show less' : 'Read more'}
                        </button>
                      </>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
        {visibleItems.length === 0 && <p className="py-10 text-sm text-slate-400">No entries to show yet.</p>}
      </div>
    </section>
  )
}
