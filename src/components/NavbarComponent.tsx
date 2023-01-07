import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../../public/icon.png'

export function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="md">
        <Container>
            <Navbar.Brand href="/">
              <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Biblioteczka</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/ksiazki">Książki</Nav.Link>
                <Nav.Link href="/autorzy">Autorzy</Nav.Link>
                <Nav.Link href="/gatunki">Gatunki</Nav.Link>
                <Nav.Link href="/lokalizacje">Lokalizacje</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}