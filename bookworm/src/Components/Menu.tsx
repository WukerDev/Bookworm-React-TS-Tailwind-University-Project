import React, { useState, useEffect } from "react";
import BooksData from '../Components/Books';
import Stars  from '../Components/Stars';

const BookList = () => {
  const [selectedItem, setSelectedItem] = useState(0); // State to keep track of the selected item

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
    if (index === 0) {
      const filteredBooks = BooksData.filter(book => book.status === "Czytane");
      setBooks(filteredBooks);
    } else if (index === 1) {
      const filteredBooks = BooksData.filter(book => book.status === "Przeczytane");
      setBooks(filteredBooks);
    } else if (index === 2) {
      const filteredBooks = BooksData.filter(book => book.status === "Planowane");
      setBooks(filteredBooks);
    } else if (index === 3) {
      const filteredBooks = BooksData.filter(book => book.status === "Porzucone");
      setBooks(filteredBooks);
    }
  };
  interface Book {
    id: number;
    autor: string;
    rating: number;
    tytul: string;
    strony: number;
    strona: number;
    status: string;
    img: string;
    reviews: number;
    userRating: number;
  }

    const [books, setBooks] = useState<Book[]>([]);
  var score;
    useEffect(() => {
      const filteredBooks = BooksData.filter(book => book.status === "Czytane");;
      setBooks(filteredBooks);
    }, []);
  
  return (
    <div>
    <ul className="grid grid-flow-col text-center text-gray-500 bg-white rounded-full">
      <li>
        <a
         
          className={`flex justify-center py-4 ${
            selectedItem === 0 && "bg-blue-700  rounded-full text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(0)} // Handle click event to update selected item
        >            
          Czytane
        </a>
      </li>
      <li>
        <a
          
          className={`flex justify-center py-4 ${
            selectedItem === 1 && "bg-blue-700  rounded-full text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(1)} // Handle click event to update selected item
        >
          Przeczytane
        </a>
      </li>
      <li>
        <a
         
          className={`flex justify-center py-4 ${
            selectedItem === 2 && "bg-blue-700  rounded-full text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(2)} // Handle click event to update selected item
        >
          Planowane
        </a>
      </li>
      <li>
        <a
          
          className={`flex justify-center py-4 ${
            selectedItem === 3 && "bg-blue-700  rounded-full text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(3)} // Handle click event to update selected item
        >
        Porzucone
        </a>
      </li>
      </ul>
      <div id="content" className="flex flex-wrap justify-center pt-1">
        {books.map(book =>  (
          <div className="bg-white rounded-xl w-80 flex flex-start my-1 mx-1 " key={book.id}>
            <img src={book.img} className="w-28 rounded-xl"/>
            <div className="w-4/5 justify-center flex flex-col py-5">
              <p className="font-light text-slate-500 text-s">{book.autor}</p>
              <p className="text-black font-black text-lg">{book.tytul}</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{book.strona} / {book.strony}</p>
              <div className="flex items-center justify-center">
    <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">{book.rating}</p>
    <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{book.reviews} ocen</p>
</div>
<p className="text-sm font-medium text-gray-500 dark:text-gray-400"><div className="flex items-center justify-center">
  {score = book.userRating}
<Stars rating={score}/>
              </div></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};






export default BookList;
