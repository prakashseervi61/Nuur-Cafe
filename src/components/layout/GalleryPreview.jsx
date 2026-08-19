import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryImages, galleryFallbackImage } from '../../data/gallery'
import { useReducedMotion } from '../../hooks/useReducedMotion'


export default function GalleryPreview() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const previewImages = galleryImages.slice(0, 6)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

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

      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x"
          aria-label="Nuur gallery preview"
        >
          <div className="flex w-max gap-4 pl-6 md:pl-12 lg:pl-20 pr-6 md:pr-12 lg:pr-20">
          {previewImages.map((img) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-[78vw] max-w-[360px] md:w-[360px] aspect-[4/5] snap-start rounded-2xl overflow-hidden relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = galleryFallbackImage
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0905]/80 via-[#0e0905]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-sm font-medium drop-shadow-md">{img.caption}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#fdf8f3] to-transparent md:w-20" />
      </div>
    </section>
  )
}
