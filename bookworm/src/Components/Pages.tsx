import React, { useState } from "react";
import { Rating } from "flowbite-react";
import BooksData from '../Components/Books';
import Minus from './minus.svg';
import Plus from './plus.svg';

interface Props {
  idbk: number;
  pages: number;
  currentpages: number;
}

const Pages: React.FC<Props> = ({ idbk, pages, currentpages }) => {
  const [currentPage, setCurrentPage] = useState(currentpages);

  const handleIncrement = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDecrement = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
