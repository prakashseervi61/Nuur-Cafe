import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryImages } from '../../data/gallery'


export default function GalleryPreview() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const itemsRef = useRef([])

  const previewImages = galleryImages.slice(0, 6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return
        gsap.fromTo(
          item,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="label-lg text-gold-600 block mb-3">Gallery</span>
            <h2 className="font-display text-display-lg text-brown-900 font-semibold">
              Moments at Nuur.
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-body-sm text-brown-600 hover:text-brown-900 transition-colors inline-flex items-center gap-2 group"
          >
            View full gallery
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>

      <div ref={scrollRef} className="overflow-hidden">
        <div className="flex gap-4 px-6 md:px-12 lg:px-20">
          {previewImages.map((img, i) => (
            <div
              key={img.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="flex-shrink-0 w-[280px] md:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden relative"
              style={{ clipPath: 'inset(0 0 100% 0)' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-950/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4">
                  <p className="text-cream-50 font-display text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
