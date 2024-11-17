import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import url from '../../utils/url';

const AddBookForm = ({ userEmail }) => {    
  const [bookData, setBookData] = useState({
    title: "", 
    author: "", 
    isbn: "", 
    status: "disponible", 
    image_base64: "",
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
        image_base64: bookData.image_base64
      };
  
      // Call your API endpoint that triggers the Lambda
      const response = await fetch(`${url}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookPayload)
      });
  
      const data = await response.json();
      
      if (response.ok) {
        // setShow(false);
        setBookData({
          title: "", 
          author: "", 
          isbn: "", 
          status: "disponible", 
          owner_email: userEmail,
          image_base64: ""
        });
        // Add success message or refresh book list
        console.log(data);
      } else {
        throw new Error(data.message || 'Error adding book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  
  // Handle change of inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    console.log(e)
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
        <Form.Group controlId="imageFile" className="mb-3">
        <Form.Label>Image de la page de couverture</Form.Label>
            <Form.Control
                type="file" 
                name='image'
                accept="image/*"
                onChange={handleChange}
            />
        </Form.Group>
        <Button variant="success" type="submit">
            Soumettre
        </Button>
    </Form>
  );
}

export default AddBookForm;