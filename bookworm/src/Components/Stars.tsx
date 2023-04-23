import React, { useState } from "react";
import { Rating } from "flowbite-react";
import BooksData from '../Components/Books';

interface Props {
  rating: number;
  idbook: number;
}

const Stars: React.FC<Props> = ({ idbook, rating }) => {
  const [userRating, setUserRating] = useState(rating);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    // Call the function to update the user rating in the parent component
    updateBookUserRating(idbook, newRating);
  };

  const updateBookUserRating = (idbook: number, newRating: number) => {
    const updatedBooks = BooksData.map(book => {
      if (book.id === idbook) {
        return { ...book, userRating: newRating };
      } else {
        return book;
      }
    });
    // Update the BooksData with the updatedBooks array
    // You can set the updatedBooks array in your parent component's state or pass it to any other appropriate function
    console.log(updatedBooks); // For example, you can log the updatedBooks array to see the changes
  };

  return (
    <React.Fragment>
      <Rating className="pt-1">
        <Rating.Star filled={userRating >= 1} onClick={() => handleRatingChange(1)} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={userRating >= 2} onClick={() => handleRatingChange(2)} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={userRating >= 3} onClick={() => handleRatingChange(3)} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={userRating >= 4} onClick={() => handleRatingChange(4)} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
        <Rating.Star filled={userRating >= 5} onClick={() => handleRatingChange(5)} className="cursor-pointer hover:fill-yellow-500 drop-shadow-md" />
      </Rating>
    </React.Fragment>
  );
};

export default Stars;
