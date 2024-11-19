import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Container, Button, Row, Col, Form, Tab, Tabs } from 'react-bootstrap';
import BookCards from '../../components/BookCards';
import { getBooks } from '../../api/book';

const Bibliotheque = () => {
  const [booksData, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({
    email: '', 
    email_verified: '', 
    name: '', 
    sub: ''
  });

  // handle search function
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // Fetch all books
  const fetchBooks = async () => {
    const res = await getBooks();
    const data = res.data.body;
    return data;
  }

  // Get User
  useEffect(() => {
    document.title = "BookHub - Livres";

    const getUser = async () => {
      let connectedUser = await fetchUserAttributes();
      setUser(connectedUser);
    }

    getUser()
  }, [])

  // Get books
  useEffect(() => {    
    const getAllBooks = async () => {
      const booksFromAPI = await fetchBooks();
      setBooks(booksFromAPI);
    }
  
    getAllBooks();
  }, []);

  // Filter by search
  useEffect(() => {
    const getSearch = async () => {
      const booksFromAPI = await fetchBooks();

      const booksFilter = booksFromAPI.filter(el => el.owner_email === user.email);

      const booksSearch = booksFilter.filter(el => el.title.toLowerCase().includes(search.toLowerCase()) || el.author.toLowerCase().includes(search.toLowerCase()) || el.isbn.toLowerCase().includes(search.toLowerCase()));

      setBooks(booksSearch);
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
                  placeholder="Entrer le nom du livre, auteur, etc."
                  className=" mr-sm-2"
                  name='search'
                  onChange={handleSearch}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <Tabs
            defaultActiveKey="myBooks"
            id="uncontrolled-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="myBooks" title="Mes livres">
              <BookCards 
                showOptions={true}
                books={booksData.filter(el => el.owner_email === user.email)} 
                user={user}
              />
            </Tab>
            <Tab eventKey="allBooks" title="Autres livres">
              <BookCards 
                showOptions={false}
                books={booksData.filter(el => el.owner_email !== user.email)} 
                user={user}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Bibliotheque;