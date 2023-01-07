import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useStorageContext } from '../contexts/StorageContext'


function Home() {

  const { books, authors, genres, locations } = useStorageContext()
  const { setBooks, setAuthors, setGenres, setLocations } = useStorageContext()

  return (
    <>
    <h1>Home</h1>
    <Row>
        <Col>
            <h4>Opcje developerskie</h4>
        </Col>
    </Row>
    <Row>
        <Col>
            <h5 className='text-center'>Zrzut do konsoli</h5>
        </Col>
    </Row>
    
    <Row>
        <Col className="d-flex justify-content-center mb-4">
            <Button className="me-4" variant="warning" onClick={() => {console.log(books)}}>Zrzut books</Button>
            <Button className="me-4" variant="warning" onClick={() => {console.log(authors)}}>Zrzut authors</Button>
            <Button className="me-4" variant="warning" onClick={() => {console.log(genres)}}>Zrzut genres</Button>
            <Button variant="warning" onClick={() => {console.log(locations)}}>Zrzut locations</Button>

        </Col>
    </Row>
    <Row>
        <Col className='text-center'>
            <h5>Czyszczenie (UWAGA! bez potwierdzania)</h5>
        </Col>
    </Row>
    <Row>
        <Col className="d-flex justify-content-center">
            <Button className="me-4" variant="danger" onClick={() => {setBooks([])}}>Usuń books</Button>
            <Button className="me-4" variant="danger" onClick={() => {setAuthors([])}}>Usuń authors</Button>
            <Button className="me-4" variant="danger" onClick={() => {setGenres([])}}>Usuń genres</Button>
            <Button variant="danger" onClick={() => {setLocations([])}}>Usuń locations</Button>
        </Col>
    </Row>
    </>
  )
}

export default Home