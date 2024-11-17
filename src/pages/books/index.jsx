import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import BookCards from '../../components/BookCards';
import { getBooks } from '../../api/book';

const Bibliotheque = () => {
  const [booksData, setBooks] = useState([]);

  useEffect(() => {
    document.title = "BookHub - Livres";
    
    const getAllBooks = async () => {
      const booksFromAPI = await fetchBooks();
      setBooks(booksFromAPI);
    }
  
    getAllBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    const res = await getBooks();
    const data = res.data.body;
    console.log(typeof data);
    return data;
  }

  return (
    <Container>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}} className='mb-4'>
          <Form inline="true">
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Entrer le nom du livre, auteur, etc."
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Rechercher</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <BookCards books={booksData} />
        </Col>
      </Row>
    </Container>
  );
}

export default Bibliotheque;