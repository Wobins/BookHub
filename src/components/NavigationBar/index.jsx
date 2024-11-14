import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Form, Button } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5">
        <Container>
          <Navbar.Brand href="/home">BookHub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Accueil</Nav.Link>
              <Nav.Link href="/books">Livres</Nav.Link>
              <Nav.Link href="/loans">Prets</Nav.Link>
              <Nav.Link href="/borrowings">Emprunts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="success">Se connecter</Button>
        </Container>
    </Navbar>
  );
}

export default NavigationBar;