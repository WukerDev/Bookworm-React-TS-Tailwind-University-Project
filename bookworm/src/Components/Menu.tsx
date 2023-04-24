import React, { useState, useEffect } from "react";
import BooksData from "../Components/Books";
import Stars from "../Components/Stars";
import Pages from "../Components/Pages";
import PopupForm from '../Components/Form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Rating } from "flowbite-react";


const BookList = () => {
  var BookCount = BooksData.length+1;
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState({
  autor: '',
  tytul: '',
  iloscStron: 0,
  przeczytaneStrony: 0,
  ocenaUzytkownika: 0,
  zdjecieLink: '',
  status: 'Czytane',
});
  const [selectedItem, setSelectedItem] = useState(0); // State to keep track of the selected item
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = books.filter(
      (book) =>
        book.tytul.toLowerCase().includes(searchTerm.toLowerCase()) || // search by title
        book.autor.toLowerCase().includes(searchTerm.toLowerCase()) // search by author
    );
    setSearchResults(results);
    setButtonClicked(true);
  }


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

  var newBook: Book = {
    id: BookCount, // set the id value as needed
    autor: '', // set the autor value as needed
    rating: 0, // set the rating value as needed
    tytul: '', // set the tytul value as needed
    strony: 0, // set the strony value as needed
    strona: 0, // set the strona value as needed
    status: 'Czytane', // set the status value as needed
    img: '', // set the img value as needed
    reviews: 0, // set the reviews value as needed
    userRating: 0 // set the userRating value as needed
  };

  const handleNewBook = () => {
    // Save the new book to session storage
    sessionStorage.setItem(`book_${newBook.id}`, JSON.stringify(newBook));
    
    // Update the BooksData array with the new book
    BooksData.push(newBook);
    
    // Update the book count
    BookCount++;
    
    // Update the cookie with the latest book count
    setCookie("bookCount", BookCount.toString(), 7);
  
    let filteredBooks = [];
    
    // Set the initial books based on the selected tab
    switch (selectedItem) {
      case 0:
        filteredBooks = BooksData.filter((book) => book.status === "Czytane");
        break;
      case 1:
        filteredBooks = BooksData.filter((book) => book.status === "Przeczytane");
        break;
      case 2:
        filteredBooks = BooksData.filter((book) => book.status === "Planowane");
        break;
      case 3:
        filteredBooks = BooksData.filter((book) => book.status === "Porzucone");
        break;
      default:
        filteredBooks = BooksData;
    }
    
    setBooks(filteredBooks);
  };
  
  // Function to handle setting and getting cookies
  const setCookie = (name: string, value: any, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  
  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
  useEffect(() => {
    // Filter the BooksData array to get "Czytane" books
    const filteredBooks = BooksData.filter((book) => book.status === "Czytane");
    setBooks(filteredBooks); // Set the filtered books to the books state variable
  }, []);
  
  const handleItemClick = (index: number) => {
    setSelectedItem(index);
    let filteredBooks = [];
  
    // Set the initial books based on the selected tab
    switch (index) {
      case 0:
        filteredBooks = BooksData.filter((book) => book.status === "Czytane");
        break;
      case 1:
        filteredBooks = BooksData.filter((book) => book.status === "Przeczytane");
        break;
      case 2:
        filteredBooks = BooksData.filter((book) => book.status === "Planowane");
        break;
      case 3:
        filteredBooks = BooksData.filter((book) => book.status === "Porzucone");
        break;
      default:
        filteredBooks = BooksData;
    }
  
    setBooks(filteredBooks);
    setSearchResults([]);
    setButtonClicked(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newBook.autor = formData.autor, // set the autor value as needed
    newBook.rating = 0, // set the rating value as needed
    newBook.tytul = formData.tytul, // set the tytul value as needed
    newBook.strony = formData.iloscStron, // set the strony value as needed
    newBook.strona = formData.przeczytaneStrony, // set the strona value as needed
    newBook.status = formData.status, // set the status value as needed
    newBook.img = formData.zdjecieLink, // set the img value as needed
    newBook.reviews = 0, // set the reviews value as needed
    newBook.userRating = formData.ocenaUzytkownika // set the userRating value as needed
    // TODO: Handle form submission logic
    handleNewBook();
    handleClose();
  };

  return (
    <>
    
    <form onSubmit={handleButtonClick}> {/* add onSubmit handler */}
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only  dark:text-white">Wyszukaj</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" value={searchTerm} onChange={handleInputChange} className="block w-full p-4 pl-10 text-sm text-gray-900 border shadow-lg border-gray-300 rounded-lg  bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wyszukaj książkę..." required/>
          <button type="submit"  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Wyszukaj</button>
        </div>
      </form>
    <div>
    <ul className="grid grid-flow-col text-center text-gray-500  bg-white rounded-lg  border border-gray-300 shadow-lg ">
      <li>
        <a
         
          className={`flex justify-center py-4  ${
            selectedItem === 0 && "bg-blue-700  hover:bg-blue-800 rounded-lg text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(0)} // Handle click event to update selected item
        >            
          Czytane
        </a>
      </li>
      <li>
        <a
          
          className={`flex justify-center py-4  px-2 ${
            selectedItem === 1 && "bg-blue-700 hover:bg-blue-800  rounded-lg text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(1)} // Handle click event to update selected item
        >
          Przeczytane
        </a>
      </li>
      <li>
        <a
         
          className={`flex justify-center py-4  px-2 ${
            selectedItem === 2 && "bg-blue-700 hover:bg-blue-800  rounded-lg text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(2)} // Handle click event to update selected item
        >
          Planowane
        </a>
      </li>
      <li>
        <a
          
          className={`flex justify-center py-4  px-2 ${
            selectedItem === 3 && "bg-blue-700 hover:bg-blue-800  rounded-lg text-white font-bold" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(3)} // Handle click event to update selected item
        >
        Porzucone
        </a>
      </li>
      </ul>
      <div hidden={true}><svg aria-hidden="true"  className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg></div>
      {buttonClicked && searchResults.length > 0 ? (
          <div id="content" className="flex flex-wrap justify-center pt-1 ">
          {searchResults.map(book => (
            <div id="debug" className="bg-white rounded-xl  w-80 flex flex-start my-1 mx-1 border border-gray-300 shadow-lg" key={book.id}>
              <img src={book.img} className="w-28 rounded-xl"/>
              <div className="w-4/5 h-44 justify-center flex flex-col ">
                <p className="font-light text-slate-500 text-s">{book.autor}</p>
                <p className="text-black font-black text-lg">{book.tytul}</p>
                <Pages idbk={book.id} pages={book.strony} currentpages={book.strona}/>
                <div className="flex items-center justify-center">
                  <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800 drop-shadow-md">{book.rating}</p>
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
          <div className="bg-white rounded-xl w-80 flex flex-start my-1 mx-1 border border-gray-300 shadow-lg" key={book.id}>
            <img src={book.img} className="w-28 rounded-xl"/>
            <div className="w-4/5 h-44 justify-center flex flex-col">
              <p className="font-light text-slate-500 text-s">{book.autor}</p>
              <p className="text-black font-black text-lg">{book.tytul}</p>
              <Pages idbk={book.id} pages={book.strony} currentpages={book.strona}/>
              <div className="flex items-center justify-center">
    <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 drop-shadow-md dark:text-blue-800">{book.rating}</p>
    <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{book.reviews} ocen</p>
</div>
<p className="text-sm font-medium text-gray-500 dark:text-gray-400"><div className="flex items-center justify-center">
<Stars idbook={book.id} rating={book.userRating}/>

              </div></p>
            </div>
          </div>
        ))}
      </div>
      )}
</div>
<div className="fixed bottom-5 right-5 ">
      <Button variant="contained" onClick={handleOpen} className="">
        Dodaj
      </Button>
      <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Popup Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Autor"
              name="autor"
              value={formData.autor}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Tytuł"
              name="tytul"
              value={formData.tytul}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Ilość stron"
              name="iloscStron"
              value={formData.iloscStron}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Przeczytane strony"
              name="przeczytaneStrony"
              value={formData.przeczytaneStrony}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              select
              label="Ocena użytkownika"
              name="ocenaUzytkownika"
              value={formData.ocenaUzytkownika}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="0">Brak oceny</MenuItem>
              <MenuItem value="1">
              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
              </MenuItem>
              <MenuItem value="2">
              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
                </MenuItem>
              <MenuItem value="3">              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment></MenuItem>
              <MenuItem value="4"><React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment></MenuItem>
              <MenuItem value="5">
              <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
                <Rating.Star filled={true} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
              </MenuItem>
            </TextField>
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Czytane">Czytane</MenuItem>
              <MenuItem value="Przeczytane">Przeczytane</MenuItem>
              <MenuItem value="Planowane">Planowane</MenuItem>
              <MenuItem value="Porzucone">Porzucone</MenuItem>
            </TextField>
            <TextField
              label="Zdjęcie link"
              name="zdjecieLink"
              value={formData.zdjecieLink}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleClose}>Anuluj</Button>
              <Button type="submit" variant="contained" color="primary">
                Dodaj
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
         </>
  );
};






export default BookList;
