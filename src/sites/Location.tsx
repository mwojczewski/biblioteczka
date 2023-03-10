import React from 'react'
import { Row, Col, Alert, Button, Table } from 'react-bootstrap';
import { useControlsContext } from '../contexts/ControlsContext';
import { useStorageContext } from '../contexts/StorageContext';
import { v4 as uuidV4 } from 'uuid';
import LocationListEntryComponent from '../components/LocationListEntryComponent';
import { NewLocationComponent } from '../components/NewLocationComponent';
import { EditLocationComponent } from '../components/EditLocationComponent';

export default function Location() {
    const { openCreatorPane, creatorPane, editorPane } = useControlsContext()
    const { locations } = useStorageContext()

    const { messages, setMessages } = useControlsContext()

  return (
    <>
        <Row>
            <Col>
                <h1>Katalog lokalizacji</h1>
            </Col>
        </Row>
        {
            messages.map(message => (
                <Alert variant="success" key={uuidV4()} onClick={() => { setMessages(messages.filter(msg => msg !== message))}} dismissible>{message}</Alert>
            ))
        }
        <Row>
            <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={openCreatorPane}>Dodaj nową lokalizację</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table className='mt-5' bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Lokalizacja</th>
                        <th>Ilość pozycji w bibliotece</th>
                        <th>Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    locations.length == 0 ?
                        (<tr><td colSpan={3} key={uuidV4()} className="text-center fw-bold">W tej chwili lista jest pusta.</td></tr>)
                    :
                        locations.map(location => (<LocationListEntryComponent key={uuidV4()} {...location} />))
                    }
                </tbody>
            </Table>
            </Col>
        </Row>
        <NewLocationComponent isOpen={creatorPane} />    
        <EditLocationComponent isOpen={editorPane} />    
        </>
  )
}