import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const sentences = [
  'We believe in the beauty of simplicity.',
  'A perfectly extracted espresso.',
  'A croissant that shatters at first bite.',
  'A space where time slows down.',
  'That is the essence of Nuur.',
]

export default function Introduction() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const ruleRef     = useRef(null)
  const linesRef    = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([labelRef.current, ruleRef.current, ...linesRef.current], { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )

      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      linesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-[#fdf8f3]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <p
          ref={labelRef}
          className="text-[11px] tracking-[0.22em] uppercase text-[#c9a96e] font-medium mb-6 opacity-0"
        >
          Our Philosophy
        </p>

        {/* Gold rule */}
        <div
          ref={ruleRef}
          className="w-12 h-px bg-[#c9a96e] mb-12 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Sentences */}
        <div className="space-y-0">
          {sentences.map((sentence, i) => {
            const isAccent = i > 0 && i < sentences.length - 1
            const isLast   = i === sentences.length - 1
            return (
              <p
                key={i}
                ref={(el) => (linesRef.current[i] = el)}
                className={`font-serif leading-[1.15] tracking-[-0.02em] opacity-0 ${
                  i === 0
                    ? 'text-[clamp(2rem,4.5vw,3.8rem)] text-[#1a120b] font-normal mb-8'
                    : isLast
                    ? 'text-[clamp(1.4rem,3vw,2.4rem)] text-[#c9a96e] font-normal italic mt-10 pt-10 border-t border-[#1a120b]/8'
                    : 'text-[clamp(1.5rem,3.2vw,2.6rem)] text-[#3d2b1f]/70 font-light mb-2'
                }`}
              >
                {sentence}
              </p>
            )
          })}
        </div>

      </div>
    </section>
  )
}
