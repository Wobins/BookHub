import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Container, Button, Row, Col, Form, Card, ButtonToolbar } from 'react-bootstrap';
import { getLoans } from '../../api/loans';
import { getBooks } from '../../api/book';
import bookCover from '../../assets/book-cover.png';

const Borrowings = () => {
  const [loansData, setLoans] = useState([]);
  const [booksData, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({
    email: '', 
    email_verified: '', 
    name: '', 
    sub: ''
  });

  const today1 = new Date();
  // today.setHours(0, 0, 0, 0);
  const today = today1.toISOString().split('T')[0]

  // Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // Fetch all books
  const fetchBooks = async () => {
    const res = await getBooks();
    const data = res.data.body;
    return data;
  }

  // Fetch all books
  const fetchLoans = async () => {
    const res = await getLoans();
    const data = res.data.body;
    console.log(data);
    return data;
  }

  useEffect(() => {
    document.title = "BookHub - Prets";

    const getUser = async () => {
      let connectedUser = await fetchUserAttributes();
      setUser(connectedUser);
    }

    getUser()
  }, [])

  useEffect(() => {
    const getAllBooks = async () => {
      const booksFromAPI = await fetchBooks();
      setBooks(booksFromAPI);
    }

    const getAllLoans = async () => {
      const loansFromAPI = await fetchLoans();
      const loansFilter = loansFromAPI.filter(el => el.borrower_email === user.email);
      setLoans(loansFilter);
    }
    
    getAllBooks();
    getAllLoans();
  }, [user, search]);

  useEffect(() => {
    const getSearch = async () => {
      const booksFromAPI = await fetchBooks();
      const loansFromAPI = await fetchLoans();

      const booksFilter = booksFromAPI.filter(el => el.owner_email === user.email);
      const loansFilter = loansFromAPI.filter(el => el.owner_email === user.email);

      const booksSearch = booksFilter.filter(el => el.title.toLowerCase().includes(search.toLowerCase()) || el.author.toLowerCase().includes(search.toLowerCase()) || el.isbn.toLowerCase().includes(search.toLowerCase()));
      // const loansSearch = loansFilter.filter(el => el.borrower_email.toLowerCase().includes(search.toLowerCase()));

      setBooks(booksSearch);
      // setLoans(loansSearch);
    }

    getSearch();
  }, [search])

  return (
    <Container>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}} className='mb-4'>
          <Form inline="true">
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  name='search'
                  placeholder="Entrer le nom du livre, auteur, etc."
                  className=" mr-sm-2"
                  onChange={handleSearch}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          {
            loansData.map((loan, index) => (     
              booksData.filter(el => el.id === loan.book_id).map((book, index) => (
                <Card className={`mb-3 ${loan.returned_at < today ? 'border border-4 border-success' : 'border border-4 border-danger'}`} key={index}>
                  <Card.Body>
                    <Row>
                      <Col lg={{span: 4}} md={{span: 6}}>
                        <img src={bookCover} alt="book cover" className='img-fluid' />
                      </Col>
                      <Col lg={{span: 8}}>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Auteur(s): {book.author}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          ISBN: {book.isbn}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Propriétaire: {loan.borrower_email}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Date de retour: {loan.returned_at}
                        </Card.Subtitle>   
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>             
              ))
            ))
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Borrowings;