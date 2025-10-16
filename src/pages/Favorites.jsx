import useStore from '../store/useStore'
import books from '../data/booksData'
import BookCard from '../components/BookCard'

export default function Favorites() {
  const { favorites } = useStore()
  const items = favorites.map(id => books.find(b => String(b.id) === String(id))).filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-4">Favorites</h1>
      {items.length === 0 ? (
        <div className="bg-beige/60 rounded-lg p-4 border border-sand">
          <p className="opacity-80">No favorites yet. Tap the heart on any book to add it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map(b => <BookCard key={b.id} book={b} />)}
        </div>
      )}
    </div>
  )
}
