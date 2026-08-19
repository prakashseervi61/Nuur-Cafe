import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryImages, galleryCategories, galleryFallbackImage } from '../data/gallery'
import FullscreenViewer from '../components/ui/FullscreenViewer'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const headerRef = useRef(null)
  const gridRef   = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const allCategories = ['All', ...galleryCategories]

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(headerRef.current?.children || [], { y: 0, opacity: 1 })
      return
    }
    gsap.fromTo(
      headerRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-gallery-item]')
    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, scale: 1 })
      return
    }
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.7, stagger: 0.05, ease: 'power3.out' }
    )
  }, [activeCategory, prefersReducedMotion])

  const handleNext = useCallback(() => {
    if (!selectedImage) return
    const idx = filteredImages.findIndex((img) => img.id === selectedImage.id)
    if (idx < filteredImages.length - 1) setSelectedImage(filteredImages[idx + 1])
  }, [selectedImage, filteredImages])

  const handlePrev = useCallback(() => {
    if (!selectedImage) return
    const idx = filteredImages.findIndex((img) => img.id === selectedImage.id)
    if (idx > 0) setSelectedImage(filteredImages[idx - 1])
  }, [selectedImage, filteredImages])

  const currentIdx = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1

  return (
    <div className="min-h-screen bg-[#fdf8f3] pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#c9a96e] font-medium block mb-4">
            Gallery
          </span>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] text-[#1a120b] font-normal leading-[1.05] tracking-[-0.02em] mb-4">
            Moments at Nuur.
          </h1>
          <p className="text-[15px] text-[#6b5744] max-w-md font-light leading-relaxed">
            A visual diary of our space, our craft, and the people who make it all worthwhile.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide" role="tablist">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-[12px] tracking-[0.08em] uppercase font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1a120b] text-[#fdf6ee]'
                  : 'bg-[#1a120b]/8 text-[#6b5744] hover:bg-[#1a120b]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry gallery */}
        <div
          ref={gridRef}
          className="columns-1 gap-3 md:columns-2 md:gap-4 xl:columns-3"
          role="tabpanel"
        >
          {filteredImages.map((img, i) => {
            const aspect = i % 5 === 0
              ? 'aspect-[4/5]'
              : i % 3 === 0
                ? 'aspect-[16/10]'
                : 'aspect-[3/4]'

            return (
              <button
                key={img.id}
                data-gallery-item
                onClick={() => setSelectedImage(img)}
                className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e] md:mb-4 ${aspect}`}
                aria-label={`View ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = galleryFallbackImage
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0905]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-[#fdf6ee] text-sm font-medium leading-tight">{img.caption}</p>
                    <span className="text-[#c9a96e] text-[11px] tracking-[0.1em] uppercase">{img.category}</span>
                  </div>
                </div>
                {/* Expand icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </div>
              </button>
            )
          })}
        </div>

      </div>

      <FullscreenViewer
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIdx < filteredImages.length - 1}
        hasPrev={currentIdx > 0}
        currentIndex={currentIdx}
        totalCount={filteredImages.length}
      />
    </div>
  )
}
