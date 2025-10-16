import { Link } from 'react-router-dom'
import books from '../data/booksData'
import useStore from '../store/useStore'

export default function Cart() {
  const { cart, setQty, removeFromCart, clearCart } = useStore()
  const entries = Object.entries(cart || {}).map(([id, qty]) => {
    const book = books.find(b => String(b.id) === String(id))
    return book ? { book, qty } : null
  }).filter(Boolean)
  const total = entries.reduce((sum, it) => sum + (it.book.price * it.qty), 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-4">Your Cart</h1>
      {entries.length === 0 ? (
        <div className="bg-beige/60 rounded-lg p-4 border border-sand">
          <p className="opacity-80">Your cart is empty.</p>
          <div className="mt-3">
            <Link to="/" className="px-4 py-2 rounded-lg bg-gold/20 hover:bg-gold/30">Browse books</Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {entries.map(({ book, qty }) => (
              <div key={book.id} className="flex gap-3 items-start bg-beige/60 rounded-lg p-3 border border-sand">
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
                  className="w-16 h-24 object-cover rounded border border-sand"
                />
                <div className="flex-1">
                  <Link to={`/book/${book.id}`} className="font-serif hover:underline">{book.title}</Link>
                  <div className="text-sm opacity-70">{book.author}</div>
                  <div className="mt-1 text-sm">${book.price.toFixed(2)} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e)=> setQty(book.id, Math.max(1, Number(e.target.value) || 1))}
                    className="w-16 px-2 py-1 border border-sand rounded bg-white/70 dark:bg-neutral-900/60"
                  />
                  <button onClick={()=>removeFromCart(book.id)} className="text-sm underline opacity-70">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="md:col-span-1 bg-beige/60 rounded-lg p-4 border border-sand h-max">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="mt-3 w-full inline-block text-center px-4 py-2 rounded-lg bg-gold/20 hover:bg-gold/30">Checkout</Link>
            <button onClick={clearCart} className="mt-2 w-full text-sm underline opacity-70">Clear cart</button>
          </aside>
        </div>
      )}
    </div>
  )
}
