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
import url from '../../utils/url';
// import { postBook } from '../../api/book';

const Accueil = () => {
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
