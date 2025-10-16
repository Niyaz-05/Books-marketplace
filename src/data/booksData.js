export const categories = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology', 'Romance', 'Mystery', 'History', 'Children', 'Self-Help', 'Fantasy'
]

export const conditions = ['New','Like New','Good','Used','Damaged']

const authors = ['A. Carter','M. Roy','S. Gupta','L. Nguyen','H. Patel','E. Stone','R. Kim','J. Silva','T. Brown','C. Zhang']
const languages = ['English','Spanish','French','German','Hindi']

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function makeBook(id) {
  const category = categories[rand(0, categories.length-1)]
  const author = authors[rand(0, authors.length-1)]
  const price = rand(5, 60) + 0.99
  const rentPrice = Math.max(2.49, +(price * (0.12 + Math.random()*0.18)).toFixed(2))
  const condition = conditions[rand(0, conditions.length-1)]
  const language = languages[rand(0, languages.length-1)]
  return {
    id,
    title: `${category} Book ${id}`,
    author,
    category,
    genre: category,
    price,
    rentPrice,
    condition,
    language,
    description: 'A captivating book that blends immersive storytelling with insightful ideas.',
    cover: `https://picsum.photos/seed/book_${id}/300/450`,
    availability: {
      buy: true,
      rent: Math.random() > 0.2,
      read: Math.random() > 0.5
    }
  }
}

function generateBooks(n=200) {
  return Array.from({ length: n }, (_, i) => makeBook(i+1))
}

const books = generateBooks(200)
export { generateBooks }
export default books
