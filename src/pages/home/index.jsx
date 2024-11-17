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
Modal,
Form
} from 'react-bootstrap';
import BookSummary from '../../components/BookSummary';
// import { postBook } from '../../api/book';

const Accueil = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    email: '', 
    email_verified: '', 
    name: '', 
    sub: ''
  });
  const [bookData, setBookData] = useState({
    title: "", 
    author: "", 
    isbn: "", 
    owner_email: user.email
  });

  // Manage open/close state of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(bookData)
      // const res = await postBook(bookData);
      // const { data } = res;
      // console.log(data);
      setShow(false);
      setBookData({
        title: "", 
        author: "", 
        isbn: "", 
        owner_email: ""
      })
      console.log('Formulaire envoyé');
    } catch (error) {
        console.error('Error adding book:', error);
    }
  }

  // Handle change of inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
    console.log(bookData)
  }

  useEffect(() => {
    const getUser = async () => {
      let connectedUser = await fetchUserAttributes();
      setUser(connectedUser);
    }

    getUser()
  }, [])

  return (
    <Container>
      <div className='text-center mb-3 bg-light p-2'>
        <h1>Bienvenue, {user.name}</h1>
      </div>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0" className=''>
              <Accordion.Header>Livres</Accordion.Header>
              <BookSummary />              
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
              <Accordion.Body>
                <h5>Titre</h5>
                <p>Auteur</p>
                <p>destinataire</p>
                <hr/>
              </Accordion.Body>
              <Accordion.Body>
                <ButtonToolbar className="justify-content-end">
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
              <Accordion.Header>Emprunts</Accordion.Header>
              <Accordion.Body>
                <h5>Titre</h5>
                <p>Auteur</p>
                <p>source</p>
                <hr/>
              </Accordion.Body>
              <Accordion.Body>
                <ButtonToolbar className="justify-content-end">
                  <Button variant="link" href="books">Voir plus</Button>
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
              <Form.Control type="file" />
            </Form.Group>
            <Button variant="success" type="submit">
              Soumettre
            </Button>
          </Form>
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
