import React from 'react';
import EditBookForm from './EditBookForm';
import AddBookForm from './AddBookForm';
import { Book } from '../booksData';

interface ParentComponentProps {
  book?: Book | null;
  onClose: () => void;
}

const ParentComponent: React.FC<ParentComponentProps> = ({ book, onClose }) => {
  return (
    <div>
      {book ? (
        <EditBookForm book={book} onClose={onClose} />
      ) : (
        <AddBookForm onClose={onClose} />
      )}
    </div>
  );
};

export default ParentComponent;
