import { Tabs, Card, Button } from "flowbite-react";
import { useState, useEffect } from 'react';
import BooksData from '../Components/Books';

interface Book {
  id: number;
  autor: string;
  rating: number;
  tytul: string;
  strony: number;
  strona: number;
  status: string;
  img: string;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(BooksData);
  }, []);

  return (
    <div id="content" className="flex flex-wrap justify-center">
      {books.map(book => (
        <div className="bg-white rounded-xl w-80 flex flex-start my-1 mx-1 " key={book.id}>
          <img src={book.img} className="w-28 rounded-xl"/>
          <div className="w-4/5">
            <p className="text-black">{book.autor}</p>
            <p className="text-black">{book.tytul}</p>
            <p className="text-black">Strona: {book.strona} / {book.strony}</p>
            <p className="text-black">Status: {book.status}</p>
            <p className="text-black">Ocena: {book.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}












export default function Home() {
  return (
    <>
    <div className="justify-start h-max min-h-screen px-2 py-2 m-2 flex-col flex bg-slate-200 gap-1">
    <form>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wyszukaj książkę..." required/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Szukaj</button>
    </div>
</form>




<ul className="grid grid-flow-col text-center text-gray-500 bg-white rounded-full">
  <li>
  <a href="#page2" className="flex justify-center bg-blue-700 rounded-full shadow text-white py-4">Czytane</a>
  </li>
  <li>
  <a href="#page3" className="flex justify-center py-4">Przeczytane</a>
  </li>
  <li>
    <a href="#page3" className="flex justify-center py-4">Planowane</a>
  </li>
  <li>
    <a href="#page4" className="flex justify-center py-4">Odrzucone</a>
  </li>
</ul>





<BookList/>



</div>
    </>
  )
}

