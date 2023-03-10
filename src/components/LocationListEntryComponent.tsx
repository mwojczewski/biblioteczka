import { useState } from "react"
import { Modal, Button, ButtonGroup } from "react-bootstrap"
import { Location } from "../App"
import { useControlsContext } from "../contexts/ControlsContext"
import { useStorageContext } from "../contexts/StorageContext"

export default function LocationListEntryComponent(location:Location) {

    const { locations, setLocations, books } = useStorageContext()
    const { openEditorPane, setMessages, setEditorTargetID} = useControlsContext()

    const [ modalState, setModalState ] = useState<boolean>()

    const openModal = () => setModalState(true)
    const closeModal = () => setModalState(false)

    const translateLocation = (id: string): string => {
        let location = locations.find(location => location.id === id)
        return typeof(location) !== "undefined" ? location.name : "brak danych"
    }

    const countBooks = (id: string): number => {
        return books.filter(book => book.locationID === id).length
    }

    const getLocationIndex = (id: string): number=> {
        return locations.findIndex(l => l.id === id)
    }

    const deleteLocation = ():void => {
        setMessages([`Lokacja "${location.name}" została usunięta z biblioteki.`])
        setLocations(locations.filter(b => b.id !== location.id))
        setModalState(false)
    }

    return (
    <tr>
        <td>{getLocationIndex(location.id) + 1}</td>
        <td style={{width: "60%"}}>{translateLocation(location.id)}</td>
        <td>{countBooks(location.id)}</td>
        <td>
            <Modal show={modalState} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Kasowanie Lokalizacji</Modal.Title>
                </Modal.Header>
                <Modal.Body>Czy jesteś pewien, że chcesz usunąć "{location.name}" z biblioteczki?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={deleteLocation}>
                         Usuń
                    </Button>
                    <Button variant="outline-primary" onClick={closeModal}>
                        Anuluj
                    </Button>
                 </Modal.Footer>
             </Modal>
            <ButtonGroup className="d-flex justify-content-center ms-4 me-4">
                <Button variant="outline-primary" size="sm" onClick={() => {setEditorTargetID(location.id); openEditorPane()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={openModal} disabled={countBooks(location.id) > 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-x" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                </svg>
                </Button>
            </ButtonGroup>
        </td>
    </tr>
    )
}