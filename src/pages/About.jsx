import AboutHero from '../components/layout/AboutHero'
import StorySection from '../components/layout/StorySection'
import CraftSection from '../components/layout/CraftSection'
import SpaceSection from '../components/layout/SpaceSection'
import CommunitySection from '../components/layout/CommunitySection'

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <AboutHero />
      <StorySection />
      <CraftSection />
      <SpaceSection />
      <CommunitySection />
    </div>
  )
}
