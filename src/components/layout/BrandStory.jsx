import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export default function BrandStory() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textBlocksRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: 15 },
        {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      gsap.fromTo(
        textBlocksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div ref={(el) => (textBlocksRef.current[0] = el)}>
              <span className="label-lg text-gold-600 block mb-4">Our Story</span>
              <h2 className="font-display text-display-lg text-brown-900 font-semibold mb-8">
                From a single cart<br />to your favorite corner.
              </h2>
            </div>

            <div ref={(el) => (textBlocksRef.current[1] = el)} className="space-y-5">
              <p className="text-body-lg text-brown-600 leading-relaxed">
                Nuur began in 2015 as a small coffee cart on Prinsengracht.
                Two friends with a shared obsession for perfect extraction and
                a belief that coffee deserves the same reverence as wine.
              </p>
              <p className="text-body-lg text-brown-600 leading-relaxed">
                We source single-origin beans from farms we know by name.
                We roast in small batches at our micro-roastery in Amsterdam-West.
                We brew with precision, serve with warmth, and never cut corners.
              </p>
            </div>

            <div ref={(el) => (textBlocksRef.current[2] = el)} className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-display text-display-md text-brown-900 font-semibold">2015</p>
                <p className="text-body-sm text-brown-500">Founded</p>
              </div>
              <div className="w-px h-12 bg-brown-200" />
              <div>
                <p className="font-display text-display-md text-brown-900 font-semibold">12+</p>
                <p className="text-body-sm text-brown-500">Origin countries</p>
              </div>
              <div className="w-px h-12 bg-brown-200" />
              <div>
                <p className="font-display text-display-md text-brown-900 font-semibold">100%</p>
                <p className="text-body-sm text-brown-500">Specialty grade</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
            <img
              ref={imageRef}
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=1067&fit=crop"
              alt="Nuur cafe interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
