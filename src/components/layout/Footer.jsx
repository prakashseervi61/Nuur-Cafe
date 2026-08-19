import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cafe, navigation } from '../../data/cafe'
import { useReducedMotion } from '../../hooks/useReducedMotion'


export default function Footer() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(headingRef.current, { y: 0, opacity: 1 })
        gsap.set(contentRef.current?.children || [], { y: 0, opacity: 1 })
        return
      }

      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <footer
      ref={sectionRef}
      className="bg-brown-950 text-cream-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div ref={headingRef} className="mb-20">
          <p className="label-lg text-gold-500 mb-4">Visit Us</p>
          <h2 className="font-display text-display-xl font-semibold text-cream-50 mb-6 max-w-3xl">
            Your table is waiting.
          </h2>
          <Link
            to="/reservations"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500 text-brown-900 font-medium tracking-wide hover:bg-gold-400 transition-colors duration-300 text-sm"
          >
            Make a Reservation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-[0.1em] text-cream-50 mb-6">
              {cafe.name.toUpperCase()}
            </h3>
            <p className="text-cream-400 text-sm leading-relaxed max-w-xs">
              {cafe.description}
            </p>
          </div>

          <div>
            <h4 className="label-lg text-cream-300 mb-6 uppercase">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-cream-400 hover:text-cream-50 transition-colors duration-300 text-sm w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="label-lg text-cream-300 mb-6 uppercase">Visit</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-cream-200 font-medium mb-1">Address</p>
                <p className="text-cream-400">{cafe.address.street}</p>
                <p className="text-cream-400">{cafe.address.postal} {cafe.address.city}</p>
              </div>
              <div>
                <p className="text-cream-200 font-medium mb-1">Hours</p>
                <p className="text-cream-400">Mon — Fri: {cafe.hours.weekday}</p>
                <p className="text-cream-400">Sat — Sun: {cafe.hours.weekend}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="label-lg text-cream-300 mb-6 uppercase">Connect</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-cream-200 font-medium mb-1">Contact</p>
                <a href={`tel:${cafe.phone}`} className="text-cream-400 hover:text-cream-50 transition-colors block">
                  {cafe.phone}
                </a>
                <a href={`mailto:${cafe.email}`} className="text-cream-400 hover:text-cream-50 transition-colors block">
                  {cafe.email}
                </a>
              </div>
              <div>
                <p className="text-cream-200 font-medium mb-1">Follow</p>
                <div className="flex gap-4">
                  {cafe.social.map((s) => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="text-cream-400 hover:text-cream-50 transition-colors capitalize">
                      {s.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brown-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream-600 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} {cafe.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-cream-600 text-xs tracking-wider">
              {cafe.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
