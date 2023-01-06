import React from 'react'
import { Row, Alert, Button, Table } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import AuthorListEntryComponent from '../components/AuthorListEntryComponent';
import { useControlsContext } from '../contexts/ControlsContext';
import { useStorageContext } from '../contexts/StorageContext';
import { v4 as uuidV4 } from 'uuid';
import { NewAuthorComponent } from '../components/NewAuthorComponent';

function Author() {
    const { openAuthorCreator, authorCreator } = useControlsContext()
    const { authors } = useStorageContext()

    const { messages, setMessages } = useControlsContext();

  return (
    <>
        <Row>
            <Col>
                <h1>Katalog autorów</h1>
            </Col>
        </Row>
        {
            messages.map(message => (
                <Alert variant="success" onClick={() => { setMessages(messages.filter(msg => msg !== message))}} dismissible>{message}</Alert>
            ))
        }
        <Row>
            <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={openAuthorCreator}>Dodaj nowego autora</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table className='mt-5' bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Autor</th>
                        <th>Ilość pozycji w bazie</th>
                        <th>Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    authors.length == 0 ?
                        (<tr><td colSpan={3} className="text-center fw-bold">W tej chwili lista jest pusta.</td></tr>)
                    :
                        authors.map(author => (<AuthorListEntryComponent key={uuidV4()} {...author} />))
                    }
                </tbody>
            </Table>
            </Col>
        </Row>
        <NewAuthorComponent isOpen={authorCreator} />
    </>
  )
}

export default Author