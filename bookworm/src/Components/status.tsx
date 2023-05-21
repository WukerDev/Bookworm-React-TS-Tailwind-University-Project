import React, { useState, useEffect, useRef } from 'react';
import blank from "../Components/blank.png";
import check from "../Components/check.png";
import close from "../Components/close.png";
import going from "../Components/going.png";

interface StatusProps {
  status: string;
    idbook: number;
}

const StatusManagerComponent = ({idbook, status }: StatusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (buttonType: string) => {
    setCurrentStatus(buttonType);
    console.log("Button clicked:", buttonType);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current !== event.target
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-center align-bottom text-sm font-medium text-gray-500 dark:text-gray-400">
      <button
        ref={buttonRef}
        className="bg-blue-600 text-white rounded-full px-1 py-1 w-36 justify-center align-bottom flex"
        onClick={toggleDropdown}
      >
        {currentStatus}
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-60 absolute top-8 right-0 bg-white border border-gray-200 rounded-lg p-2 justify-center"
        >
          <button
            className="icon-button"
            onClick={() => handleButtonClick('Czytane')}
          >
            <img src={going} className="w-8 h-8 mx-2" alt="Going" />
          </button>
          <button
            className="icon-button"
            onClick={() => handleButtonClick('Przeczytane')}
          >
            <img src={check} className="w-8 h-8 mx-2" alt="Check" />
          </button>
          <button
            className="icon-button"
            onClick={() => handleButtonClick('Planowane')}
          >
            <img src={blank} className="w-8 h-8 mx-2" alt="Blank" />
          </button>
          <button
            className="icon-button"
            onClick={() => handleButtonClick('Porzucone')}
          >
            <img src={close} className="w-8 h-8 mx-2" alt="Close" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusManagerComponent;
