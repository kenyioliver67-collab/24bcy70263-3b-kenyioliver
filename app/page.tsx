"use client";
import { useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "The Great Gatsby", author: "by F.Scott Fitzgerald" },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (!title || !author) return;

    const newBook: Book = {
      id: Date.now(),
      title,
      author,
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  const removeBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        Library Management System
      </h1>

      <input
        type="text"
        placeholder="Search books..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Book Title"
          className="p-2 border rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="p-2 border rounded w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </div>

      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow-md border"

          >
            <div>
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </div>
            <button
              onClick={() => removeBook(book.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
