import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'


export default function SpaceSection() {
  const sectionRef = useRef(null)
  const imagesRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(imagesRef.current, { clipPath: 'inset(0 0 0% 0)', scale: 1 })
        return
      }

      imagesRef.current.forEach((img) => {
        if (!img) return
        gsap.fromTo(
          img,
          { clipPath: 'inset(0 0 100% 0)', scale: 1.08 },
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 80%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div>
            <span className="label-lg text-gold-600 block mb-3">The Space</span>
            <h2 className="font-display text-display-lg text-brown-900 font-semibold mb-6">
              Designed for<br />lingering.
            </h2>
            <p className="text-body-lg text-brown-600 leading-relaxed mb-4">
              Exposed brick, warm lighting, and plants in every corner.
              Our interior was designed to feel like a living room — because
              that's exactly what we wanted it to be.
            </p>
            <p className="text-body-lg text-brown-600 leading-relaxed">
              Three distinct zones: the bar for quick espressos, the communal
              table for working and meeting, and the canal-side nook for
              quiet contemplation.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl aspect-[4/3]">
            <img
              ref={(el) => (imagesRef.current[0] = el)}
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop"
              alt="Nuur cafe seating area"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
              alt: 'The bar counter',
              caption: 'The Bar',
            },
            {
              src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop',
              alt: 'Communal table',
              caption: 'Communal Table',
            },
            {
              src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop',
              alt: 'Canal-side nook',
              caption: 'Canal Nook',
            },
          ].map((img, i) => (
            <div key={img.caption} className="rounded-2xl overflow-hidden aspect-[3/2]">
              <img
                ref={(el) => (imagesRef.current[i + 1] = el)}
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
