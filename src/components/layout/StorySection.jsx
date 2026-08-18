import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const timeline = [
  {
    year: '2015',
    title: 'The Beginning',
    text: 'Two friends, a shared obsession with perfect coffee, and a small cart on Prinsengracht. We served our first espresso on a rainy Tuesday morning. Three regulars came back the next day.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
  },
  {
    year: '2017',
    title: 'Our First Home',
    text: 'We found a 40m² space on the canal belt. Stripped it back to brick, built the bar ourselves, and opened with six seats and a La Marzocco. The neighborhood welcomed us like family.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
  },
  {
    year: '2019',
    title: 'The Roastery',
    text: 'We partnered with a local roaster and opened our micro-roastery in Amsterdam-West. Small batches, full control, from green bean to golden crema. Twelve origin countries and counting.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=600&fit=crop',
  },
  {
    year: '2021',
    title: 'The Expansion',
    text: 'We doubled our space, added a kitchen, and introduced a seasonal food menu. But the heart stayed the same: pure ingredients, intentional preparation, warm service.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
  },
  {
    year: 'Today',
    title: 'Where We Are',
    text: 'Nuur is now a destination for coffee lovers, remote workers, and anyone seeking a moment of calm in the city. We remain independent, quality-obsessed, and deeply grateful.',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
  },
]

export default function StorySection() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return

        const image = item.querySelector('.story-image')
        const content = item.querySelector('.story-content')

        gsap.fromTo(
          image,
          { clipPath: 'inset(0 0 100% 0)', scale: 1.1 },
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
            },
          }
        )

        gsap.fromTo(
          content?.children || [],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 80%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-20">
          <span className="label-lg text-gold-600 block mb-3">Timeline</span>
          <h2 className="font-display text-display-lg text-brown-900 font-semibold">
            A decade of craft.
          </h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => (itemsRef.current[i] = el)}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              <div className={`overflow-hidden rounded-3xl aspect-[4/3] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="story-image w-full h-full object-cover"
                />
              </div>
              <div className={`story-content ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <span className="font-display text-display-md text-gold-600 font-semibold block mb-3">
                  {item.year}
                </span>
                <h3 className="font-display text-display-md text-brown-900 font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-body-lg text-brown-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
