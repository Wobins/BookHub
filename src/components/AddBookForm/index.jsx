import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import url from '../../utils/url';
import { postBook } from '../../api/book';

const AddBookForm = ({ userEmail }) => {    
  const [bookData, setBookData] = useState({
    title: "", 
    author: "", 
    isbn: "", 
    status: "Available", 
    image_url: "sample",
    owner_email: userEmail
  });

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookPayload = {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        status: bookData.status,
        owner_email: userEmail,
        image_url: bookData.image_url
      };
  
      console.log(bookPayload)
      const res = await postBook(bookPayload);
      console.log(res);

      setBookData({
        title: "", 
        author: "", 
        isbn: "", 
        status: "Available", 
        owner_email: userEmail,
        image_url: "aws.amazon.com"
      });

    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  
  // Handle change of inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    // console.log(e)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titre</Form.Label>
          <Form.Control 
            name="title" 
            onChange={e => handleChange(e)}
            value={bookData.title} 
            type="text" 
            placeholder="Entrer le titre du livre" 
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="author">
          <Form.Label>Auteur(s)</Form.Label>
          <Form.Control 
          name='author' 
          onChange={e => handleChange(e)}
          value={bookData.author} 
          type="text" 
          placeholder="Entrer le(s) nom(s) de l'(des) auteur(s)" 
          />
      </Form.Group>
      <Form.Group className="mb-3" controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control 
          name='isbn' 
          value={bookData.isbn} 
          onChange={e => handleChange(e)}
          type="text" 
          placeholder="Entrer l'ISBN du livre" 
          />
      </Form.Group>
      {/* <Form.Group controlId="imageFile" className="mb-3">
      <Form.Label>Image de la page de couverture</Form.Label>
          <Form.Control
              type="file" 
              name='image'
              accept="image/*"
              onChange={handleChange}
          />
      </Form.Group> */}
      <Button variant="success" type="submit">
          Soumettre
      </Button>
    </Form>
  );
}

export default AddBookForm;