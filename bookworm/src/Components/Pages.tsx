import React, { useState, useEffect } from "react";
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

  // Load current page value from cookie on component mount
  useEffect(() => {
    const storedCurrentPage = getCookie(`currentPage-${idbk}`);
    if (storedCurrentPage) {
      setCurrentPage(Number(storedCurrentPage));
    }
  }, []);

  const handleIncrement = () => {
    if (currentPage < pages) {
      const updatedPage = currentPage + 1;
      setCurrentPage(updatedPage);
      setCookie(`currentPage-${idbk}`, updatedPage.toString(), 7); // Set cookie for current page
    }
  };

  const handleDecrement = () => {
    if (currentPage > 0) {
      const updatedPage = currentPage - 1;
      setCurrentPage(updatedPage);
      setCookie(`currentPage-${idbk}`, updatedPage.toString(), 7); // Set cookie for current page
    }
  };

  return (
    <span className="flex-wrap flex justify-center gap-1 py-1">
      <img
        src={Minus}
        className="h-5 w-5 cursor-pointer"
        onClick={handleDecrement}
      />
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {currentPage} / {pages}
      </p>
      <img
        src={Plus}
        className="h-5 w-5 cursor-pointer"
        onClick={handleIncrement}
      />
    </span>
  );
};

export default Pages;
