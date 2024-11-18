import React from 'react';
import { Accordion } from 'react-bootstrap';

const BookSummary = ({ book }) => {
  return (
    <>
      <Accordion.Body>
        <h5>{book.title}</h5>
        <p>Auteur(s): {book.author}</p>
        <hr/>
      </Accordion.Body>
    </>
  );
}

export default BookSummary;