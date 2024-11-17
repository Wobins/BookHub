import React from 'react';
import { Col, Button, Row, Card, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

const BookCard = ({ book }) => {
  return (
    <Card className='mb-3'>
        <Card.Body>
            <Row>
            <Col lg={{span: 4}} md={{span: 6}}>
                <div>image</div>
            </Col>
            <Col lg={{span: 8}}>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Auteur(s): {book.author}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">ISBN: {book.isbn}</Card.Subtitle>
                <Card.Text>
                Statut: {book.status}
                </Card.Text>
                <ButtonToolbar className="justify-content-between">
                    <div>
                        <Button variant="link">Link</Button>
                        <Button variant="info">Preter</Button>
                    </div>
                    <Button variant="danger">Supprimer</Button>
                </ButtonToolbar>
            </Col>
            </Row>
        </Card.Body>
    </Card>
  );
}

export default BookCard;