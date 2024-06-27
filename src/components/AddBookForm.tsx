import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../booksSlice';

interface AddBookFormProps {
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '0',
    category: '',
    description: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceAsNumber = Number(formData.price);
    dispatch(addBook({ id: Date.now(), ...formData, price: priceAsNumber }));
    onClose();
    resetForm();
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '0',
      category: '',
      description: ''
    });
  };

  return (
    <div className="popup">
      <h2>Add Book</h2>

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
        <button type="submit">Add</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddBookForm;
