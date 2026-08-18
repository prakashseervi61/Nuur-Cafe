import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export default function Hero() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const sublineRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(
        imageRef.current,
        { scale: 1.2, clipPath: 'inset(0 0 100% 0)' },
        { scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.8, ease: 'power4.out' }
      )
        .fromTo(
          sublineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )

      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] overflow-hidden bg-brown-950"
    >
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/hero-images/06-cozy-corner.jpg"
          alt="Cozy cafe interior at Nuur"
          className="w-full h-full object-cover"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        />
        {/* Bottom cinematic scrim — lighter to preserve image */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-950/30 to-transparent" />
        {/* Left vignette — softened for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brown-950/60 via-brown-950/10 to-transparent" />
        {/* Top scrim so navbar text stays readable */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brown-950/50 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28 lg:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">

            <p
              ref={sublineRef}
              className="text-base md:text-lg text-white max-w-md mb-10 opacity-0 leading-relaxed font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
            >
              A craft coffeehouse on Prinsengracht, where every cup is brewed with
              care and every moment is designed to be savored.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-cream-50 text-brown-900 font-semibold text-sm tracking-wide hover:bg-gold-300 transition-all duration-300 shadow-2xl shadow-black/50"
              >
                Explore the Menu
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <Link
                to="/reservations"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold text-sm tracking-wide hover:bg-white/15 hover:border-white/80 transition-all duration-300 backdrop-blur-sm shadow-xl shadow-black/40"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-10">
        <div className="w-6 h-10 rounded-full border border-cream-200/30 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-cream-200/60 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
