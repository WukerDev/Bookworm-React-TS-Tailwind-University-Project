import React, { useState, useEffect } from "react";
import BooksData from '../Components/Books';
import Stars  from '../Components/Stars';
import Pages from '../Components/Pages';

const BookList = () => {
  const [selectedItem, setSelectedItem] = useState(0); // State to keep track of the selected item
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent form submission
    const results = BooksData.filter(book =>
      book.tytul.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setButtonClicked(true);
    setSelectedItem(5);
  };

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
    setSearchResults([]);
    setButtonClicked(false);
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
    <>
    <form onSubmit={handleButtonClick}> {/* add onSubmit handler */}
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" value={searchTerm} onChange={handleInputChange} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wyszukaj książkę..." required/>
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
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
      {buttonClicked && searchResults.length > 0 ? (
          <div id="content" className="flex flex-wrap justify-center pt-1">
          {searchResults.map(book => (
            <div className="bg-white rounded-xl w-80 flex flex-start my-1 mx-1 " key={book.id}>
              <img src={book.img} className="w-28 rounded-xl"/>
              <div className="w-4/5 justify-center flex flex-col py-5">
                <p className="font-light text-slate-500 text-s">{book.autor}</p>
                <p className="text-black font-black text-lg">{book.tytul}</p>
                <Pages idbook={book.id} pages={book.strony} currentpages={book.strona}/>
                <div className="flex items-center justify-center">
                  <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">{book.rating}</p>
                  <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{book.reviews} ocen</p>
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center justify-center">
                    <Stars idbook={book.id} rating={book.userRating} />
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div id="content" className="flex flex-wrap justify-center pt-1">
        {books.map(book =>  (
          <div className="bg-white rounded-xl w-80 flex flex-start my-1 mx-1 " key={book.id}>
            <img src={book.img} className="w-28 rounded-xl"/>
            <div className="w-4/5 justify-center flex flex-col py-5">
              <p className="font-light text-slate-500 text-s">{book.autor}</p>
              <p className="text-black font-black text-lg">{book.tytul}</p>
              <Pages idbook={book.id} pages={book.strony} currentpages={book.strona}/>
              <div className="flex items-center justify-center">
    <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">{book.rating}</p>
    <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{book.reviews} ocen</p>
</div>
<p className="text-sm font-medium text-gray-500 dark:text-gray-400"><div className="flex items-center justify-center">

<Stars idbook={book.id} rating={book.userRating} />
              </div></p>
            </div>
          </div>
        ))}
      </div>
      )}
</div>
</>
  );
};






export default BookList;
