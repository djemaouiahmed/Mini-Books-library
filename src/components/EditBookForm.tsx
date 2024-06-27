import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editBook } from '../booksSlice';
import { Book } from '../booksData';

interface EditBookFormProps {
  book: Book;
  onClose: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClose }) => {
  const [formData, setFormData] = useState({
    name: book.name,
    price: book.price.toString(),
    category: book.category,
    description: book.description
  });

  useEffect(() => {
    // Update form data when book prop changes (for editing)
    setFormData({
      name: book.name,
      price: book.price.toString(),
      category: book.category,
      description: book.description
    });
  }, [book]);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceAsNumber = Number(formData.price);
    dispatch(editBook({ ...book, ...formData, price: priceAsNumber }));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="popup">
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit} className='form'>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBookForm;
