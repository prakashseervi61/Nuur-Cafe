import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cafe } from '../../data/cafe'


export default function VisitUs() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={contentRef}>
          <span className="label-lg text-gold-600 block mb-3">Visit Us</span>
          <h2 className="font-display text-display-lg md:text-display-xl text-brown-900 font-semibold mb-4">
            Find us on<br />Prinsengracht.
          </h2>
          <p className="text-body-lg text-brown-600 max-w-lg mb-10">
            Nestled along Amsterdam's iconic canal belt, Nuur is a place to
            pause, refuel, and reconnect.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="label-lg text-brown-400 uppercase mb-3">Address</h3>
              <p className="text-body-lg text-brown-900 font-medium">{cafe.address.street}</p>
              <p className="text-body-md text-brown-600">{cafe.address.postal} {cafe.address.city}</p>
            </div>
            <div>
              <h3 className="label-lg text-brown-400 uppercase mb-3">Hours</h3>
              <p className="text-body-md text-brown-900">Mon — Fri: {cafe.hours.weekday}</p>
              <p className="text-body-md text-brown-900">Sat — Sun: {cafe.hours.weekend}</p>
            </div>
            <div>
              <h3 className="label-lg text-brown-400 uppercase mb-3">Contact</h3>
              <a href={`tel:${cafe.phone}`} className="text-body-md text-brown-900 hover:text-gold-700 transition-colors block">
                {cafe.phone}
              </a>
              <a href={`mailto:${cafe.email}`} className="text-body-md text-brown-600 hover:text-gold-700 transition-colors block">
                {cafe.email}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/reservations"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brown-900 text-cream-50 font-medium text-sm tracking-wide hover:bg-brown-800 transition-colors duration-300"
            >
              Reserve a Table
            </Link>
            <a
              href={`https://maps.google.com/?q=${cafe.address.full}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-brown-300 text-brown-900 font-medium text-sm tracking-wide hover:bg-brown-100 transition-colors duration-300"
            >
              Get Directions
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
