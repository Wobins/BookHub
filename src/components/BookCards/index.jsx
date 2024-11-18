import React from 'react';
import BookCard from '../BookCard';

const BookCards = ({ books, showOptions }) => {
  return (
    <>
        {
          books.map((book, index) => (
            <BookCard key={index} book={book} showOptions={showOptions} />
          ))
        }
    </>
  )
}

export default BookCards