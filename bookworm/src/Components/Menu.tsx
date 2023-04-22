import React, { useState } from "react";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(0); // State to keep track of the selected item

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <ul className="grid grid-flow-col text-center text-gray-500 bg-white rounded-full">
      <li>
        <a
          href="#page2"
          className={`flex justify-center py-4 ${
            selectedItem === 0 && "bg-blue-700  rounded-full text-white" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(0)} // Handle click event to update selected item
        >
          Czytane
        </a>
      </li>
      <li>
        <a
          href="#page3"
          className={`flex justify-center py-4 ${
            selectedItem === 1 && "bg-blue-700  rounded-full text-white" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(1)} // Handle click event to update selected item
        >
          Przeczytane
        </a>
      </li>
      <li>
        <a
          href="#page3"
          className={`flex justify-center py-4 ${
            selectedItem === 2 && "bg-blue-700  rounded-full text-white" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(2)} // Handle click event to update selected item
        >
          Planowane
        </a>
      </li>
      <li>
        <a
          href="#page4"
          className={`flex justify-center py-4 ${
            selectedItem === 3 && "bg-blue-700  rounded-full text-white" // Add a different style for the selected item
          }`}
          onClick={() => handleItemClick(3)} // Handle click event to update selected item
        >
          Odrzucone
        </a>
      </li>
    </ul>
  );
};

export default Menu;