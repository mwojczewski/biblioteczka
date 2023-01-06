import React from 'react'
import { Row, Col, Alert, Button, Table } from 'react-bootstrap';
import { useControlsContext } from '../contexts/ControlsContext';
import { useStorageContext } from '../contexts/StorageContext';
import { v4 as uuidV4 } from 'uuid';
import GenreListEntryComponent from '../components/GenreListEntryComponent';
import { NewGenreComponent } from '../components/NewGenreComponent';

function Genre() {
  const { openGenreCreator, genreCreator } = useControlsContext()
    const { genres } = useStorageContext()

    const { messages, setMessages } = useControlsContext();
    

  return (
    <>
        <Row>
            <Col>
                <h1>Katalog gatunków</h1>
            </Col>
        </Row>
        {
            messages.map(message => (
                <Alert variant="success" onClick={() => { setMessages(messages.filter(msg => msg !== message))}} dismissible>{message}</Alert>
            ))
        }
        <Row>
            <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={openGenreCreator}>Dodaj nowy gatunek</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table className='mt-5' bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{width: "60%"}}>Gatunek</th>
                        <th>Ilość pozycji w bazie</th>
                        <th>Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    genres.length == 0 ?
                        (<tr><td colSpan={3} className="text-center fw-bold">W tej chwili lista jest pusta.</td></tr>)
                    :
                        genres.map(genre => (<GenreListEntryComponent key={uuidV4()} {...genre} />))
                    }
                </tbody>
            </Table>
            </Col>
        </Row>
        <NewGenreComponent isOpen={genreCreator} />
    </>
  )
}


export default Genre