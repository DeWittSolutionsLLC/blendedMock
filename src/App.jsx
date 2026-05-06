import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/cart/CartDrawer'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'
import Contact from './components/Contact'
import Checkout from './components/Checkout'
import OrderTracker from './components/OrderTracker'
import OrderReturn from './components/OrderReturn'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        {/* CartDrawer is mounted globally so it persists across route changes */}
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/return" element={<OrderReturn />} />
          <Route path="/order/:orderId" element={<OrderTracker />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  )
}
