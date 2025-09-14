import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";


interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  genre?: string;
  cover_path?: string;
}

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  useEffect(() => { if (id) api.get(`/books/${id}`).then(r => setBook(r.data)).catch(() => { }) }, [id])
  if (!book) return <div className='card'>Loading...</div>
  return (
    <div className='card max-w-2xl'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-2xl font-bold'>{book.title}</h2>
          <p className='text-sm text-gray-600'>Author: {book.author}</p>
          <p className='text-sm text-gray-600'>Year: {book.year}</p>
          <p className='text-sm text-gray-600'>Genre: {book.genre}</p>
        </div>
        {book.cover_path && <img src={`http://localhost:5000${book.cover_path}`} alt='cover' style={{ maxWidth: 200 }} />}
      </div>
      <div className='mt-4'>
        <Link to={`/books/${book.id}/edit`} className='text-indigo-600'>Edit book</Link>
      </div>
    </div>
  )
}