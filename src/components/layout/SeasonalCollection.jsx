import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { seasonalHighlights } from '../../data/menu'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function SeasonalCollection() {
  const sectionRef = useRef(null)
  const itemsRef   = useRef([])
  const { addItem } = useCart()
  const showToast = useToast()
  const prefersReducedMotion = useReducedMotion()

  const handleAdd = useCallback((item) => {
    addItem(item)
    showToast('Added')
  }, [addItem, showToast])

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
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="bg-[#fdf8f3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#c9a96e] font-medium block mb-4">
              Seasonal
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] text-[#1a120b] font-normal leading-[1.08] tracking-[-0.02em]">
              Autumn at Nuur.
            </h2>
          </div>
          <p className="text-[14px] text-[#6b5744] leading-relaxed max-w-xs font-light">
            Limited offerings inspired by the changing season.<br className="hidden md:block" /> Available while they last.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalHighlights.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-500 opacity-0 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display text-base font-medium text-brown-900 group-hover:text-[#c9a96e] transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-display text-sm font-semibold text-brown-900 whitespace-nowrap">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-[13px] text-brown-500 line-clamp-2 mb-4 flex-1">
                  {item.description}
                </p>
                <button
                  onClick={() => handleAdd(item)}
                  className="w-full py-2.5 rounded-xl bg-[#1a120b] text-[#fdf6ee] text-sm font-medium tracking-wide hover:bg-[#3d2b1f] active:scale-[0.98] transition-all duration-300"
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
