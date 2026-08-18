import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import useSmoothScroll from './hooks/useSmoothScroll'
import Preloader from './components/layout/Preloader'
import Navbar from './components/navigation/Navbar'
import BottomNav from './components/navigation/BottomNav'
import Footer from './components/layout/Footer'
import PageTransition from './components/layout/PageTransition'
import CartDrawer from './components/ordering/CartDrawer'

import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Reservations from './pages/Reservations'
import OnlineOrder from './pages/OnlineOrder'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  const [preloaderShown, setPreloaderShown] = useState(true)
  const location = useLocation()
  useSmoothScroll()

  useEffect(() => {
    document.body.classList.add('is-loading')
    return () => document.body.classList.remove('is-loading')
  }, [])

  const handlePreloaderExit = () => {
    setPreloaderShown(false)
    document.body.classList.remove('is-loading')
  }

  if (preloaderShown) {
    return <Preloader onExit={handlePreloaderExit} />
  }

  return (
    <div className="min-h-screen bg-cream-50 text-brown-900 font-body">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/online-order" element={<OnlineOrder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  )
}
