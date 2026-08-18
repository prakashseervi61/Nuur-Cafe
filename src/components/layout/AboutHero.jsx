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
        <div className="absolute inset-0 bg-gradient-to-t from-brown-950/90 via-brown-950/50 to-brown-950/60" />
      </div>

      <div ref={textRef} className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <span className="label-lg text-gold-400 mb-4 block">About Nuur</span>
        <h1 className="font-display text-display-xl md:text-display-2xl text-cream-50 font-semibold leading-[0.95] mb-6">
          Our story<br />begins with<br />a single cup.
        </h1>
        <p className="text-body-lg text-cream-300 max-w-lg">
          From a coffee cart on Prinsengracht to one of Amsterdam's most
          beloved craft coffeehouses. This is the journey of Nuur.
        </p>
      </div>
    </section>
  )
}
