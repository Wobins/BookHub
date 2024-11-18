import React from 'react';
import { useState } from 'react';
import { 
    Col, 
    Button, 
    Row, 
    Card, 
    ButtonToolbar, 
    Form, 
    Modal 
} from 'react-bootstrap';

const BookCard = ({ book, showOptions }) => {
    const [show, setShow] = useState(false);
  
    // Manage open/close state of the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Submit the form
    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
                        {
                            showOptions && (
                                <ButtonToolbar className="justify-content-between">
                                    <Button variant="info" onClick={e => setShow(true)}>
                                        Preter
                                    </Button>
                                    <Button variant="danger">Supprimer</Button>
                                </ButtonToolbar>
                            )
                        }
                    </Col>
                </Row>
            </Card.Body>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Formulaire d'ajout de livre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Email du bénéficiaire</Form.Label>
                        <Form.Control 
                            name="title" 
                            // onChange={e => handleChange(e)}
                            // value={bookData.title} 
                            type="text" 
                            placeholder="Entrer l'email du bénéficiaire" 
                        />
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
        </Card>
    );
}

export default BookCard;