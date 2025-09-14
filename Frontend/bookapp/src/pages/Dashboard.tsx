import { useEffect, useState } from "react";
import { BookOpen, User, Layers } from "lucide-react";
import api from "../api/axios";

interface Book {
    id: number;
    title: string;
    author: string;
    year?: number;
    genre?: string;
    cover_path?: string;
}

export default function Dashboard() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        api.get<Book[]>("/books").then((res) => setBooks(res.data));
    }, []);

    const totalBooks = books.length;
    const totalAuthors = new Set(books.map((b) => b.author)).size;
    const totalGenres = new Set(books.map((b) => b.genre).filter(Boolean)).size;

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
                    <BookOpen className="text-blue-600 w-10 h-10" />
                    <div>
                        <h3 className="text-gray-500 text-sm">Total Books</h3>
                        <p className="text-2xl font-bold">{totalBooks}</p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
                    <User className="text-green-600 w-10 h-10" />
                    <div>
                        <h3 className="text-gray-500 text-sm">Authors</h3>
                        <p className="text-2xl font-bold">{totalAuthors}</p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
                    <Layers className="text-purple-600 w-10 h-10" />
                    <div>
                        <h3 className="text-gray-500 text-sm">Genres</h3>
                        <p className="text-2xl font-bold">{totalGenres}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Books Added (Monthly)</h3>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        📈 Chart Placeholder
                    </div>
                </div>
                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Genres</h3>
                    <div className="h-40 flex items-center justify-center text-gray-400">
                        🥧 Chart Placeholder
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                    {books.slice(-3).reverse().map((book) => (
                        <li key={book.id}>
                            📘 New book <span className="font-medium">"{book.title}"</span>{" "}
                            added by <span className="font-medium">{book.author}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
