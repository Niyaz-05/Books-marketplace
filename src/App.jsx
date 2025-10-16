import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import BookDetail from './pages/BookDetail.jsx'
import SellBook from './pages/SellBook.jsx'
import RentPage from './pages/RentPage.jsx'
import Reader from './pages/Reader.jsx'
import Profile from './pages/Profile.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Favorites from './pages/Favorites.jsx'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-bark">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/sell" element={<SellBook />} />
          <Route path="/rent/:id?" element={<RentPage />} />
          <Route path="/reader/:id" element={<Reader />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
