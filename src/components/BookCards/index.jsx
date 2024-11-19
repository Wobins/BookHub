import React from 'react';
import BookCard from '../BookCard';

const BookCards = ({ books, showOptions, user }) => {
  return (
    <>
        {
          books.map((book, index) => (
            <BookCard key={index} book={book} showOptions={showOptions} user={user} />
          ))
        }
    </>
  )
}

export default BookCards