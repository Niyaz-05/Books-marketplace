import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import books from '../data/booksData'

export default function RentPage() {
  const { id } = useParams()
  const book = useMemo(() => books.find(b => String(b.id) === String(id)), [id])
  const [days, setDays] = useState(14)

  const returnDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + Number(days))
    return d.toDateString()
  }, [days])

  const base = book?.rentPrice ?? 3.5
  const total = (base * (Number(days) / 7)).toFixed(2)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-2">Rent a book</h1>
      {book && <p className="opacity-80 mb-4">{book.title} by {book.author}</p>}

      <div className="bg-beige/60 rounded-lg p-4 border border-sand space-y-3">
        <label className="block">Duration</label>
        <div className="flex gap-2">
          {[7,14,30].map(d => (
            <button key={d} onClick={()=>setDays(d)} className={`px-3 py-1.5 rounded-full border ${days===d ? 'bg-gold/20 border-gold' : 'border-sand hover:bg-beige/60'}`}>{d} days</button>
          ))}
        </div>
        <div className="text-sm">Return by <span className="font-semibold">{returnDate}</span></div>
        <div className="text-sm">Total: <span className="font-semibold">${total}</span></div>
        <button className="mt-2 px-4 py-2 rounded-lg bg-sand hover:bg-sand/80">Proceed to checkout</button>
      </div>
    </div>
  )
}
