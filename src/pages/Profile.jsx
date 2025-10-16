export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="font-serif text-3xl">Your Library</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-beige/60 rounded-lg p-4 border border-sand">
          <h2 className="font-semibold mb-2">Purchased</h2>
          <p className="text-sm opacity-70">Items will appear here.</p>
        </div>
        <div className="bg-beige/60 rounded-lg p-4 border border-sand">
          <h2 className="font-semibold mb-2">Rented</h2>
          <p className="text-sm opacity-70">With return date reminders.</p>
        </div>
        <div className="bg-beige/60 rounded-lg p-4 border border-sand">
          <h2 className="font-semibold mb-2">Listed for sale</h2>
          <p className="text-sm opacity-70">Your listings will show here.</p>
        </div>
      </div>
    </div>
  )
}
