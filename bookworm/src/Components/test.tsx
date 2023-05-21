import React, { useState } from 'react';

const MyComponent: React.FC = () => {
  const [booksContent, setBooksContent] = useState<string | null>(null);

  const showBooksContent = () => {
    const content = localStorage.getItem('books');
    setBooksContent(content);
  };

  return (
    <div>
      <div className="text-black">{booksContent}</div>
    </div>
  );
};

export default MyComponent;
