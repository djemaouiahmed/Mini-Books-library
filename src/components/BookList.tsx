import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteBook, sortBooks } from '../booksSlice';
import BookForm from './BookForm';
import DeleteConfirmation from './DeleteConfirmation';
import { Book } from '../booksData';

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();

  // State to manage selected rows
  const [selectedRows, setSelectedRows] = useState<Book[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const handleDelete = (book: Book) => {
    setBookToDelete(book);
    setIsDeletePopupOpen(true);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortBooks(event.target.value));
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete.id));
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeletePopupOpen(false);
    setBookToDelete(null);
  };

  // Toggle selection of a row
  const toggleRowSelection = (book: Book) => {
    if (isSelected(book)) {
      setSelectedRows(selectedRows.filter((row) => row.id !== book.id));
    } else {
      setSelectedRows([...selectedRows, book]);
    }
  };

  // Check if a row is selected
  const isSelected = (book: Book) => {
    return selectedRows.some((row) => row.id === book.id);
  };

  // Delete all selected rows
  const deleteSelectedRows = () => {
    selectedRows.forEach((book) => {
      dispatch(deleteBook(book.id));
    });
    setSelectedRows([]);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', borderBottom: '1px solid black',display:'flex',justifyContent:'center' }}>Book List</h1>
      <div className="buttons">
        <button onClick={() => setIsFormOpen(true)}>Add Book</button>
     
        <select onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
           <button onClick={deleteSelectedRows} disabled={selectedRows.length === 0}>
          Delete Selected ({selectedRows.length})
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th> {/* Row counter column */}
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id} className={isSelected(book) ? 'selected' : ''} onClick={() => toggleRowSelection(book)}>
              <td>{index + 1}</td> {/* Display row counter */}
              <td>{book.name}</td>
              <td>{book.price}</td>
              <td>{book.category}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book)}>Delete</button>
              </td>
              <td><input type="checkbox" checked={isSelected(book)} onChange={() => toggleRowSelection(book)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <BookForm book={selectedBook} onClose={() => setIsFormOpen(false)} />
      )}
      {isDeletePopupOpen && (
        <DeleteConfirmation
          bookName={bookToDelete?.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default BookList;
