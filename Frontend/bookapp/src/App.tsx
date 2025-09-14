import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BookList from "./pages/books/BookList";
import BookForm from "./pages/books/BookForm";
import BookDetails from "./pages/books/BooksDetails";
import Sidebar from "./component/Sidebar";
import Profile from "./pages/Profile";
import Footer from "./component/Footer";
import Header from "./component/Headers";

export default function App() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-6 text-2xl font-bold text-indigo-600">📚 BookApp</div>
          {<Sidebar />}
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/add" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/books/:id/edit" element={<BookForm edit />} />
          </Routes>

        </main>
      </div>
      <Footer />
    </>
  );
}
