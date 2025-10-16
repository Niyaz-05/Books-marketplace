import { useState } from 'react'
import { categories, conditions } from '../data/booksData'

export default function SellBook() {
  const [form, setForm] = useState({
    title: '', author: '', category: categories[0], condition: conditions[0], price: '', description: '',
  })
  const [file, setFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <h1 className="font-serif text-3xl mb-2">Your listing is live</h1>
        <p className="opacity-80">Thanks for sharing your book with the community.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-4">Sell your book</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="border border-sand rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-900/60" required />
          <input value={form.author} onChange={e=>setForm({...form,author:e.target.value})} placeholder="Author" className="border border-sand rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-900/60" required />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="border border-sand rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-900/60">
            {categories.map(c=> <option key={c}>{c}</option>)}
          </select>
          <select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} className="border border-sand rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-900/60">
            {conditions.map(c=> <option key={c}>{c}</option>)}
          </select>
          <input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price" className="border border-sand rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-900/60" required />
        </div>
        <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" rows={5} className="w-full border border-sand rounded-lg px-3 py-2 bg-white/70 dark:bg-neutral-900/60" />
        <div className="flex items-center gap-4">
          <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0]||null)} />
          {file && <img src={URL.createObjectURL(file)} alt="preview" className="h-16 w-12 object-cover rounded" />}
        </div>
        <button className="px-4 py-2 rounded-lg bg-gold/20 hover:bg-gold/30">Publish</button>
      </form>
    </div>
  )
}
