import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { menuData } from '../../data/menu'


export default function MenuPreview() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const previewItems = [
    menuData[0].products[3],
    menuData[2].products[1],
    menuData[4].products[0],
    menuData[1].products[0],
    menuData[3].products[0],
    menuData[2].products[4],
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brown-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <span className="label-lg text-gold-600 block mb-3">Menu</span>
            <h2 className="font-display text-display-lg text-brown-900 font-semibold">
              A taste of what awaits.
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-body-sm text-brown-600 hover:text-brown-900 transition-colors inline-flex items-center gap-2 group"
          >
            View complete menu
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, i) => (
            <Link
              key={item.id}
              to="/menu"
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500 opacity-0"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-medium text-brown-900 group-hover:text-gold-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-body-sm text-brown-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-display text-sm font-semibold text-brown-900 whitespace-nowrap">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
