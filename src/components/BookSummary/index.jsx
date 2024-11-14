import React from 'react';
import { Accordion } from 'react-bootstrap';

const BookSummary = () => {
  return (
    <>
        <Accordion.Body>
            <h5>Titre</h5>
            <p>Auteur</p>
            <hr/>
        </Accordion.Body>
    </>
  );
}

export default BookSummary;