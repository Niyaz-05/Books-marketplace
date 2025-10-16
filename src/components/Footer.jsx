export default function Footer() {
  return (
    <footer className="border-t border-sand bg-beige/60">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="opacity-80">© {new Date().getFullYear()} Books. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#faqs" className="hover:underline">FAQs</a>
        </nav>
      </div>
    </footer>
  )
}
