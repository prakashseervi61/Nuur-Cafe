import Hero from '../components/layout/Hero'
import Introduction from '../components/layout/Introduction'
import BestSeller from '../components/layout/BestSeller'
import BrandStory from '../components/layout/BrandStory'
import MenuPreview from '../components/layout/MenuPreview'
import SeasonalCollection from '../components/layout/SeasonalCollection'
import GalleryPreview from '../components/layout/GalleryPreview'
import Testimonials from '../components/layout/Testimonials'

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <Introduction />
      <BestSeller />
      <BrandStory />
      <MenuPreview />
      <SeasonalCollection />
      <GalleryPreview />
      <Testimonials />
    </div>
  )
}
