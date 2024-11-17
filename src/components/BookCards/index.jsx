import React from 'react';
import BookCard from '../BookCard';

const BookCards = ({books}) => {
  return (
    <>
        {books.map((book, index) => (
            <BookCard key={index} book={book} />
        ))}
    </>
  )
}

export default BookCards