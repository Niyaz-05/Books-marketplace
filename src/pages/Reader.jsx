import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

export default function Reader() {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [dark, setDark] = useState(false)
  const { reading, setReadingProgress } = useStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    // Initialize page from store when book id changes
    const initial = reading?.[id] || 1
    setPage(initial)
  }, [id])

  useEffect(() => {
    // Persist progress on every page change
    if (id) setReadingProgress(id, page)
  }, [id, page])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-serif text-2xl">Reader</h1>
        <button onClick={()=>setDark(d=>!d)} className="px-3 py-1.5 rounded-full border border-sand hover:bg-beige/60">{dark ? 'Light' : 'Dark'} mode</button>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-sand shadow-soft p-6 min-h-[60vh] leading-8 font-serif text-lg">
        <p>Reading book #{id}. Page {page}.</p>
        <p className="mt-4 opacity-80">This is a distraction-free reading mode with book-like typography. Page-turn animations and highlights will be added soon.</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-4 py-2 rounded-lg border border-sand hover:bg-beige/60">Previous</button>
        <button onClick={()=>setPage(p=>p+1)} className="px-4 py-2 rounded-lg bg-gold/20 hover:bg-gold/30">Next</button>
      </div>
    </div>
  )
}
