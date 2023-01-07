import React from 'react'
import { Row, Col, Alert, Button, Table } from 'react-bootstrap';
import { useControlsContext } from '../contexts/ControlsContext';
import { useStorageContext } from '../contexts/StorageContext';
import { v4 as uuidV4 } from 'uuid';
import GenreListEntryComponent from '../components/GenreListEntryComponent';
import { NewGenreComponent } from '../components/NewGenreComponent';
import { EditGenreComponent } from '../components/EditGenreComponent';

function Genre() {
    const { openCreatorPane, creatorPane, editorPane } = useControlsContext()
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
                <Alert variant="success" key={uuidV4()} onClick={() => { setMessages(messages.filter(msg => msg !== message))}} dismissible>{message}</Alert>
            ))
        }
        <Row>
            <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={openCreatorPane}>Dodaj nowy gatunek</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table className='mt-5' bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{width: "60%"}}>Gatunek</th>
                        <th>Ilość pozycji w bibliotece</th>
                        <th>Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    genres.length == 0 ?
                        (<tr><td key={uuidV4()} colSpan={3} className="text-center fw-bold">W tej chwili lista jest pusta.</td></tr>)
                    :
                        genres.map(genre => (<GenreListEntryComponent key={uuidV4()} {...genre} />))
                    }
                </tbody>
            </Table>
            </Col>
        </Row>
        <NewGenreComponent isOpen={creatorPane} />
        <EditGenreComponent isOpen={editorPane} />
    </>
  )
}


export default Genre