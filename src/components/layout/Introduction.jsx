import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'


export default function Introduction() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(wordsRef.current, { y: 0, opacity: 1 })
        return
      }

      gsap.fromTo(
        wordsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const text = 'We believe in the beauty of simplicity. A perfectly extracted espresso. A croissant that shatters at first bite. A space where time slows down. That is the essence of Nuur.'
  const words = text.split(' ')

  return (
    <section ref={sectionRef} className="py-32 md:py-44 px-6 md:px-12 lg:px-20 bg-cream-50">
      <div className="max-w-5xl mx-auto">
        <p className="label-lg text-gold-600 mb-8">Our Philosophy</p>
        <p className="font-serif text-display-lg md:text-display-xl text-brown-900 leading-[1.1]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="inline-block mr-[0.3em] opacity-0"
              style={{ transform: 'translateY(40px)' }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
