import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, ShoppingCart, Heart, User, Moon, Sun, Search } from 'lucide-react'
import useStore from '../store/useStore'

export default function Navbar() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [dark, setDark] = useState(false)
  const { favorites, cart } = useStore()
  const favCount = favorites.length
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const initial = stored ? stored === 'dark' : false
    setDark(initial)
    document.documentElement.classList.toggle('dark', initial)
  }, [])

  const toggleTheme = () => {
    setDark(prev => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', next)
      return next
    })
  }

  const onSearch = (e) => {
    e.preventDefault()
    navigate(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }

  return (
    <header className="sticky top-0 z-50 bg-beige/80 backdrop-blur border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-serif text-2xl">
          <BookOpen className="text-gold" />
          <span>Books</span>
        </Link>

        <form onSubmit={onSearch} className="flex-1 max-w-xl mx-auto hidden sm:flex items-center gap-2 bg-white/70 dark:bg-neutral-900/60 rounded-full px-3 py-2 shadow-soft border border-sand">
          <Search size={18} className="text-cocoa" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, author, or category"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </form>

        <nav className="ml-auto flex items-center gap-3">
          <Link to="/sell" className="px-3 py-1.5 rounded-full bg-gold/20 text-cocoa hover:bg-gold/30 text-sm">Sell</Link>
          <Link to="/profile" className="p-2 rounded-full hover:bg-sand/60" aria-label="Profile">
            <User size={20} />
          </Link>
          <Link to="/favorites" className="relative p-2 rounded-full hover:bg-sand/60" aria-label="Favorites">
            <Heart size={20} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-gold text-cocoa border border-sand">{favCount}</span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-sand/60" aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-gold text-cocoa border border-sand">{cartCount}</span>
            )}
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-sand/60" aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
