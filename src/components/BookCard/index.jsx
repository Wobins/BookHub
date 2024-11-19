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
import { postLoan } from '../../api/loans';
import { updateLoan } from '../../api/loans';
import bookCover from '../../assets/book-cover.png';

const BookCard = ({ book, showOptions, user }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        borrower_email: "",
        returned_date: ""
    });
  
    // Manage open/close state of the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // handle change of the form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // handle Loan
    const handleLoan = () => {
        handleShow();
        
    }

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const loan = {
                owner_email: user.email,
                book_id: book.id,
                borrower_email: formData.borrower_email,
                returned_date: formData.returned_date,
                status: "Not returned"
            }
    
            const res = await postLoan(loan);
            if (res.status === 200) {
                setFormData({
                    borrower_email: "",
                    returned_date: ""
                });
                handleClose()
            } else {
                console.log("Error creating loan");
                console.log(res);
            }

        } catch(e) {
            console.log(e);
        }
    };

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Row>
                    <Col lg={{span: 4}} md={{span: 6}}>
                        <img src={bookCover} alt="book cover" className='img-fluid' />
                    </Col>
                    <Col lg={{span: 8}}>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Auteur(s): {book.author}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">ISBN: {book.isbn}</Card.Subtitle>
                        {
                            !showOptions && (
                                <Card.Subtitle className="mb-2 text-muted">Propriétaire: {book.owner_email}</Card.Subtitle>
                            )
                        }
                        <Card.Text>
                            Statut: {book.status}
                        </Card.Text>
                        {
                            showOptions && (
                                <ButtonToolbar className="justify-content-between">
                                    <Button variant="info" onClick={handleLoan}>
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
                            name="borrower_email" 
                            onChange={handleChange}
                            type="email" 
                            placeholder="Entrer l'email du bénéficiaire" 
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Date de retour</Form.Label>
                            <Form.Control 
                                name="returned_date" 
                                onChange={handleChange}
                                type="date" 
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