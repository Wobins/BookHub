import React from 'react';
import { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Container, Button, Row, Col, Form, Card, ButtonToolbar } from 'react-bootstrap';
import { getLoans } from '../../api/loans';

const Prets = () => {
  const [laonsData, setLoans] = useState([]);
  const [user, setUser] = useState({
    email: '', 
    email_verified: '', 
    name: '', 
    sub: ''
  });

  useEffect(() => {
    const getUser = async () => {
      let connectedUser = await fetchUserAttributes();
      setUser(connectedUser);
    }

    getUser()
  }, [])

  useEffect(() => {
    document.title = "BookHub - Prets";
    
    const getAllLoans = async () => {
      const loansFromAPI = await fetchLoans();
      setLoans(loansFromAPI);
    }
  
    getAllLoans();
  }, []);

  // Fetch all books
  const fetchLoans = async () => {
    const res = await getLoans();
    const data = res.data.body;
    console.log(data);
    return data;
  }

  return (
    <Container>
      <Row>
        <Col lg={{span: 8, offset: 2}} md={{span: 6, offset:3}} className='mb-4'>
          <Form inline="true">
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
          {
            laonsData.filter(el => el.owner_email === user.email).map((loan, index) => (
              <Card className='mb-3' key={index}>
                <Card.Body>
                  <Row>
                    <Col lg={{span: 4}} md={{span: 6}}>
                        <div>image</div>
                    </Col>
                    <Col lg={{span: 8}}>
                        <Card.Title>{}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Auteur(s): {}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">ISBN: {}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Prete à: {loan.borrower_email}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Date de retour: {loan.returned_at}</Card.Subtitle>
                        <Card.Text>
                        Statut: {}
                        </Card.Text>
                        <ButtonToolbar className="justify-content-end">
                          <Button variant="success">Recuperer</Button>
                        </ButtonToolbar>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>             
            ))
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Prets;