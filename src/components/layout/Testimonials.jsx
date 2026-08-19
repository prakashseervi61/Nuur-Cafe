import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../../data/testimonials'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const itemsRef   = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerRef.current?.children || [], ...itemsRef.current], { y: 0, opacity: 1 })
        return
      }
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(item,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#fdf8f3]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#c9a96e] font-medium block mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] text-[#1a120b] font-normal leading-[1.08] tracking-[-0.02em] max-w-lg">
            What our guests say.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a120b]/8">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={t.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="bg-[#fdf8f3] p-8 md:p-10 opacity-0 flex flex-col gap-6"
            >
              {/* Quote mark */}
              <span className="font-serif text-[4rem] leading-none text-[#c9a96e]/40 select-none">"</span>

              {/* Quote */}
              <p className="font-serif text-[clamp(1rem,1.4vw,1.15rem)] text-[#3d2b1f] italic leading-[1.7] flex-1">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-[#c9a96e]/40" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#fdf6ee]/10">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[#1a120b] text-[13px] font-medium">{t.name}</p>
                  <p className="text-[#6b5744] text-[11px] tracking-wide">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
