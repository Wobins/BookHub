import React from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import BookCard from '../../components/BookCard';

const Bibliotheque = () => {
  return (
    <Container>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}} className='mb-4'>
          <Form inline>
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
          <BookCard />
          <BookCard />
          <BookCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Bibliotheque;