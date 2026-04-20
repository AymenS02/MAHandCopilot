'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const tagColors = {
  Social:    { bg: 'bg-amber-100',   text: 'text-amber-700'   },
  Volunteer: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Workshop:  { bg: 'bg-sky-100',     text: 'text-sky-700'     },
  Sports:    { bg: 'bg-orange-100',  text: 'text-orange-700'  },
  Education: { bg: 'bg-violet-100',  text: 'text-violet-700'  },
  Religious: { bg: 'bg-teal-100',    text: 'text-teal-700'    },
  Other:     { bg: 'bg-gray-100',    text: 'text-gray-600'    },
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function EventCard({ event, index }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const colors = tagColors[event.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' }

  return (
    <motion.article
      className="relative flex flex-col rounded-3xl overflow-hidden bg-white border border-black/8 shadow-md cursor-pointer select-none"
      style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => router.push(`/events/${event._id}`)}
    >
      {/* Image area */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-black/5">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/10 to-black/20 flex items-center justify-center">
              <span className="text-5xl opacity-30">📅</span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-black/20"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {event.category}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <p className="text-xs text-black/40 font-medium uppercase tracking-widest">{formatDate(event.date)}</p>
        <h2 className="text-lg font-bold text-black leading-snug">{event.title}</h2>
        <div className="flex-1" />

        <motion.button
          className="mt-1 w-full rounded-xl py-2.5 text-sm font-semibold text-black flex items-center justify-center gap-2 relative overflow-hidden"
          style={{ backgroundColor: 'var(--color-yPrimary, #f5c842)' }}
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/mah-youth/events/${event._id}/register`)
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
        >
          <motion.span
            className="absolute inset-0 bg-white/30"
            initial={{ x: '-100%', skewX: '-20deg' }}
            whileHover={{ x: '160%' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          />
          <span className="relative z-10">Register Now</span>
          <motion.span
            className="relative z-10 text-base"
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.25 }}
          >→</motion.span>
        </motion.button>
      </div>
    </motion.article>
  )
}

// Skeleton card for loading state
function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-black/8 animate-pulse" style={{ height: 340 }}>
      <div className="h-48 bg-black/6" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-24 bg-black/6 rounded-full" />
        <div className="h-5 w-3/4 bg-black/8 rounded-xl" />
        <div className="h-10 w-full bg-black/5 rounded-xl mt-4" />
      </div>
    </div>
  )
}

export default function HighlightedEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/events')
        const data = await res.json()

        const sorted = (data.events ?? [])
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // farthest (latest) first
          .slice(0, 3)

        setEvents(sorted)
      } catch (err) {
        console.error('Failed to load highlighted events:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Don't render the section at all if no events after loading
  if (!loading && events.length === 0) return null

  return (
    <section className="w-full max-w-5xl px-4 mx-auto mt-16 pb-24">
      <motion.div
        className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-1">Upcoming</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Highlighted Events</h2>
        </div>

        <motion.a
          href="/mah-youth/events"
          className="text-sm font-semibold text-black/50 hover:text-black transition-colors flex items-center gap-1.5 group"
          whileHover={{ x: 4 }}
        >
          View all events
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </motion.a>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [1, 2, 3].map(i => <SkeletonCard key={i} />)
          : events.map((event, i) => (
              <EventCard key={event._id} event={event} index={i} />
            ))
        }
      </div>
    </section>
  )
}