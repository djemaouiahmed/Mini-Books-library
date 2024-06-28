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

  // State to manage form and delete confirmation popups
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // State to manage selected rows
  const [selectedRows, setSelectedRows] = useState<Book[]>([]);

  // Function to handle opening edit form
  const handleEdit = (book: Book) => {
    setSelectedBook(book);  // Set the selected book for editing
    setIsFormOpen(true);    // Open the form
  };

  // Function to handle opening delete confirmation popup
  const handleDelete = (book: Book) => {
    setBookToDelete(book);  // Set the book to delete
    setIsDeletePopupOpen(true);  // Open the delete confirmation popup
  };

  // Function to handle sorting books
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortBooks(event.target.value));
  };

  // Function to confirm book deletion
  const confirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete.id));
      setIsDeletePopupOpen(false);  // Close the delete confirmation popup
    }
  };

  // Function to delete selected rows
  const deleteSelectedRows = () => {
    selectedRows.forEach(book => {
      dispatch(deleteBook(book.id));
    });
    setSelectedRows([]);
  };

  // Function to cancel delete operation
  const cancelDelete = () => {
    setIsDeletePopupOpen(false);  // Close the delete confirmation popup
    setBookToDelete(null);       // Reset the book to delete
  };

  // Function to handle closing the form
  const handleCloseForm = () => {
    setIsFormOpen(false);  // Close the form
    setSelectedBook(null); // Reset selected book
  };

  // Function to toggle row selection
  const toggleRowSelection = (book: Book) => {
    if (selectedRows.includes(book)) {
      setSelectedRows(selectedRows.filter(selectedBook => selectedBook.id !== book.id));
    } else {
      setSelectedRows([...selectedRows, book]);
    }
  };

  // Function to check if a row is selected
  const isSelected = (book: Book) => {
    return selectedRows.includes(book);
  };

  return (
    <div>
      <h1 style={{ borderBottom: '1px solid black' }} >Book List</h1>
      <div className="buttons">
        <button onClick={() => {
          setIsFormOpen(true); // Open the form for adding a new book
          setSelectedBook(null); // Reset selected book for adding
        }}>Add Book</button>
        <button onClick={deleteSelectedRows} disabled={selectedRows.length === 0}>
          Delete Selected ({selectedRows.length})
        </button>
        <select onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
        </select>
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
            <tr
              key={book.id}
              className={isSelected(book) ? 'selected' : ''}
              onClick={() => toggleRowSelection(book)}
              style={{ backgroundColor: isSelected(book) ? '#e0e0e0' : 'transparent' }}
            >
              <td>{index + 1}</td> {/* Display row counter */}
              <td>{book.name}</td>
              <td>{book.price}</td>
              <td>{book.category}</td>

              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book)}>Delete</button>
              </td>
                <td>
                <input
                  type="checkbox"
                  checked={isSelected(book)}
    
                />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {/* Conditionally render BookForm and DeleteConfirmation components */}
      {isFormOpen && (
        <BookForm book={selectedBook} onClose={handleCloseForm} />
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
