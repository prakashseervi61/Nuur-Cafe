import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { bestSellers } from '../../data/menu'


export default function BestSeller() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(0 0 100% 0)', scale: 1.15 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const featured = bestSellers[0]

  return (
    <section ref={sectionRef} className="bg-brown-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
            <img
              ref={imageRef}
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover"
              style={{ clipPath: 'inset(0 0 100% 0)' }}
            />
          </div>

          <div ref={contentRef}>
            <span className="label-lg text-gold-400 block mb-4">Best Seller</span>
            <h2 className="font-display text-display-lg text-cream-50 font-semibold mb-4">
              {featured.name}
            </h2>
            <p className="font-serif text-display-sm text-cream-300 italic mb-6">
              {featured.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-display text-3xl font-semibold text-gold-400">
                €{featured.price.toFixed(2)}
              </span>
              {featured.tag && (
                <span className="px-3 py-1 rounded-full bg-brown-800 text-cream-300 text-xs tracking-wider">
                  {featured.tag}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {bestSellers.slice(1).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-brown-800/60 hover:bg-brown-800 transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-cream-100 text-sm font-medium">{item.name}</p>
                    <p className="text-cream-500 text-xs">€{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 text-brown-900 font-medium text-sm tracking-wide hover:bg-gold-400 transition-colors duration-300"
            >
              View Full Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
