import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cafe } from '../data/cafe'
import { useReducedMotion } from '../hooks/useReducedMotion'


export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(headerRef.current?.children || [], { y: 0, opacity: 1 })
        gsap.set(formRef.current, { y: 0, opacity: 1 })
        gsap.set(infoRef.current?.children || [], { y: 0, opacity: 1 })
        return
      }

      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo(
        infoRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      )
    })

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (prefersReducedMotion) return
    gsap.fromTo(
      '.success-message',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={headerRef} className="mb-16">
          <span className="label-lg text-gold-600 block mb-3">Contact</span>
          <h1 className="font-display text-display-xl text-brown-900 font-semibold mb-4">
            Let's talk.
          </h1>
          <p className="text-body-lg text-brown-600 max-w-lg">
            Whether it's a collaboration, a question, or just a hello — we'd
            love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <div ref={formRef}>
            {submitted ? (
              <div className="success-message rounded-3xl bg-white p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-semibold text-brown-900 mb-3">Message Sent</h2>
                <p className="text-body-md text-brown-600 mb-6">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                  className="px-6 py-2.5 rounded-full bg-brown-900 text-cream-50 text-sm font-medium hover:bg-brown-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="label-sm text-brown-500 uppercase block mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-sm text-brown-500 uppercase block mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="label-sm text-brown-500 uppercase block mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Reservation Question</option>
                    <option value="catering">Catering & Events</option>
                    <option value="wholesale">Wholesale & Partnerships</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="label-sm text-brown-500 uppercase block mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-brown-200 text-brown-900 text-body-md placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-brown-900 text-cream-50 font-medium tracking-wide hover:bg-brown-800 active:scale-[0.98] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div ref={infoRef}>
            <div className="mb-10">
              <h3 className="label-lg text-brown-400 uppercase mb-4">Visit Us</h3>
              <p className="text-body-lg text-brown-900 font-medium">{cafe.address.street}</p>
              <p className="text-body-md text-brown-600">{cafe.address.postal} {cafe.address.city}</p>
              <a
                href={`https://maps.google.com/?q=${cafe.address.full}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-gold-700 hover:text-gold-600 transition-colors inline-flex items-center gap-1.5 mt-2"
              >
                Get directions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>

            <div className="mb-10">
              <h3 className="label-lg text-brown-400 uppercase mb-4">Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-body-md">
                  <span className="text-brown-600">Monday — Friday</span>
                  <span className="text-brown-900 font-medium">{cafe.hours.weekday}</span>
                </div>
                <div className="flex justify-between text-body-md">
                  <span className="text-brown-600">Saturday — Sunday</span>
                  <span className="text-brown-900 font-medium">{cafe.hours.weekend}</span>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="label-lg text-brown-400 uppercase mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <a href={`tel:${cafe.phone}`} className="flex items-center gap-3 text-body-md text-brown-900 hover:text-gold-700 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brown-400">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  {cafe.phone}
                </a>
                <a href={`mailto:${cafe.email}`} className="flex items-center gap-3 text-body-md text-brown-900 hover:text-gold-700 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brown-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {cafe.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="label-lg text-brown-400 uppercase mb-4">Follow Along</h3>
              <div className="flex gap-3">
                {cafe.social.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-brown-100 text-brown-600 flex items-center justify-center hover:bg-brown-200 transition-colors"
                    aria-label={s.platform}
                  >
                    <span className="text-xs font-medium uppercase">{s.platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
