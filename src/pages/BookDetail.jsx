import { useParams, Link } from 'react-router-dom'
import books from '../data/booksData'
import { useState } from 'react'
import useStore from '../store/useStore'

export default function BookDetail() {
  const { id } = useParams()
  const book = books.find(b => String(b.id) === String(id))
  const [tab, setTab] = useState('description')
  const { favorites, toggleFavorite, addToCart } = useStore()
  const isFav = book ? favorites.includes(book.id) : false

  if (!book) return <div className="max-w-4xl mx-auto px-4 py-10">Not found</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={book.cover}
          alt={book.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget
            if (img.dataset.fallbacked) return
            img.dataset.fallbacked = '1'
            img.src = '/placeholder.svg'
          }}
          className="w-full rounded-xl border border-sand shadow-soft"
        />
      </div>
      <div>
        <h1 className="font-serif text-3xl">{book.title}</h1>
        <p className="opacity-80">{book.author}</p>
        <div className="mt-3 text-cocoa font-semibold">${book.price.toFixed(2)} <span className="text-sm opacity-70 font-normal ml-2">Rent from ${book.rentPrice.toFixed(2)}</span></div>
        <div className="text-sm opacity-80 mt-1">{book.genre} • {book.language} • {book.condition}</div>
        <div className="flex gap-2 mt-4">
          <button className="px-3 py-2 rounded-lg bg-gold/20 hover:bg-gold/30" onClick={() => addToCart(book.id, 1)}>Buy Now</button>
          <button className="px-3 py-2 rounded-lg bg-sand hover:bg-sand/80" onClick={() => addToCart(book.id, 1)}>Add to Cart</button>
          <button onClick={() => toggleFavorite(book.id)} className={`px-3 py-2 rounded-lg border border-sand hover:bg-beige/60 ${isFav ? 'bg-gold/20' : ''}`}>{isFav ? 'Wishlisted' : 'Wishlist'}</button>
          {book.availability.rent && <Link to={`/rent/${book.id}`} className="px-3 py-2 rounded-lg border border-sand hover:bg-beige/60">Rent</Link>}
          {book.availability.read && <Link to={`/reader/${book.id}`} className="px-3 py-2 rounded-lg border border-sand hover:bg-beige/60">Read Online</Link>}
        </div>

        <div className="mt-6">
          <div className="flex gap-4 border-b border-sand">
            {['description','reviews','seller','rent'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-2 py-2 -mb-px border-b-2 ${tab===t ? 'border-cocoa' : 'border-transparent opacity-60'}`}>{t[0].toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
          <div className="pt-4 text-sm leading-relaxed">
            {tab === 'description' && <p>{book.description}</p>}
            {tab === 'reviews' && <p>Reviews are coming soon.</p>}
            {tab === 'seller' && <p>Seller information will appear here.</p>}
            {tab === 'rent' && <p>Rent details and policies will be shown here.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
