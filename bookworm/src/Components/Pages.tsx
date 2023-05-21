import React, { useState, useEffect, useRef } from "react";
import { Rating } from "flowbite-react";
import BooksData from '../Components/Books';
import Minus from './minus.svg';
import Plus from './plus.svg';

// Function to get the value of a cookie by name
const getCookie = (name: string) => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

// Function to set the value of a cookie
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Function to delete a cookie by name
const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

interface Props {
  idbk: number;
  pages: number;
  currentpages: number;
}

const Pages: React.FC<Props> = ({ idbk, pages, currentpages }) => {
  const [currentPage, setCurrentPage] = useState(currentpages);
  const [maxPages, setMaxPages] = useState(pages);

  const currentPageRef = useRef(currentPage);
  currentPageRef.current = currentPage;

  // Load current page value from cookie on component mount
  useEffect(() => {
    const storedCurrentPage = getCookie(`currentPage-${idbk}`);
    if (storedCurrentPage) {
      setCurrentPage(Number(storedCurrentPage));
    }
  }, []);

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (!isNaN(newValue) && newValue <= maxPages) {
      setCurrentPage(newValue);
      setCookie(`currentPage-${idbk}`, newValue.toString(), 7); // Set cookie for current page
    }
  };

  const handleMaxPagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (!isNaN(newValue) && newValue >= 0 && newValue >= currentPageRef.current) {
      setMaxPages(newValue);
      if (currentPage > newValue) {
        setCurrentPage(newValue);
        setCookie(`currentPage-${idbk}`, newValue.toString(), 7); // Set cookie for current page
      }
    }
  };

  return (
    <span className="flex-wrap flex justify-center">
      <div className="gap-0">
        <input
          type="number"
          value={currentPage}
          onChange={handlePageChange}
          className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 text-right border-none outline-none outline-offset-0"
        />
          <span  className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 text-right border-none outline-none outline-offset-0">/</span>
        <input
          type="number"
          value={maxPages}
          onChange={handleMaxPagesChange}
          className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 text-left border-none outline-none outline-offset-0"
        />
      </div>
    </span>
  );
};

export default Pages;
