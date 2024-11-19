import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { 
  Container, 
  Row, 
  Accordion,
  Col,
  Button,
  ButtonToolbar,
  Modal
} from 'react-bootstrap';
import BookSummary from '../../components/BookSummary';
import AddBookForm from '../../components/AddBookForm';
import { getBooks } from '../../api/book';
import { getLoans } from '../../api/loans';

const Accueil = () => {
  const [booksData, setBooks] = useState([]);
  const [loansData, setLoans] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: '', 
    email_verified: '', 
    name: '', 
    sub: ''
  });
  
  // Manage open/close state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch all books
  const fetchBooks = async () => {
    const res = await getBooks();
    const data = res.data.body;
    return data;
  }
  
  // Fetch all loans
  const fetchLoans = async () => {
    const res = await getLoans();
    const data = res.data.body;
    return data;
  }
  
  useEffect(() => {
    document.title = "BookHub - Accueil";   
    
    const getUser = async () => {
      let connectedUser = await fetchUserAttributes();
      setUser(connectedUser);
    }
    
    getUser();
    
  }, [])
  
  useEffect(() => {
    const getAllBooks = async () => {
      const booksFromAPI = await fetchBooks();
      const booksFilter = booksFromAPI.filter(el => el.owner_email === user.email)
      setBooks(booksFilter);
    }
    
    const getAllLoans = async () => {
      const loansFromAPI = await fetchLoans();
      const loansFilter = loansFromAPI.filter(el => el.owner_email === user.email);
      const borrowingsFilter = loansFromAPI.filter(el => el.borrower_email === user.email);
      setLoans(loansFilter);
      setBorrowings(borrowingsFilter);
    }
    
    getAllBooks();
    getAllLoans();
  }, [user])

  return (
    <Container>
      <div className='text-center mb-3 bg-light p-2'>
        <h1 className='h1'>Bienvenue, {user.name}</h1>
      </div>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0" className=''>
              <Accordion.Header>Livres</Accordion.Header>
                {
                  booksData.slice(0, 3).map((book, index) => <BookSummary key={index} book={book} />)
                }            
              <Accordion.Body>
                <ButtonToolbar className="justify-content-between">
                  <Button variant="primary" onClick={handleShow}>
                    <span><i className="bi bi-plus-circle"></i></span> Ajouter un livre
                  </Button>
                  <Button variant="link" href="books">Voir plus</Button>
                </ButtonToolbar>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0" className=''>
              <Accordion.Header>Prets</Accordion.Header>
              {
                loansData.slice(0, 3).map((loan, index) => (     
                  booksData.filter(el => el.id === loan.book_id).map((book, index) => (
                    <Accordion.Body key={index}>
                      <h5>{book.title}</h5>
                      <p>Auteurs(s): {book.author}</p>
                      <p>Email du bénéficiaire: {loan.borrower_email}</p>
                      <hr/>
                    </Accordion.Body>
                  ))
                ))
              }
              <Accordion.Body>
                <ButtonToolbar className="justify-content-end">
                  <Button variant="link" href="loans">Voir plus</Button>
                </ButtonToolbar>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0" className=''>
              <Accordion.Header>Emprunts</Accordion.Header>
              {
                borrowings.slice(0, 3).map((loan, index) => (     
                  booksData.filter(el => el.id === loan.book_id).map((book, index) => (
                    <Accordion.Body key={index}>
                      <h5>{book.title}</h5>
                      <p>Auteurs(s): {book.author}</p>
                      <p>Email du donateur: {loan.owner_email}</p>
                      <hr/>
                    </Accordion.Body>
                  ))
                ))
              }
              <Accordion.Body>
                <ButtonToolbar className="justify-content-end">
                  <Button variant="link" href="borrowings">Voir plus</Button>
                </ButtonToolbar>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
        



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulaire d'ajout de livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBookForm userEmail={user.email} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Accueil;
