import React from 'react';
import { Col, Button, Row, Card, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

const BookCard = () => {
  return (
    <Card className='mb-3'>
        <Card.Body>
            <Row>
            <Col lg={{span: 4}} md={{span: 6}}>
                <div>image</div>
            </Col>
            <Col lg={{span: 8}}>
                <Card.Title>Titre: Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Autheurs: Card Subtitle</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Date de publication</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">maison edition</Card.Subtitle>
                <Card.Text>
                Description: Some quick example text to build on the card title and make up the
                bulk of the card's content.
                </Card.Text>
                <ButtonToolbar className="justify-content-between">
                    <ButtonGroup>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </ButtonGroup>
                    <Button variant="danger">Supprimer</Button>
                </ButtonToolbar>
            </Col>
            </Row>
        </Card.Body>
    </Card>
  );
}

export default BookCard;