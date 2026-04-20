'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Clock, Users, DollarSign, Video, User, ArrowLeft, CheckCircle, Infinity } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { isRegistrationDeadlinePassed } from '/lib/utils/eventUtils'

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

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  })
}

function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hour = parseInt(h)
  return `${hour % 12 || 12}:${m ?? '00'} ${hour >= 12 ? 'PM' : 'AM'}`
}

// ── Detail tile used in the info grid ──────────────────────────────────────
function DetailTile({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/[0.03] border border-black/6">
      <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Icon className="w-4 h-4 text-black/40" />
      </div>
      <div>
        <p className="text-xs text-black/35 uppercase tracking-widest font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-black leading-snug">{value}</p>
      </div>
    </div>
  )
}

// ── Section card ────────────────────────────────────────────────────────────
function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-3xl border border-black/8 p-6 ${className}`} style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
      {children}
    </div>
  )
}

export default function EventDetailsPage() {
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const eventId = params.id

  useEffect(() => {
    if (eventId) fetchEvent()
  }, [eventId])

  const fetchEvent = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/events/${eventId}`)
      const data = await res.json()
      if (res.ok) setEvent(data.event)
      else console.error('Failed to fetch event:', data.error)
    } catch (err) {
      console.error('Error fetching event:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = () => { window.scrollTo(0, 0); router.push(`/mah-youth/events/${eventId}/register`) }
  const handleBack = () => { window.scrollTo(0, 0); router.push('/mah-youth/events') }

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="mt-36 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black/50 animate-spin" />
          <p className="text-sm text-black/40 font-medium">Loading event...</p>
        </div>
      </div>
    )
  }

  // ── Not found ──
  if (!event) {
    return (
      <div className="mt-36 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4 opacity-30">📅</div>
          <h2 className="text-2xl font-bold text-black mb-2">Event not found</h2>
          <button onClick={handleBack} className="mt-4 px-5 py-2.5 rounded-2xl bg-black text-white text-sm font-semibold hover:bg-black/80 transition-colors">
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  const cs = getCategoryStyle(event.category)
  const isUnlimitedCapacity = event.capacity === 0
  const spotsRemaining = isUnlimitedCapacity ? null : event.capacity - (event.registeredAttendees || 0)
  const isFull = !isUnlimitedCapacity && spotsRemaining <= 0
  const isDeadlinePassed = isRegistrationDeadlinePassed(event.registrationDeadline)
  const isPast = new Date(event.date) < new Date()
  const registrationClosed = isFull || isDeadlinePassed || isPast
  const fillPct = isUnlimitedCapacity ? 0 : Math.min(((event.registeredAttendees || 0) / event.capacity) * 100, 100)

  return (
    <div className="mt-36 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Back button */}
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors mb-8 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to events
        </motion.button>

        {/* Hero image */}
        <motion.div
          className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden mb-8 bg-black/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {event.imageUrl ? (
            <Image src={event.imageUrl} alt={event.title} fill className="object-cover" sizes="100vw" priority />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/10 to-black/20 flex items-center justify-center">
              <span className="text-8xl opacity-20">📅</span>
            </div>
          )}

          {/* Scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Category pill */}
          <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cs.bg} ${cs.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cs.dot}`} />
            {event.category}
          </div>

          {/* Online badge */}
          {event.isOnline && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
              <Video className="w-3.5 h-3.5" />
              Online
            </div>
          )}

          {/* Past overlay */}
          {isPast && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">Past Event</span>
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-sm">
              {event.title}
            </h1>
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left column ── */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* About */}
            <Card>
              <h2 className="text-lg font-bold text-black mb-3">About this event</h2>
              <p className="text-sm text-black/60 leading-relaxed whitespace-pre-line">{event.description}</p>
            </Card>

            {/* Event details grid */}
            <Card>
              <h2 className="text-lg font-bold text-black mb-4">Event details</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <DetailTile icon={Calendar} label="Date" value={formatDate(event.date)} />
                <DetailTile icon={Clock} label="Time" value={`${formatTime(event.startTime)} – ${formatTime(event.endTime)}`} />
                <DetailTile icon={MapPin} label="Location" value={event.location} />
                <DetailTile icon={DollarSign} label="Price" value={event.price === 0 ? 'Free' : `$${event.price} CAD`} />
              </div>
            </Card>

            {/* Speakers */}
            {event.speakers?.length > 0 && (
              <Card>
                <h2 className="text-lg font-bold text-black mb-4">Featured speakers</h2>
                <div className="flex flex-col gap-3">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-black/[0.03] border border-black/6">
                      <div className="w-9 h-9 rounded-full bg-black/8 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-black/40" />
                      </div>
                      <span className="text-sm font-semibold text-black">{speaker}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>

          {/* ── Right column — registration card ── */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-32 flex flex-col gap-4">
              <Card>
                <h3 className="text-base font-bold text-black mb-4">Registration</h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-4xl font-bold text-black">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                  {event.price > 0 && <span className="text-sm text-black/40">CAD / person</span>}
                </div>

                {/* Capacity */}
                {isUnlimitedCapacity ? (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 mb-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Infinity className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-emerald-700">Unlimited capacity</p>
                      <p className="text-xs text-emerald-600">{event.registeredAttendees || 0} registered</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-black/40 mb-1.5">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.registeredAttendees || 0} registered</span>
                      <span className={`font-semibold ${isFull ? 'text-red-500' : spotsRemaining <= 5 ? 'text-orange-500' : 'text-black/40'}`}>
                        {isFull ? 'Full' : `${spotsRemaining} left`}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/8 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${isFull ? 'bg-red-400' : spotsRemaining <= 5 ? 'bg-orange-400' : 'bg-emerald-400'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPct}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <p className="text-xs text-black/30 mt-1.5 text-right">{event.capacity} total spots</p>
                  </div>
                )}

                {/* Register button */}
                <motion.button
                  onClick={handleRegister}
                  disabled={registrationClosed}
                  className="w-full rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden transition-opacity"
                  style={{
                    backgroundColor: registrationClosed ? 'transparent' : 'var(--color-yPrimary, #f5c842)',
                    border: registrationClosed ? '1.5px solid rgba(0,0,0,0.12)' : 'none',
                    color: registrationClosed ? 'rgba(0,0,0,0.35)' : '#000',
                    cursor: registrationClosed ? 'not-allowed' : 'pointer',
                  }}
                  whileHover={!registrationClosed ? { scale: 1.02 } : {}}
                  whileTap={!registrationClosed ? { scale: 0.98 } : {}}
                >
                  {!registrationClosed && (
                    <motion.span
                      className="absolute inset-0 bg-white/30"
                      initial={{ x: '-100%', skewX: '-20deg' }}
                      whileHover={{ x: '160%' }}
                      transition={{ duration: 0.55, ease: 'easeInOut' }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isPast ? 'Event ended'
                      : isFull ? 'Event full'
                      : isDeadlinePassed ? 'Registration closed'
                      : <><span>Register now</span><CheckCircle className="w-4 h-4" /></>
                    }
                  </span>
                </motion.button>

                {/* External registration link */}
                {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs text-black/40 hover:text-black transition-colors mt-3 underline underline-offset-2"
                >
                  External registration link →
                </a>
              )}
              </Card>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}