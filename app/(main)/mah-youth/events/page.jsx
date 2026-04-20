'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(t) {
  // t is a string like "14:30" or "2:30 PM"
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 || 12
  return `${display}:${m ?? '00'} ${suffix}`
}

function spotsLeft(capacity, registered) {
  if (!capacity) return null
  return Math.max(0, capacity - (registered ?? 0))
}

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_STYLES = {
  Social:    { bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-400'   },
  Volunteer: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  Workshop:  { bg: 'bg-sky-100',     text: 'text-sky-700',     dot: 'bg-sky-400'     },
  Sports:    { bg: 'bg-orange-100',  text: 'text-orange-700',  dot: 'bg-orange-400'  },
  Education: { bg: 'bg-violet-100',  text: 'text-violet-700',  dot: 'bg-violet-400'  },
  Religious: { bg: 'bg-teal-100',    text: 'text-teal-700',    dot: 'bg-teal-400'    },
  Other:     { bg: 'bg-gray-100',    text: 'text-gray-600',    dot: 'bg-gray-400'    },
}

function getCategoryStyle(cat) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.Other
}

// ─── Single Event Card ─────────────────────────────────────────────────────────

function EventCard({ event, index }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const cs = getCategoryStyle(event.category)
  const spots = spotsLeft(event.capacity, event.registeredAttendees)
  const full = spots === 0
  const almostFull = spots !== null && spots <= 5 && spots > 0
  const isPast = new Date(event.date) < new Date()

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
      onClick={() => router.push(`/events/${event._id}`)}
    >
      {/* ── Image ── */}
      <div className="relative w-full h-48 overflow-hidden bg-black/5">
        {event.imageUrl ? (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image src={event.imageUrl} alt={event.title} fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />
          </motion.div>
        ) : (
          // Placeholder gradient when no image
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/10 to-black/20 flex items-center justify-center">
            <span className="text-5xl opacity-30">📅</span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Online badge */}
        {event.isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        )}

        {/* Category pill */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cs.bg} ${cs.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cs.dot}`} />
          {event.category}
        </div>

        {/* Past overlay */}
        {isPast && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">Past Event</span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Date + time */}
        <div className="flex items-center gap-2 text-xs text-black/40 font-medium">
          <span>{formatDate(event.date)}</span>
          {event.startTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <span>{formatTime(event.startTime)}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-black leading-snug line-clamp-2">{event.title}</h2>

        {/* Location */}
        {event.location && (
          <p className="text-xs text-black/50 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="truncate">{event.location}</span>
          </p>
        )}

        {/* Capacity bar */}
        {event.capacity > 0 && (
          <div className="mt-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-black/40">{event.registeredAttendees ?? 0} registered</span>
              <span className={`font-semibold ${full ? 'text-red-500' : almostFull ? 'text-orange-500' : 'text-black/40'}`}>
                {full ? 'Full' : almostFull ? `${spots} left!` : `${spots} spots left`}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-black/8 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${full ? 'bg-red-400' : almostFull ? 'bg-orange-400' : 'bg-emerald-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, ((event.registeredAttendees ?? 0) / event.capacity) * 100)}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}

        {/* Price */}
        {event.price > 0 && (
          <p className="text-sm font-bold text-black/70">${event.price.toFixed(2)}</p>
        )}

        <div className="flex-1" />

        {/* Register button */}
        <motion.button
          className="mt-2 w-full rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            backgroundColor: full || isPast ? 'transparent' : 'var(--color-yPrimary, #f5c842)',
            border: full || isPast ? '1.5px solid rgba(0,0,0,0.12)' : 'none',
            color: full || isPast ? 'rgba(0,0,0,0.35)' : '#000',
            cursor: full || isPast ? 'not-allowed' : 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation()
            if (!full && !isPast) router.push(`/events/${event._id}/register`)
          }}
          whileHover={!full && !isPast ? { scale: 1.03 } : {}}
          whileTap={!full && !isPast ? { scale: 0.97 } : {}}
        >
          {/* shimmer */}
          {!full && !isPast && (
            <motion.span
              className="absolute inset-0 bg-white/30"
              initial={{ x: '-100%', skewX: '-20deg' }}
              whileHover={{ x: '160%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
          )}
          <span className="relative z-10">
            {isPast ? 'Event Ended' : full ? 'Registration Closed' : 'Register Now'}
          </span>
          {!full && !isPast && (
            <motion.span
              className="relative z-10"
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.25 }}
            >→</motion.span>
          )}
        </motion.button>
      </div>
    </motion.article>
  )
}

// ─── Search + Filter Bar ───────────────────────────────────────────────────────

function FilterBar({ search, setSearch, activeCategory, setActiveCategory, activeTime, setActiveTime, categories }) {
  const inputRef = useRef(null)

  const timeFilters = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Past', value: 'past' },
  ]

  return (
    <motion.div
      className="w-full flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Search input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black/30 group-focus-within:text-black/60 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-black/10 text-sm text-black placeholder-black/30 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all"
          style={{ fontFamily: 'inherit' }}
        />
        <AnimatePresence>
          {search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="absolute inset-y-0 right-3 flex items-center px-1 text-black/30 hover:text-black/60 transition-colors"
              onClick={() => { setSearch(''); inputRef.current?.focus() }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter pills row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <FilterPill label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
          {categories.map(cat => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              style={getCategoryStyle(cat)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-black/10 mx-1 hidden sm:block" />

        {/* Time filters */}
        <div className="flex flex-wrap gap-2">
          {timeFilters.map(tf => (
            <FilterPill
              key={tf.value}
              label={tf.label}
              active={activeTime === tf.value}
              onClick={() => setActiveTime(tf.value)}
              variant="time"
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FilterPill({ label, active, onClick, style, variant }) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
        active
          ? variant === 'time'
            ? 'bg-black text-white border-black'
            : style
              ? `${style.bg} ${style.text} border-transparent`
              : 'bg-black text-white border-black'
          : 'bg-white text-black/50 border-black/10 hover:border-black/25 hover:text-black/70'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {active && (
        <motion.span
          layoutId={`pill-${variant ?? 'cat'}`}
          className="absolute inset-0 rounded-full"
          style={{ zIndex: -1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
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
      transition={{ duration: 0.5 }}
    >
      <div className="text-6xl mb-4 opacity-40">🔍</div>
      <h3 className="text-xl font-bold text-black/60 mb-2">No events found</h3>
      <p className="text-sm text-black/35 max-w-xs">
        {search ? `No results for "${search}". Try different keywords or filters.` : 'No events match your current filters.'}
      </p>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTime, setActiveTime] = useState('upcoming')
  const shouldReduceMotion = useReducedMotion()

  // ── Fetch events ──
  useEffect(() => {
    async function load() {
      try {
      const res = await fetch('/api/events')
      const data = await res.json()
      setEvents(data.events ?? [])  // ✅ Correct
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // ── Derived categories from data ──
  const categories = useMemo(() => {
    const cats = [...new Set(events.map(e => e.category).filter(Boolean))]
    return cats.sort()
  }, [events])

  // ── Filtering ──
  const filtered = useMemo(() => {
    const now = new Date()
    const weekEnd = new Date(now); weekEnd.setDate(now.getDate() + 7)
    const monthEnd = new Date(now); monthEnd.setMonth(now.getMonth() + 1)

    return events.filter(ev => {
      const evDate = new Date(ev.date)

      // search
      if (search) {
        const q = search.toLowerCase()
        const inTitle = ev.title?.toLowerCase().includes(q)
        const inLocation = ev.location?.toLowerCase().includes(q)
        const inCategory = ev.category?.toLowerCase().includes(q)
        const inDescription = ev.description?.toLowerCase().includes(q)
        if (!inTitle && !inLocation && !inCategory && !inDescription) return false
      }

      // category
      if (activeCategory !== 'all' && ev.category !== activeCategory) return false

      // time
      if (activeTime === 'upcoming' && evDate < now) return false
      if (activeTime === 'week' && (evDate < now || evDate > weekEnd)) return false
      if (activeTime === 'month' && (evDate < now || evDate > monthEnd)) return false
      if (activeTime === 'past' && evDate >= now) return false

      return true
    }).sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [events, search, activeCategory, activeTime])

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="mt-36 min-h-screen px-4 max-w-6xl mx-auto">
        <div className="h-10 w-48 bg-black/6 rounded-2xl mb-4 animate-pulse" />
        <div className="h-5 w-72 bg-black/4 rounded-xl mb-10 animate-pulse" />
        <div className="h-12 w-full bg-black/5 rounded-2xl mb-4 animate-pulse" />
        <div className="flex gap-2 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="h-7 w-20 bg-black/5 rounded-full animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-3xl overflow-hidden bg-white border border-black/8 animate-pulse" style={{ height: 360 }}>
              <div className="h-48 bg-black/6" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-24 bg-black/6 rounded-full" />
                <div className="h-5 w-3/4 bg-black/8 rounded-xl" />
                <div className="h-3 w-1/2 bg-black/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-36 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Page Header ── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-1">Mah Youth</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-3">Events</h1>
          <p className="text-base text-black/50 max-w-lg">
            Join us for upcoming events, workshops, and community gatherings.
          </p>
        </motion.div>

        {/* ── Filter bar ── */}
        <div className="mb-8">
          <FilterBar
            search={search}
            setSearch={setSearch}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeTime={activeTime}
            setActiveTime={setActiveTime}
            categories={categories}
          />
        </div>

        {/* ── Results count ── */}
        <motion.p
          className="text-xs text-black/35 mb-5 font-medium"
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.length === 0 ? 'No events' : `${filtered.length} event${filtered.length === 1 ? '' : 's'}`}
        </motion.p>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0
              ? <EmptyState search={search} />
              : filtered.map((ev, i) => (
                  <EventCard key={ev._id} event={ev} index={i} />
                ))
            }
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  )
}