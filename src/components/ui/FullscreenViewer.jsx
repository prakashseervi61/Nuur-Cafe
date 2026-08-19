import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { galleryFallbackImage } from '../../data/gallery'

export default function FullscreenViewer({ image, onClose, onNext, onPrev, hasNext, hasPrev, currentIndex, totalCount }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!image) return
    document.body.style.overflow = 'hidden'

    if (prefersReducedMotion) {
      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(contentRef.current, { scale: 1, opacity: 1 })

      const handleKey = (e) => {
        if (e.key === 'Escape') handleClose()
        if (e.key === 'ArrowRight' && hasNext) onNext()
        if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      }
      window.addEventListener('keydown', handleKey)

      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKey)
      }
    }

    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      .fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' },
        '-=0.15'
      )

    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight' && hasNext) onNext()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
      tl.kill()
    }
  }, [image, prefersReducedMotion])

  const handleClose = useCallback(() => {
    if (prefersReducedMotion) {
      onClose()
      return
    }

    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(contentRef.current, { scale: 0.95, opacity: 0, duration: 0.25, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.1')
  }, [onClose])

  if (!image) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-brown-950/95 backdrop-blur-lg"
        onClick={handleClose}
      />

      <div ref={contentRef} className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-12">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-10 h-10 rounded-full bg-cream-50/10 text-cream-50 flex items-center justify-center hover:bg-cream-50/20 transition-colors"
          aria-label="Close viewer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-cream-50/10 text-cream-50 flex items-center justify-center hover:bg-cream-50/20 transition-colors"
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-cream-50/10 text-cream-50 flex items-center justify-center hover:bg-cream-50/20 transition-colors"
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}

        <div className="relative max-w-5xl max-h-[85vh] w-full">
          <img
            src={image.src}
            alt={image.alt}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = galleryFallbackImage
            }}
            className="w-full h-full object-contain rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brown-950/80 to-transparent rounded-b-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cream-100 font-display text-lg font-medium">{image.caption}</p>
                {image.category && (
                  <span className="text-cream-400 text-sm">{image.category}</span>
                )}
              </div>
              {currentIndex != null && totalCount != null && (
                <span className="text-cream-400 text-sm font-medium">
                  {currentIndex + 1} / {totalCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
