import { useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Shelf3D from '../components/Shelf3D'
import CategorySection from '../components/CategorySection'
import BookCard from '../components/BookCard'
import books, { categories } from '../data/booksData'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const q = (params.get('q') || '').toLowerCase().trim()
  const mode = (params.get('mode') || 'all').toLowerCase()

  const filtered = useMemo(() => {
    let list = books
    if (q) {
      list = list.filter(b => (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      ))
    }
    if (mode === 'buy') list = list.filter(b => b.availability.buy)
    if (mode === 'rent') list = list.filter(b => b.availability.rent)
    if (mode === 'read') list = list.filter(b => b.availability.read)
    return list
  }, [q, mode])

  const trending = useMemo(() => [...books].sort(() => Math.random() - 0.5).slice(0, 18), [])

  const trendRef = useRef(null)
  useEffect(() => {
    const el = trendRef.current
    if (!el) return
    let raf
    let running = true
    const step = () => {
      if (!running) return
      el.scrollLeft += 1
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollLeft = 0
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => { running = false; if (raf) cancelAnimationFrame(raf) }
  }, [])

  const setMode = (m) => {
    const next = new URLSearchParams(location.search)
    if (m === 'all') next.delete('mode')
    else next.set('mode', m)
    navigate({ pathname: '/', search: next.toString() })
  }

  return (
    <div>
      <section className="bg-beige">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="font-serif text-3xl md:text-4xl">Welcome to your virtual bookstore</h1>
          <p className="opacity-80 mt-2">Buy, sell, rent, and read in an elegant, immersive experience.</p>

          <div className="mt-6">
            <Shelf3D categories={categories} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <section className="py-6">
          <div className="flex items-end justify-between mb-3">
            <h2 className="font-serif text-2xl">Trending Now</h2>
          </div>
          <div ref={trendRef} className="flex gap-4 overflow-x-auto py-2">
            {trending.map(b => (
              <div key={b.id} className="w-40 sm:w-44 md:w-48 shrink-0">
                <BookCard book={b} />
              </div>
            ))}
          </div>
        </section>

        <section className="py-4">
          <div className="flex items-center gap-2">
            {['all','buy','rent','read'].map(m => (
              <button key={m} onClick={()=>setMode(m)} className={`px-3 py-1.5 rounded-full border border-sand hover:bg-beige/60 ${mode===m ? 'bg-gold/20' : ''}`}>{m[0].toUpperCase()+m.slice(1)}</button>
            ))}
          </div>
        </section>

        {(q || mode !== 'all') && (
          <CategorySection title={`Search Results${q ? ` for "${q}"` : ''}`} books={filtered.slice(0, 30)} />
        )}
      </div>
    </div>
  )
}
