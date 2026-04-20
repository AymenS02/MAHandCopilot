'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Calendar, MapPin, Clock, User, Mail, Phone, ArrowLeft, CheckCircle, AlertCircle, Infinity } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { isRegistrationDeadlinePassed } from '/lib/utils/eventUtils'

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

// ── Shared input class ──────────────────────────────────────────────────────
const inputClass = "w-full px-4 py-3 rounded-2xl bg-white border border-black/10 text-sm text-black placeholder-black/30 outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all"
const labelClass = "block text-sm font-semibold text-black/70 mb-1.5"

// ── Field wrapper ───────────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-0">
      <label className={labelClass}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

// ── Icon input wrapper ──────────────────────────────────────────────────────
function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/25 w-4 h-4 pointer-events-none" />
      <input {...props} className={`${inputClass} pl-10`} />
    </div>
  )
}

// ── Section card ────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-black/8 p-6 flex flex-col gap-5" style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
      {title && <h2 className="text-base font-bold text-black">{title}</h2>}
      {children}
    </div>
  )
}

export default function EventRegistrationPage() {
  const [event, setEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const params = useParams()
  const eventId = params.id

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', age: '', gender: '',
    dietaryRestrictions: '', emergencyContact: '', emergencyPhone: '', additionalNotes: ''
  })
  const [questionAnswers, setQuestionAnswers] = useState({})

  useEffect(() => {
    if (eventId) fetchEvent()
  }, [eventId])

  const fetchEvent = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/events/${eventId}`)
      const data = await res.json()
      if (res.ok) setEvent(data.event)
    } catch (err) {
      console.error('Error fetching event:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleQuestionChange = (id, value) => setQuestionAnswers(prev => ({ ...prev, [id]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, questionAnswers }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ fullName: '', email: '', phone: '', age: '', gender: '', dietaryRestrictions: '', emergencyContact: '', emergencyPhone: '', additionalNotes: '' })
        setQuestionAnswers({})
        setTimeout(() => { window.scrollTo(0, 0); router.push(`/mah-youth/events/${eventId}`) }, 3000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Failed to register. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => { window.scrollTo(0, 0); router.push(`/mah-youth/events/${eventId}`) }

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="mt-36 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black/50 animate-spin" />
          <p className="text-sm text-black/40 font-medium">Loading registration...</p>
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
          <button onClick={() => router.push('/mah-youth/events')} className="mt-4 px-5 py-2.5 rounded-2xl bg-black text-white text-sm font-semibold hover:bg-black/80 transition-colors">
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  const hasUnlimitedCapacity = event.capacity === 0
  const spotsRemaining = hasUnlimitedCapacity ? null : event.capacity - event.registeredAttendees
  const isFull = !hasUnlimitedCapacity && spotsRemaining <= 0
  const isDeadlinePassed = isRegistrationDeadlinePassed(event.registrationDeadline)

  // ── Closed / Full ──
  if (isFull || isDeadlinePassed) {
    return (
      <div className="mt-36 min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            {isDeadlinePassed ? 'Registration Closed' : 'Event Full'}
          </h2>
          <p className="text-sm text-black/50 mb-6">
            {isDeadlinePassed ? 'The registration deadline for this event has passed.' : 'This event has reached its capacity.'}
          </p>
          <button onClick={handleBack} className="px-5 py-2.5 rounded-2xl bg-black text-white text-sm font-semibold hover:bg-black/80 transition-colors">
            Back to Event
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="mt-36 min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Back button */}
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors mb-8 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to event
        </motion.button>

        {/* Page header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs text-black/40 uppercase tracking-widest font-medium mb-1">Registration</p>
          <h1 className="text-4xl font-bold text-black mb-2">{event.title}</h1>

          {/* Event meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-black/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />{formatDate(event.date)}
            </span>
            {event.startTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />{formatTime(event.startTime)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />{event.location}
            </span>
          </div>

          {/* Spots pill */}
          <div className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {hasUnlimitedCapacity
              ? <span className="flex items-center gap-1"><Infinity className="w-3.5 h-3.5" /> Unlimited spots</span>
              : `${spotsRemaining} ${spotsRemaining === 1 ? 'spot' : 'spots'} remaining`
            }
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Status messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-700">Registration successful!</p>
                  <p className="text-xs text-emerald-600 mt-0.5">You may receive email updates. Redirecting...</p>
                </div>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-600">Registration failed</p>
                  <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Your information */}
          <Section title="Your information">
            <Field label="Full name" required>
              <IconInput icon={User} type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
            </Field>
            <Field label="Email address" required>
              <IconInput icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" />
            </Field>
            <Field label="Phone number" required>
              <IconInput icon={Phone} type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(123) 456-7890" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Age" required>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="1" max="120" placeholder="Age" className={inputClass} />
              </Field>
              <Field label="Gender" required>
                <select name="gender" value={formData.gender} onChange={handleChange} required className={inputClass}>
                  <option value="" disabled>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </Field>
            </div>
            <Field label="Dietary restrictions">
              <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} placeholder="Any dietary restrictions or allergies" className={inputClass} />
            </Field>
          </Section>

          {/* Emergency contact */}
          <Section title="Emergency contact">
            <Field label="Contact name">
              <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="Full name" className={inputClass} />
            </Field>
            <Field label="Contact phone">
              <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} placeholder="(123) 456-7890" className={inputClass} />
            </Field>
          </Section>

          {/* Additional notes */}
          <Section title="Additional notes">
            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows={3} placeholder="Any special requirements or additional information" className={`${inputClass} resize-none`} />
          </Section>

          {/* Custom questions */}
          {event.registrationQuestions?.length > 0 && (
            <Section title="Additional questions">
              {event.registrationQuestions.map((q, i) => (
                <Field key={q.id} label={`${i + 1}. ${q.text}`} required={q.required}>
                  {(q.type === 'text' || q.type === 'email' || q.type === 'phone' || q.type === 'number' || q.type === 'date') && (
                    <input
                      type={q.type === 'phone' ? 'tel' : q.type}
                      required={q.required}
                      value={questionAnswers[q.id] || ''}
                      onChange={e => handleQuestionChange(q.id, e.target.value)}
                      placeholder="Your answer"
                      className={inputClass}
                    />
                  )}
                  {q.type === 'textarea' && (
                    <textarea required={q.required} value={questionAnswers[q.id] || ''} onChange={e => handleQuestionChange(q.id, e.target.value)} rows={3} placeholder="Your answer" className={`${inputClass} resize-none`} />
                  )}
                  {q.type === 'select' && (
                    <select required={q.required} value={questionAnswers[q.id] || ''} onChange={e => handleQuestionChange(q.id, e.target.value)} className={inputClass}>
                      <option value="" disabled={q.required}>Select an option</option>
                      {q.options?.map(opt => <option key={opt.id} value={opt.text}>{opt.text}</option>)}
                    </select>
                  )}
                  {q.type === 'radio' && (
                    <div className="flex flex-col gap-2.5">
                      {q.options?.map(opt => (
                        <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer group">
                          <input type="radio" name={q.id} required={q.required} value={opt.text} checked={questionAnswers[q.id] === opt.text} onChange={e => handleQuestionChange(q.id, e.target.value)} className="w-4 h-4 accent-black" />
                          <span className="text-sm text-black/60 group-hover:text-black transition-colors">{opt.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {q.type === 'checkbox' && (
                    <div className="flex flex-col gap-2.5">
                      {q.options?.map(opt => {
                        const current = questionAnswers[q.id] || []
                        const checked = Array.isArray(current) && current.includes(opt.text)
                        return (
                          <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer group">
                            <input type="checkbox" checked={checked} onChange={e => {
                              const updated = e.target.checked ? [...current, opt.text] : current.filter(v => v !== opt.text)
                              handleQuestionChange(q.id, updated)
                            }} className="w-4 h-4 accent-black rounded" />
                            <span className="text-sm text-black/60 group-hover:text-black transition-colors">{opt.text}</span>
                          </label>
                        )
                      })}
                    </div>
                  )}
                </Field>
              ))}
            </Section>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 relative overflow-hidden transition-opacity"
            style={{ backgroundColor: 'var(--color-yPrimary, #f5c842)', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
            whileHover={!isSubmitting ? { scale: 1.01 } : {}}
            whileTap={!isSubmitting ? { scale: 0.99 } : {}}
          >
            {!isSubmitting && (
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-100%', skewX: '-20deg' }}
                whileHover={{ x: '160%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              />
            )}
            <span className="relative z-10">
              {isSubmitting
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />Submitting...</span>
                : <span className="flex items-center gap-2">Complete registration <CheckCircle className="w-4 h-4" /></span>
              }
            </span>
          </motion.button>

          <p className="text-xs text-black/30 text-center">By registering, you agree to receive event updates via email.</p>
        </motion.form>

      </div>
    </div>
  )
}
