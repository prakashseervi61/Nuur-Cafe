import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function Preloader({ onExit }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      document.body.style.overflow = ''
      onExit()
      return
    }

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onExit()
      },
    })

    tl.set(textRef.current, { opacity: 0, y: 20 })
      .set(lineRef.current, { scaleX: 0 })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, '-=0.3')
      .to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.3,
      })
      .to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power4.inOut',
      }, '-=0.2')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onExit, prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brown-950"
    >
      <div ref={textRef} className="text-center">
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[0.15em] text-cream-50 mb-4">
          NUUR
        </h1>
        <div
          ref={lineRef}
          className="w-16 h-px bg-gold-500 mx-auto origin-center"
        />
      </div>
    </div>
  )
}
