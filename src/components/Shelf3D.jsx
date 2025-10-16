import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const shelfColors = [
  'from-gold/40 to-beige/50',
  'from-sand to-cream',
  'from-gold/30 to-sand',
  'from-beige to-cream',
]

export default function Shelf3D({ categories = [] }) {
  return (
    <div className="[perspective:1000px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat}
            whileHover={{ rotateX: 6, rotateY: -4, translateZ: 8 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="relative rounded-xl overflow-hidden border border-sand shadow-soft bg-gradient-to-br"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${shelfColors[i % shelfColors.length]} pointer-events-none`} />
            <Link to={`/category/${encodeURIComponent(cat)}`} className="relative isolate flex flex-col items-center justify-center h-36 sm:h-40 md:h-44">
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-cocoa/70" />
              <span className="font-serif text-xl">{cat}</span>
              <span className="text-xs opacity-70">Explore books</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
