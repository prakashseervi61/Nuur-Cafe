import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { seasonalHighlights } from '../../data/menu'
import { useReducedMotion } from '../../hooks/useReducedMotion'


export default function SeasonalCollection() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(itemsRef.current, { y: 0, opacity: 1 })
        return
      }

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="bg-brown-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="text-center mb-16">
          <span className="label-lg text-gold-400 block mb-3">Seasonal</span>
          <h2 className="font-display text-display-lg md:text-display-xl text-cream-50 font-semibold mb-4">
            Autumn at Nuur
          </h2>
          <p className="text-body-lg text-cream-400 max-w-lg mx-auto">
            Limited offerings inspired by the changing season. Available while they last.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalHighlights.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group relative rounded-2xl overflow-hidden bg-brown-900/50 opacity-0"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-950/90 via-brown-950/50 to-brown-950/20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="label-sm text-gold-400 block mb-2">{item.tag}</span>
                <h3 className="font-display text-lg font-medium text-cream-50 mb-1">
                  {item.name}
                </h3>
                <p className="text-body-sm text-cream-300 line-clamp-2 mb-3">
                  {item.description}
                </p>
                <span className="font-display text-base font-semibold text-gold-400">
                  €{item.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
