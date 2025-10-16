import { useMemo } from 'react'

export default function Checkout() {
  const orderId = useMemo(() => 'ORD-' + Date.now(), [])
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      <h1 className="font-serif text-3xl mb-2">Mock Checkout</h1>
      <p className="opacity-80">This is a simulation. No real payment occurs.</p>
      <div className="mt-6 bg-beige/60 rounded-lg p-6 border border-sand">
        <p className="font-semibold">Order ID</p>
        <p className="text-xl mt-1">{orderId}</p>
      </div>
    </div>
  )
}
