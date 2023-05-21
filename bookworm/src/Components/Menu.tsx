import React, { useState, useEffect } from "react";
import BooksData from "../Components/Books";
import Stars from "../Components/Stars";
import Pages from "../Components/Pages";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Rating } from "flowbite-react";

const BookList = () => {
var BookCount = 20;
const [open, setOpen] = useState(false);
const [formData, setFormData] = useState({ autor: '',  tytul: '', iloscStron: 0, przeczytaneStrony: 0, ocenaUzytkownika: 0, zdjecieLink: '', status: 'Czytane', });
const formCleanup = () => { setFormData({ autor: '', tytul: '', iloscStron: 0, przeczytaneStrony: 0, ocenaUzytkownika: 0, zdjecieLink: '', status: 'Czytane', }); };
const [selectedItem, setSelectedItem] = useState(0); // State to keep track of the selected item
const [searchTerm, setSearchTerm] = useState<string>("");
const [searchResults, setSearchResults] = useState<Book[]>([]);
const [buttonClicked, setButtonClicked] = useState<boolean>(false);
const [books, setBooks] = useState<Book[]>([]);
const [bookCount, setBookCount] = useState()
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchTerm(event.target.value); };
const handleButtonClick = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Retrieve saved books from local storage
  const existingBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');

  // Merge existingBooks with BooksData
  const mergedBooks = [...existingBooks, ...BooksData];

  const results = mergedBooks.filter(
    (book) =>
      book.tytul.toLowerCase().includes(searchTerm.toLowerCase()) || // search by title
      book.autor.toLowerCase().includes(searchTerm.toLowerCase()) // search by author
  );

  if (results.length === 0) {
    // No matching books found
    setSearchResults([]);
    setButtonClicked(true);
    alert("Nie ma takiej książki!");
  } else {
    // Matching books found
    setSearchResults(results);
    setButtonClicked(true);
  }
}
interface Book { id: number; autor: string; rating: number; tytul: string; strony: number; strona: number; status: string; img: string; reviews: number; userRating: number; }
var newBook: Book = { id: BookCount,  autor: '',  rating: 0, tytul: '',  strony: 0,  strona: 0,  status: 'Czytane',  img: '', reviews: 0,  userRating: 0  
};
const handleNewBook = () => {
 // Retrieve existing book data from LocalStorage
 const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');
 const lastId = existingBooks.length > 0 ? existingBooks[existingBooks.length - 1].id : 0;
 if(lastId == 0) 
 {newBook.id = 20;}
 else 
  {newBook.id = lastId + 1;}
 const uniqueBooks = existingBooks.filter((book: Book) => book.id !== newBook.id);
 const updatedBooks = [...uniqueBooks, newBook];

 // Set the updated book data back into LocalStorage
 localStorage.setItem('books', JSON.stringify(updatedBooks));

 // Merge BooksData with updatedBooks and remove duplicates
 const mergedBooks = [...updatedBooks, ...BooksData];
 const mergedUniqueBooks = mergedBooks.reduce((acc: Book[], book: Book) => {
  if (!acc.find((b) => b.id === book.id)) {
    acc.push(book);
  }
  return acc;
}, []);

 // Filter the books based on the selected tab
 let filteredBooks = [];
 switch (selectedItem) {
   case 0:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Czytane");
     break;
   case 1:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Przeczytane");
     break;
   case 2:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Planowane");
     break;
   case 3:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Porzucone");
     break;
   default:
     filteredBooks = mergedUniqueBooks;
 }

 // Set the filtered books to the books state variable
 setBooks(filteredBooks);
};


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

     // Retrieve saved books from local storage
  const existingBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');

  // Set the initial books based on the selected tab
  const mergedBooks = [...existingBooks, ...BooksData];
 const mergedUniqueBooks = mergedBooks.reduce((acc: Book[], book: Book) => {
  if (!acc.find((b) => b.id === book.id)) {
    acc.push(book);
  }
  return acc;
}, []);

 // Filter the books based on the selected tab
 let filteredBooks = [];
 switch (selectedItem) {
   case 0:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Czytane");
     break;
   case 1:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Przeczytane");
     break;
   case 2:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Planowane");
     break;
   case 3:
     filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Porzucone");
     break;
   default:
     filteredBooks = mergedUniqueBooks;
 }

 // Set the filtered books to the books state variable
 setBooks(filteredBooks);
  }, [selectedItem]);
  
  const handleItemClick = (index: number) => {
    setSelectedItem(index);

    const existingBooks: Book[] = JSON.parse(localStorage.getItem('books') || '[]');

    // Set the initial books based on the selected tab
    const mergedBooks = [...existingBooks, ...BooksData];
   const mergedUniqueBooks = mergedBooks.reduce((acc: Book[], book: Book) => {
    if (!acc.find((b) => b.id === book.id)) {
      acc.push(book);
    }
    return acc;
  }, []);
  
   // Filter the books based on the selected tab
   let filteredBooks = [];
   switch (selectedItem) {
     case 0:
       filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Czytane");
       break;
     case 1:
       filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Przeczytane");
       break;
     case 2:
       filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Planowane");
       break;
     case 3:
       filteredBooks = mergedUniqueBooks.filter((book: Book) => book.status === "Porzucone");
       break;
     default:
       filteredBooks = mergedUniqueBooks;
   }
  
   // Set the filtered books to the books state variable
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
    newBook.autor = formData.autor, newBook.rating = 0, newBook.tytul = formData.tytul, newBook.strony = formData.iloscStron,  newBook.strona = formData.przeczytaneStrony,
    newBook.status = formData.status,  newBook.img = formData.zdjecieLink,  newBook.reviews = 0,  newBook.userRating = formData.ocenaUzytkownika 
    handleNewBook();  formCleanup();  handleClose();
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
                  <button className="bg-blue-600 text-white rounded-full px-2 py-1 mb-1 mt-1">Status</button>
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
              </div>
              <button className="bg-blue-600 text-white rounded-full px-2 py-1 mb-1 mt-1">Status</button>
              </p>
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
        <DialogTitle>Dodaj własną książkę</DialogTitle>
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
              inputProps={{
                pattern: '[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\s]*', // Allow alphabetic characters and spaces
              }}/>
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
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
            />
            <TextField
              label="Przeczytane strony"
              name="przeczytaneStrony"
              value={formData.przeczytaneStrony}
              onChange={handleChangeForm}
              fullWidth
              margin="normal"
              required
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
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
              type="url"
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
