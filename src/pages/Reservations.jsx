import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { timeSlots, guestOptions, getAvailableSlots } from '../data/reservation'
import { cafe } from '../data/cafe'
import { useReducedMotion } from '../hooks/useReducedMotion'

const steps = ['Date & Guests', 'Time', 'Details', 'Confirm']

export default function Reservations() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    date: '',
    guests: 2,
    time: '',
    name: '',
    email: '',
    phone: '',
    occasion: '',
    requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const stepRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!stepRef.current) return
    if (prefersReducedMotion) {
      gsap.set(stepRef.current, { x: 0, opacity: 1 })
      return
    }
    gsap.fromTo(
      stepRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
  }, [step, prefersReducedMotion])

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 2)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const availableSlots = form.date ? getAvailableSlots(form.date, form.guests) : []

  return (
    <div className="min-h-screen bg-cream-50 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="label-lg text-gold-600 block mb-3">Reservations</span>
          <h1 className="font-display text-display-xl text-brown-900 font-semibold mb-4">
            Save your seat.
          </h1>
          <p className="text-body-lg text-brown-600 max-w-md">
            We recommend reserving for parties of 3+. Walk-ins always welcome at the bar.
          </p>
        </div>

        {!submitted ? (
          <>
            {/* Progress bar */}
            <div className="flex gap-2 mb-12">
              {steps.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-brown-900' : 'bg-brown-200'}`} />
                  <span className={`text-xs mt-2 block ${i === step ? 'text-brown-900 font-medium' : 'text-brown-400'}`}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            <div ref={stepRef}>
              {step === 0 && (
                <div className="space-y-8">
                  <div>
                    <label htmlFor="res-date" className="label-sm text-brown-500 uppercase block mb-2">Date</label>
                    <input
                      type="date"
                      id="res-date"
                      min={today}
                      max={maxDateStr}
                      value={form.date}
                      onChange={(e) => updateForm('date', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="label-sm text-brown-500 uppercase block mb-2">Number of Guests</label>
                    <div className="grid grid-cols-4 gap-3">
                      {guestOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => updateForm('guests', opt.value)}
                          className={`py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                            form.guests === opt.value
                              ? 'bg-brown-900 text-cream-50'
                              : 'bg-white border border-brown-200 text-brown-700 hover:border-brown-400'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={!form.date}
                    className="w-full py-4 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Choose a Time
                  </button>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <p className="text-body-md text-brown-600">
                    Available times for {new Date(form.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} — {form.guests} {form.guests === 1 ? 'guest' : 'guests'}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => {
                      const available = availableSlots.includes(slot.time)
                      return (
                        <button
                          key={slot.time}
                          onClick={() => available && updateForm('time', slot.time)}
                          disabled={!available}
                          className={`py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            form.time === slot.time
                              ? 'bg-brown-900 text-cream-50'
                              : available
                                ? 'bg-white border border-brown-200 text-brown-700 hover:border-brown-400'
                                : 'bg-brown-50 text-brown-300 cursor-not-allowed line-through'
                          }`}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-brown-300 text-brown-900 font-medium text-sm hover:bg-brown-100 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!form.time}
                      className="flex-1 py-4 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="res-name" className="label-sm text-brown-500 uppercase block mb-2">Name</label>
                      <input
                        type="text"
                        id="res-name"
                        value={form.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="res-email" className="label-sm text-brown-500 uppercase block mb-2">Email</label>
                      <input
                        type="email"
                        id="res-email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="res-phone" className="label-sm text-brown-500 uppercase block mb-2">Phone</label>
                    <input
                      type="tel"
                      id="res-phone"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                      placeholder="+31 6 1234 5678"
                    />
                  </div>
                  <div>
                    <label htmlFor="res-occasion" className="label-sm text-brown-500 uppercase block mb-2">Occasion (optional)</label>
                    <select
                      id="res-occasion"
                      value={form.occasion}
                      onChange={(e) => updateForm('occasion', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                    >
                      <option value="">Select an occasion</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="date">Date Night</option>
                      <option value="business">Business Meeting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="res-requests" className="label-sm text-brown-500 uppercase block mb-2">Special Requests (optional)</label>
                    <textarea
                      id="res-requests"
                      rows={3}
                      value={form.requests}
                      onChange={(e) => updateForm('requests', e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all resize-none"
                      placeholder="Dietary requirements, seating preference, etc."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-brown-300 text-brown-900 font-medium text-sm hover:bg-brown-100 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      disabled={!form.name || !form.email}
                      className="flex-1 py-4 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-2xl bg-white p-8 shadow-sm">
                    <h3 className="font-display text-xl font-semibold text-brown-900 mb-6">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-body-md">
                        <span className="text-brown-500">Date</span>
                        <span className="text-brown-900 font-medium">
                          {new Date(form.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-brown-500">Time</span>
                        <span className="text-brown-900 font-medium">{form.time}</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-brown-500">Guests</span>
                        <span className="text-brown-900 font-medium">{form.guests} {form.guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                      <div className="h-px bg-brown-100" />
                      <div className="flex justify-between text-body-md">
                        <span className="text-brown-500">Name</span>
                        <span className="text-brown-900 font-medium">{form.name}</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-brown-500">Email</span>
                        <span className="text-brown-900 font-medium">{form.email}</span>
                      </div>
                      {form.phone && (
                        <div className="flex justify-between text-body-md">
                          <span className="text-brown-500">Phone</span>
                          <span className="text-brown-900 font-medium">{form.phone}</span>
                        </div>
                      )}
                      {form.occasion && (
                        <div className="flex justify-between text-body-md">
                          <span className="text-brown-500">Occasion</span>
                          <span className="text-brown-900 font-medium capitalize">{form.occasion}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-brown-50 p-6">
                    <p className="text-body-sm text-brown-600 leading-relaxed">
                      <strong className="text-brown-900">Cancellation policy:</strong> Free cancellation up to 4 hours
                      before your reservation. For groups of 6+, we require a credit card
                      to hold the booking.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-brown-300 text-brown-900 font-medium text-sm hover:bg-brown-100 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-4 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 active:scale-[0.98] transition-all duration-300"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="font-display text-2xl font-semibold text-brown-900 mb-3">Reservation Confirmed</h2>
            <p className="text-body-lg text-brown-600 mb-2">
              {new Date(form.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {form.time}
            </p>
            <p className="text-body-md text-brown-500 mb-8">
              Confirmation sent to {form.email}. We'll see you at {cafe.address.street}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setStep(0)
                setForm({ date: '', guests: 2, time: '', name: '', email: '', phone: '', occasion: '', requests: '' })
              }}
              className="px-6 py-2.5 rounded-full bg-brown-900 text-cream-50 text-sm font-medium hover:bg-brown-800 transition-colors"
            >
              Make Another Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
