import { useEffect } from "react";
import { Table, Button, Space, Popconfirm, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { fetchBooks } from "../../store/slices/BookSlice";
interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  genre?: string;
  cover_path?: string;
}

export default function BooksList() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((s) => s.books.items);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const deleteBook = async (id: number) => {
    await api.delete(`/books/${id}`);
    dispatch(fetchBooks());
  };

  const columns = [
    {
      title: "Cover",
      dataIndex: "cover_path",
      key: "cover",
      render: (v: string) =>
        v ? <Image src={`http://localhost:5000${v}`} width={60} /> : null,
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Genre", dataIndex: "genre", key: "genre" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Book) => (
        <Space>
          <Link to={`/books/${record.id}`}>View</Link>
          <Link to={`/books/${record.id}/edit`}>Edit</Link>
          <Popconfirm title="Delete?" onConfirm={() => deleteBook(record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Books</h2>
        <div className='flex gap-2'>
          <Button onClick={() => navigate('/books/add')} type='primary'>Add Book</Button>
        </div>
      </div>
      <div className='card'>
        <Table<Book> rowKey='id' columns={columns} dataSource={books} />
      </div>
    </div>
  );
}
