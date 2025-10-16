import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import useStore from '../store/useStore'

export default function BookCard({ book }) {
  const { favorites, toggleFavorite, addToCart } = useStore()
  const isFav = favorites.includes(book.id)
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-neutral-900 rounded-xl shadow-soft border border-sand overflow-hidden flex flex-col"
    >
      <Link to={`/book/${book.id}`} className="block overflow-hidden relative">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget
            if (img.dataset.fallbacked) return
            img.dataset.fallbacked = '1'
            img.src = '/placeholder.svg'
          }}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(book.id) }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2 right-2 p-2 rounded-full border border-sand backdrop-blur bg-beige/70 hover:bg-beige/90 ${isFav ? 'text-red-600' : ''}`}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </Link>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <div className="min-h-[46px]">
          <h3 className="font-serif text-lg leading-tight line-clamp-2">{book.title}</h3>
          <p className="text-sm opacity-70">{book.author}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="text-cocoa font-semibold">${book.price.toFixed(2)}</div>
          <div className="text-xs opacity-70">{book.condition}</div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          {book.availability.buy && (
            <Link to={`/book/${book.id}`} className="text-xs px-2 py-1 rounded-full bg-gold/20 hover:bg-gold/30">Buy</Link>
          )}
          {book.availability.rent && (
            <Link to={`/rent/${book.id}`} className="text-xs px-2 py-1 rounded-full bg-sand hover:bg-sand/80">Rent</Link>
          )}
          {book.availability.read && (
            <Link to={`/reader/${book.id}`} className="text-xs px-2 py-1 rounded-full border border-sand hover:bg-beige/60">Read</Link>
          )}
          <button onClick={() => addToCart(book.id, 1)} className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-sand hover:bg-beige/60">
            <ShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}
