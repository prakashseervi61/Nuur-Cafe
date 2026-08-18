import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryImages, galleryCategories } from '../data/gallery'
import FullscreenViewer from '../components/ui/FullscreenViewer'
import { useReducedMotion } from '../hooks/useReducedMotion'


export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const itemsRef = useRef([])
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
      gsap.set(cards, { clipPath: 'inset(0 0 0% 0)', opacity: 1 })
      return
    }
    gsap.fromTo(
      cards,
      { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0 0% 0)',
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power4.out',
      }
    )
  }, [activeCategory, prefersReducedMotion])

  const handleNext = useCallback(() => {
    if (!selectedImage) return
    const idx = filteredImages.findIndex((img) => img.id === selectedImage.id)
    if (idx < filteredImages.length - 1) {
      setSelectedImage(filteredImages[idx + 1])
    }
  }, [selectedImage, filteredImages])

  const handlePrev = useCallback(() => {
    if (!selectedImage) return
    const idx = filteredImages.findIndex((img) => img.id === selectedImage.id)
    if (idx > 0) {
      setSelectedImage(filteredImages[idx - 1])
    }
  }, [selectedImage, filteredImages])

  const currentIdx = selectedImage ? filteredImages.findIndex((img) => img.id === selectedImage.id) : -1

  return (
    <div className="min-h-screen bg-cream-50 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div ref={headerRef} className="mb-12">
          <span className="label-lg text-gold-600 block mb-3">Gallery</span>
          <h1 className="font-display text-display-xl text-brown-900 font-semibold mb-4">
            Moments at Nuur.
          </h1>
          <p className="text-body-lg text-brown-600 max-w-lg">
            A visual diary of our space, our craft, and the people who make
            it all worthwhile.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide" role="tablist">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brown-900 text-cream-50'
                  : 'bg-brown-100 text-brown-600 hover:bg-brown-200'
              }`}
              role="tab"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          role="tabpanel"
        >
          {filteredImages.map((img, i) => (
            <button
              key={img.id}
              ref={(el) => (itemsRef.current[i] = el)}
              data-gallery-item
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-cream-50 text-sm font-medium">{img.caption}</p>
                  {img.category && (
                    <span className="text-cream-300 text-xs">{img.category}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
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
