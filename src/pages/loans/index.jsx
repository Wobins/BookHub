import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Container, Button, Row, Col, Form, Card, ButtonToolbar, Modal } from 'react-bootstrap';
import { getLoans, updateLoan } from '../../api/loans';
import { getBooks } from '../../api/book';
import bookCover from '../../assets/book-cover.png';

const Prets = () => {
  const [loansData, setLoans] = useState([]);
  const [booksData, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({
    email: '', 
    email_verified: '', 
    name: '', 
    sub: ''
  });
  const [show, setShow] = useState(false);
  const [loan, setLoan] = useState({
    id: "96cc000c-0b15-46e1-9b51-86d31c4be170",
    // book_id: 1,
    // borrower_email: "malcom@mail.com",
    // created_at: "2024-11-19T13:44:33.757396",
    // owner_email: "angleazaly@hotmail.com",
    // returned_at: "2024-09-23",
    // status: "en cours de pret",
    // updated_at: "2024-11-19T13:44:33.757414"
   });

  const today1 = new Date();
  const today = today1.toISOString().split('T')[0]
  
  const handleClose = () => {
    setShow(false);
    setLoan({
      id: ""
    });
  }
  const handleShow = () => setShow(true);

  const handleConfirm = async(loan) => {
    try{
      const res = await updateLoan(loan.id, loan);
      handleClose();
    } catch(e) {
      console.log(e);
    }
  }

  const handleClick = (loan) => {
    setLoan(loan);
    handleShow();
  }

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
      const booksFilter = booksFromAPI.filter(el => el.owner_email === user.email)
      setBooks(booksFilter);
    }

    const getAllLoans = async () => {
      const loansFromAPI = await fetchLoans();
      const loansFilter = loansFromAPI.filter(el => el.owner_email === user.email);
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
                <Card className={`mb-3 ${loan.returned_date > today ? 'border border-4 border-success' : 'border border-4 border-danger'}`} key={index}>
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
                          Bénéficiaire: {loan.borrower_email}
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                          Date de retour: {loan.returned_date}
                        </Card.Subtitle>                       
                        <ButtonToolbar className="justify-content-end">
                          <Button variant="success" onClick={loan =>  handleClick(loan)}>
                            Retourner
                          </Button>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>             
              ))
            ))
          }
        </Col>
      </Row>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          Confirmez-vous que ce livre a été retourné ? 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>Oui</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Prets;