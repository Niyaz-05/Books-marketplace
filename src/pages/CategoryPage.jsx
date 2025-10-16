import { useParams } from 'react-router-dom'
import CategorySection from '../components/CategorySection'
import books, { conditions } from '../data/booksData'

export default function CategoryPage() {
  const { name } = useParams()
  const filtered = books.filter(b => b.category.toLowerCase() === decodeURIComponent(name || '').toLowerCase())

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="font-serif text-3xl mb-4">{decodeURIComponent(name || '')}</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-4">
          <div className="bg-beige/60 rounded-lg p-4 border border-sand">
            <h2 className="font-semibold mb-2">Filters</h2>
            <div className="text-sm opacity-70">Price, author, language (coming soon)</div>
          </div>
        </aside>
        <div className="md:col-span-3">
          {conditions.map(cond => (
            <CategorySection key={cond} title={cond} books={filtered.filter(b => b.condition === cond)} />
          ))}
        </div>
      </div>
    </div>
  )
}
