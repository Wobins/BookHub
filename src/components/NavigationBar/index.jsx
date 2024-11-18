import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar, Button } from 'react-bootstrap';
import { signOut } from "aws-amplify/auth"

const NavigationBar = () => {
  async function handleSignOut() {
    await signOut()
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand href="/">BookHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/books">Livres</Nav.Link>
            <Nav.Link href="/loans">Prets</Nav.Link>
            <Nav.Link href="/borrowings">Emprunts</Nav.Link>
          </Nav>
          <Button variant="warning" onClick={handleSignOut}>
            Se deconnecter
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;