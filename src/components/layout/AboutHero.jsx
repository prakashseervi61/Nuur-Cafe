import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'


export default function AboutHero() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(imageRef.current, { scale: 1, clipPath: 'inset(0 0 0% 0)' })
        gsap.set(textRef.current?.children || [], { y: 0, opacity: 1 })
        return
      }

      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        imageRef.current,
        { scale: 1.2, clipPath: 'inset(0 0 100% 0)' },
        { scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'power4.out' }
      ).fromTo(
        textRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
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
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[600px] overflow-hidden bg-brown-950">
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop"
          alt="Nuur cafe interior"
          className="w-full h-full object-cover"
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#110d08]/95 via-[#1a120b]/55 to-[#1a120b]/45" />
      </div>

      <div ref={textRef} className="relative z-20 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
        <div className="grid items-end gap-8 md:grid-cols-[1.25fr_0.75fr] md:gap-16 lg:gap-24">
          <div>
            <span className="mb-5 block font-body text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#f5c96b] md:text-xs">
              About Nuur
            </span>
            <h1 className="max-w-3xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.94] tracking-normal text-[#fdf8f3] drop-shadow-lg">
              Our story<br />begins with<br />a single cup.
            </h1>
          </div>
          <p className="max-w-lg border-l border-[#f5c96b]/60 pl-5 font-body text-[clamp(0.95rem,1.3vw,1.1rem)] leading-[1.6] text-[#eee4d7] drop-shadow-md md:mb-1 md:pl-7">
            From a coffee cart on Prinsengracht to one of Amsterdam's most
            beloved craft coffeehouses. This is the journey of Nuur.
          </p>
        </div>
      </div>
    </section>
  )
}
