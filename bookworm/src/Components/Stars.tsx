import React, { useState, useEffect } from "react";
import { Rating } from "flowbite-react";

interface Props {
  rating: number;
  idbook: number;
}
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
const Stars: React.FC<Props> = ({ idbook, rating }) => {
  const [userRating, setUserRating] = useState(rating);

  useEffect(() => {
    // Load user rating from cookies when the component mounts
    const loadedUserRating = getCookie(`userRating_${idbook}`);
    if (loadedUserRating) {
      setUserRating(parseInt(loadedUserRating));
    }
  }, [idbook]);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
    // Save user rating to cookies
    setCookie(`userRating_${idbook}`, newRating.toString(), 30); // Expires after 30 days
    // Call the function to update the user rating in the parent component
    updateBookUserRating(idbook, newRating);
  };

  const updateBookUserRating = (idbook: number, newRating: number) => {
    // Your logic to update the book data with the new user rating
    // For example, you can update the BooksData array in your parent component's state or pass it to any other appropriate function
    console.log(`Updating book with idbook=${idbook} with userRating=${newRating}`);
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
