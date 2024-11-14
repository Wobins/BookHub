import React from 'react';
import { Container, 
         Row, 
         Accordion,
         Col,
         Button,
         ButtonToolbar
        //  Divider 
} from 'react-bootstrap';
import BookSummary from '../../components/BookSummary';

const Accueil = () => {
  return (
    <Container>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}}>
          <Accordion defaultActiveKey="0" className='mb-3'>
            <Accordion.Item eventKey="0" className=''>
              <Accordion.Header>Livres</Accordion.Header>
              <BookSummary />              
              <Accordion.Body>
                <ButtonToolbar className="justify-content-between">
                  <Button variant="primary">
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
        
    </Container>
  );
}

export default Accueil;
