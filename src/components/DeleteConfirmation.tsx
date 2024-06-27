
import React from 'react';

interface DeleteConfirmationProps {
  bookName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ bookName, onConfirm, onCancel }) => {
  return (
    <div className="popup">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete "{bookName}"?</p>
      <button onClick={onConfirm}>Yes, Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmation;
