import BookCard from './BookCard'

export default function CategorySection({ title, books }) {
  if (!books?.length) return null
  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-3">
        <h2 className="font-serif text-2xl">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {books.map(b => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  )
}
