import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef  = useRef(null)
  const imageRef    = useRef(null)
  const eyebrowRef  = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef  = useRef(null)
  const ctaRef      = useRef(null)
  const metaRef     = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(imageRef.current, { clipPath: 'inset(0 0 0% 0)', scale: 1 })
        gsap.set([eyebrowRef.current, headlineRef.current, sublineRef.current, metaRef.current], { opacity: 1, y: 0 })
        gsap.set(ctaRef.current?.children || [], { opacity: 1, y: 0 })
        if (sectionRef.current) sectionRef.current.style.visibility = 'visible'
        return
      }

      // Lock initial states before first paint
      gsap.set(imageRef.current, { clipPath: 'inset(0 0 100% 0)', scale: 1.08 })
      gsap.set([eyebrowRef.current, headlineRef.current, sublineRef.current, metaRef.current], { opacity: 0 })
      gsap.set(ctaRef.current?.children || [], { opacity: 0 })
      if (sectionRef.current) sectionRef.current.style.visibility = 'visible'

      // Image reveal
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
        { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.8, ease: 'power4.out' }
      )
      // Staggered text entrance
      .fromTo(eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(headlineRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(sublineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(ctaRef.current?.children || [],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] overflow-hidden bg-[#1a120b]"
      style={{ visibility: 'hidden' }}
    >
      {/* ── Image ── */}
      <div className="absolute inset-0 will-change-transform">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop"
          alt="Nuur craft coffeehouse interior"
          className="w-full h-full object-cover"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        />
      </div>

      {/* ── Gradients — targeted, not full-cover ── */}
      {/* Bottom: where text lives */}
      <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-[#0e0905]/95 via-[#0e0905]/50 to-transparent pointer-events-none" />
      {/* Left edge vignette */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#0e0905]/70 to-transparent pointer-events-none" />
      {/* Top: navbar legibility */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0e0905]/55 to-transparent pointer-events-none" />

      {/* ── Hero content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto w-full">

          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="mb-5 text-[11px] md:text-xs tracking-[0.22em] uppercase text-[#c9a96e] font-medium opacity-0"
          >
            Nuur Amsterdam &nbsp;·&nbsp; Est. 2015
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-[#fdf6ee] font-normal mb-6 max-w-2xl opacity-0"
          >
            Pure coffee.<br />
            <span className="italic text-[#e8d5b0]">Slow moments.</span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-[15px] md:text-base text-[#c8bfb4] leading-relaxed max-w-sm md:max-w-md mb-10 opacity-0 font-light"
          >
            A craft coffeehouse on Prinsengracht, where every cup is brewed
            with care and every moment is designed to be savored.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* Primary */}
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase font-medium text-[#fdf6ee] border-b border-[#c9a96e]/60 pb-0.5 hover:border-[#c9a96e] transition-colors duration-300"
            >
              Explore the Menu
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5"
                className="text-[#c9a96e] group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>

            {/* Divider */}
            <span className="hidden sm:block w-px h-4 bg-[#fdf6ee]/20" />

            {/* Secondary */}
            <Link
              to="/reservations"
              className="text-[13px] tracking-[0.1em] uppercase font-medium text-[#a89880] hover:text-[#fdf6ee] transition-colors duration-300"
            >
              Reserve a Table
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom meta bar ── */}
      <div
        ref={metaRef}
        className="absolute bottom-0 inset-x-0 z-10 opacity-0"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-6 md:pb-7">
          <div className="flex items-center gap-6 border-t border-[#fdf6ee]/10 pt-4">
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#7a6a5a]">
              Prinsengracht 42, Amsterdam
            </span>
            <span className="w-px h-3 bg-[#7a6a5a]/40" />
            <span className="text-[11px] tracking-[0.14em] uppercase text-[#7a6a5a]">
              Open today · 7:00 – 19:00
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
