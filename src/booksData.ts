

export interface Book {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export const booksData: Book[] = [
  {
    id: 1,
    name: "To Kill a Mockingbird",
    price: 10.99,
    category: "Fiction",
    description: "A novel by Harper Lee published in 1960.",
  },
  {
    id: 2,
    name: "1984",
    price: 8.99,
    category: "Dystopian",
    description: "A novel by George Orwell published in 1949.",
  },
  {
    id: 3,
    name: "Moby Dick",
    price: 12.99,
    category: "Adventure",
    description: "A novel by Herman Melville published in 1851.",
  },
  {
    id: 4,
    name: "The Great Gatsby",
    price: 9.99,
    category: "Classic",
    description: "A novel by F. Scott Fitzgerald published in 1925.",
  },
];
