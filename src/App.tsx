
import React from 'react';
import './App.css';
import BookList from './components/BookList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="fig">
        <h3>Book Store</h3>
        </div>
        <p>Manage your books with ease!</p>
      </header>
      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;
