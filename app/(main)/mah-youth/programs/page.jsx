'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Helpers ───────────────────────────────────────────────────────────────────

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${m ?? '00'} ${suffix}`
}

function getRecurrenceLabel(program) {
  const { recurrenceType, dayOfWeek, weekPattern, dayOfMonth } = program

  if (recurrenceType === 'weekly') {
    return `Every ${DAYS[dayOfWeek]}`
  }
  if (recurrenceType === 'bi-weekly') {
    const half = weekPattern === '1,2' ? 'Weeks 1–2' : weekPattern === '3,4' ? 'Weeks 3–4' : 'All weeks'
    return `Bi-weekly · ${DAYS_SHORT[dayOfWeek]}s (${half})`
  }
  if (recurrenceType === 'monthly') {
    const suffix = ordinalSuffix(dayOfMonth)
    return `Monthly · ${dayOfMonth}${suffix} of each month`
  }
  return ''
}

function ordinalSuffix(d) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

function getNextOccurrenceText(program) {
  const now = new Date()
  const currentDay = now.getDay()

  if (program.recurrenceType === 'weekly') {
    let diff = program.dayOfWeek - currentDay
    if (diff <= 0) diff += 7
    if (diff === 7) return 'Today'
    if (diff === 1) return 'Tomorrow'
    return `In ${diff} days · ${DAYS[program.dayOfWeek]}`
  }

  if (program.recurrenceType === 'bi-weekly') {
    let diff = program.dayOfWeek - currentDay
    if (diff <= 0) diff += 7
    return `Next ${DAYS_SHORT[program.dayOfWeek]} (bi-weekly)`
  }

  if (program.recurrenceType === 'monthly') {
    const next = new Date(now.getFullYear(), now.getMonth(), program.dayOfMonth)
    if (next <= now) next.setMonth(next.getMonth() + 1)
    const diff = Math.ceil((next - now) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Tomorrow'
    return `In ${diff} days`
  }

  return ''
}

function spotsLeft(capacity, current) {
  if (!capacity) return null
  return Math.max(0, capacity - (current ?? 0))
}

// ─── Frequency badge config ────────────────────────────────────────────────────

const FREQ_STYLES = {
  weekly:    { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400', label: 'Weekly'    },
  'bi-weekly': { bg: 'bg-sky-100',     text: 'text-sky-700',     dot: 'bg-sky-400',     label: 'Bi-Weekly' },
  monthly:   { bg: 'bg-violet-100',  text: 'text-violet-700',  dot: 'bg-violet-400',  label: 'Monthly'   },
}

const CATEGORY_STYLES = {
  Social:    { bg: 'bg-amber-100',   text: 'text-amber-700'   },
  Sports:    { bg: 'bg-orange-100',  text: 'text-orange-700'  },
  Education: { bg: 'bg-indigo-100',  text: 'text-indigo-700'  },
  Religious: { bg: 'bg-teal-100',    text: 'text-teal-700'    },
  Arts:      { bg: 'bg-pink-100',    text: 'text-pink-700'    },
  Health:    { bg: 'bg-lime-100',    text: 'text-lime-700'    },
  Other:     { bg: 'bg-gray-100',    text: 'text-gray-600'    },
}

function getCategoryStyle(cat) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.Other
}

// ─── Day indicator strip ───────────────────────────────────────────────────────

function DayStrip({ program }) {
  if (program.recurrenceType === 'monthly') {
    return (
      <div className="flex gap-1 mt-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 text-xs text-black/50 font-medium">
          <span>Day {program.dayOfMonth}{ordinalSuffix(program.dayOfMonth)}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-1 mt-3">
      {DAYS_SHORT.map((day, i) => {
        const isActive = i === program.dayOfWeek
        return (
          <div
            key={day}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
              isActive
                ? 'bg-black text-white scale-110'
                : 'bg-black/6 text-black/25'
            }`}
          >
            {day[0]}
          </div>
        )
      })}
    </div>
  )
}

// ─── Program Card ──────────────────────────────────────────────────────────────

function ProgramCard({ program, index }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const freqStyle = FREQ_STYLES[program.recurrenceType] ?? FREQ_STYLES.weekly
  const catStyle = getCategoryStyle(program.category)
  const spots = spotsLeft(program.capacity, program.currentAttendees)
  const full = spots === 0
  const almostFull = spots !== null && spots <= 5 && spots > 0
  const nextText = getNextOccurrenceText(program)

  return (
    <motion.article
      layout
      className="relative flex flex-col rounded-3xl overflow-hidden bg-white border border-black/8 cursor-pointer"
      style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.07)' }}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, scale: 1.02, transition: { duration: 0.28, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => router.push(`/programs/${program._id}`)}
    >
      {/* ── Image ── */}
      <div className="relative w-full h-44 overflow-hidden bg-black/5">
        {program.imageUrl ? (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image src={program.imageUrl} alt={program.title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/10 to-black/20 flex items-center justify-center">
            <span className="text-5xl opacity-25">🗓️</span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div className="absolute inset-0 bg-black/20" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }} />

        {/* Frequency badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${freqStyle.bg} ${freqStyle.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${freqStyle.dot} ${program.recurrenceType === 'weekly' ? 'animate-pulse' : ''}`} />
          {freqStyle.label}
        </div>

        {/* Category badge */}
        {program.category && (
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text}`}>
            {program.category}
          </div>
        )}

        {/* Inactive overlay */}
        {!program.isActive && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">Paused</span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Title */}
        <h2 className="text-lg font-bold text-black leading-snug line-clamp-2">{program.title}</h2>

        {/* Host */}
        {program.host && (
          <p className="text-xs text-black/40 font-medium flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            {program.host}
          </p>
        )}

        {/* Schedule row */}
        <div className="flex items-center gap-2 text-xs text-black/50 font-medium flex-wrap mt-0.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>{formatTime(program.startTime)} – {formatTime(program.endTime)}</span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span>{getRecurrenceLabel(program)}</span>
        </div>

        {/* Location */}
        {program.location && (
          <p className="text-xs text-black/45 flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="truncate">{program.location}</span>
          </p>
        )}

        {/* Day strip */}
        <DayStrip program={program} />

        {/* Next occurrence chip */}
        {program.isActive && nextText && (
          <motion.div
            className="mt-1 inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-black/5 text-xs text-black/55 font-medium"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.07 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Next: {nextText}
          </motion.div>
        )}

        {/* Capacity bar */}
        {program.capacity > 0 && (
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-black/35">{program.currentAttendees ?? 0} attending</span>
              <span className={`font-semibold ${full ? 'text-red-500' : almostFull ? 'text-orange-500' : 'text-black/35'}`}>
                {full ? 'Full' : almostFull ? `${spots} spots left!` : `${spots} open`}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-black/8 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${full ? 'bg-red-400' : almostFull ? 'bg-orange-400' : 'bg-emerald-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, ((program.currentAttendees ?? 0) / program.capacity) * 100)}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        {program.price > 0 && (
          <p className="text-sm font-bold text-black/60 mt-1">${program.price.toFixed(2)} / session</p>
        )}

        <div className="flex-1" />

        {/* Register button */}
        <motion.button
          className="mt-2 w-full rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            backgroundColor: !program.isActive || full ? 'transparent' : 'var(--color-yPrimary, #f5c842)',
            border: !program.isActive || full ? '1.5px solid rgba(0,0,0,0.12)' : 'none',
            color: !program.isActive || full ? 'rgba(0,0,0,0.3)' : '#000',
            cursor: !program.isActive || full ? 'not-allowed' : 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (program.isActive && !full) router.push(`/programs/${program._id}/register`)
          }}
          whileHover={program.isActive && !full ? { scale: 1.03 } : {}}
          whileTap={program.isActive && !full ? { scale: 0.97 } : {}}
        >
          {program.isActive && !full && (
            <motion.span
              className="absolute inset-0 bg-white/30"
              initial={{ x: '-100%', skewX: '-20deg' }}
              whileHover={{ x: '160%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          )}
          <span className="relative z-10">
            {!program.isActive ? 'Currently Paused' : full ? 'Program Full' : 'Join Program'}
          </span>
          {program.isActive && !full && (
            <motion.span className="relative z-10" animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.25 }}>→</motion.span>
          )}
        </motion.button>
      </div>
    </motion.article>
  )
}

// ─── Filter Pill ───────────────────────────────────────────────────────────────

function FilterPill({ label, active, onClick, accent }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
        active
          ? accent ?? 'bg-black text-white border-black'
          : 'bg-white text-black/50 border-black/10 hover:border-black/25 hover:text-black/70'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  )
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ search }) {
  return (
    <motion.div
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-6xl mb-4 opacity-40">📋</div>
      <h3 className="text-xl font-bold text-black/60 mb-2">No programs found</h3>
      <p className="text-sm text-black/35 max-w-xs">
        {search ? `No results for "${search}". Try adjusting your search or filters.` : 'No programs match your current filters.'}
      </p>
    </motion.div>
  )
}

// ─── Schedule Overview ─────────────────────────────────────────────────────────
// Mini weekly view showing which days have active programs

function WeeklyOverview({ programs }) {
  const activeWeekly = programs.filter(p => p.isActive && (p.recurrenceType === 'weekly' || p.recurrenceType === 'bi-weekly'))
  const byDay = {}
  activeWeekly.forEach(p => {
    if (!byDay[p.dayOfWeek]) byDay[p.dayOfWeek] = []
    byDay[p.dayOfWeek].push(p)
  })

  const today = new Date().getDay()

  return (
    <motion.div
      className="w-full bg-white border border-black/8 rounded-3xl p-5 mb-8"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-4">Weekly Schedule</p>
      <div className="grid grid-cols-7 gap-2">
        {DAYS_SHORT.map((day, i) => {
          const count = byDay[i]?.length ?? 0
          const isToday = i === today
          return (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className={`text-xs font-bold ${isToday ? 'text-black' : 'text-black/30'}`}>{day}</span>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                isToday
                  ? 'bg-black text-white ring-4 ring-black/10'
                  : count > 0
                    ? 'bg-black/8 text-black'
                    : 'bg-black/3 text-black/20'
              }`}>
                {count > 0 ? count : '–'}
              </div>
              {count > 0 && (
                <div className="flex flex-col gap-1 w-full">
                  {byDay[i].slice(0, 2).map(p => (
                    <div key={p._id} className="h-1 rounded-full bg-black/15 w-full" title={p.title} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="mt-36 min-h-screen px-4 max-w-6xl mx-auto">
      <div className="h-10 w-48 bg-black/6 rounded-2xl mb-4 animate-pulse" />
      <div className="h-5 w-72 bg-black/4 rounded-xl mb-10 animate-pulse" />
      <div className="h-24 w-full bg-black/4 rounded-3xl mb-8 animate-pulse" />
      <div className="h-12 w-full bg-black/5 rounded-2xl mb-4 animate-pulse" />
      <div className="flex gap-2 mb-8">{[1,2,3,4].map(i => <div key={i} className="h-7 w-20 bg-black/5 rounded-full animate-pulse" />)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="rounded-3xl overflow-hidden bg-white border border-black/8 animate-pulse" style={{ height: 420 }}>
            <div className="h-44 bg-black/6" />
            <div className="p-5 flex flex-col gap-3">
              <div className="h-5 w-3/4 bg-black/8 rounded-xl" />
              <div className="h-3 w-1/2 bg-black/5 rounded-full" />
              <div className="h-3 w-2/3 bg-black/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeFreq, setActiveFreq] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [showInactive, setShowInactive] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/programs') // adjust to your API route
        const data = await res.json()
        setPrograms(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const categories = useMemo(() => {
    return [...new Set(programs.map(p => p.category).filter(Boolean))].sort()
  }, [programs])

  const filtered = useMemo(() => {
    return programs.filter(p => {
      if (!showInactive && !p.isActive) return false
      if (activeFreq !== 'all' && p.recurrenceType !== activeFreq) return false
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.host?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [programs, search, activeFreq, activeCategory, showInactive])

  const activePrograms = useMemo(() => programs.filter(p => p.isActive), [programs])

  if (loading) return <Skeleton />

  return (
    <div className="mt-36 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-1">Mah Youth</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-3">Programs</h1>
          <p className="text-base text-black/50 max-w-lg">
            Ongoing weekly, bi-weekly, and monthly programs open to the community.
          </p>
        </motion.div>

        {/* ── Weekly overview ── */}
        <WeeklyOverview programs={activePrograms} />

        {/* ── Search ── */}
        <motion.div
          className="mb-4 relative group"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black/30 group-focus-within:text-black/60 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search programs, hosts, locations…"
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-black/10 text-sm text-black placeholder-black/30 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all"
          />
          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                className="absolute inset-y-0 right-3 flex items-center px-1 text-black/30 hover:text-black/60"
                onClick={() => setSearch('')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6 items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {/* Frequency */}
          <FilterPill label="All" active={activeFreq === 'all'} onClick={() => setActiveFreq('all')} />
          <FilterPill label="Weekly"    active={activeFreq === 'weekly'}    onClick={() => setActiveFreq('weekly')}    accent="bg-emerald-500 text-white border-emerald-500" />
          <FilterPill label="Bi-Weekly" active={activeFreq === 'bi-weekly'} onClick={() => setActiveFreq('bi-weekly')} accent="bg-sky-500 text-white border-sky-500" />
          <FilterPill label="Monthly"   active={activeFreq === 'monthly'}   onClick={() => setActiveFreq('monthly')}   accent="bg-violet-500 text-white border-violet-500" />

          {categories.length > 0 && <div className="w-px h-5 bg-black/10 mx-1 hidden sm:block" />}

          {categories.map(cat => (
            <FilterPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(activeCategory === cat ? 'all' : cat)} />
          ))}

          <div className="w-px h-5 bg-black/10 mx-1 hidden sm:block" />

          {/* Show paused toggle */}
          <motion.button
            onClick={() => setShowInactive(v => !v)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              showInactive ? 'bg-black/80 text-white border-black/80' : 'bg-white text-black/40 border-black/10 hover:border-black/25'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {showInactive ? '✓ Showing Paused' : 'Show Paused'}
          </motion.button>
        </motion.div>

        {/* ── Count ── */}
        <motion.p className="text-xs text-black/35 mb-5 font-medium" key={filtered.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {filtered.length === 0 ? 'No programs' : `${filtered.length} program${filtered.length === 1 ? '' : 's'}`}
        </motion.p>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0
              ? <EmptyState search={search} />
              : filtered.map((p, i) => <ProgramCard key={p._id} program={p} index={i} />)
            }
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  )
}