import { useState } from "react";
import { ButtonGroup, Button, Modal } from "react-bootstrap";
import { Author } from "../App";
import { useControlsContext } from "../contexts/ControlsContext";
import { useStorageContext } from "../contexts/StorageContext";

export default function AuthorListEntryComponent(author:Author) {

    const {authors, setAuthors, books} = useStorageContext()
    const {setMessages} = useControlsContext()

    const [ modalState, setModalState ] = useState<boolean>()

    const openModal = () => setModalState(true)
    const closeModal = () => setModalState(false)

    const translateAuthor = (id: string): string => {
        let author = authors.find(author => author.id === id)
        return typeof(author) !== "undefined" ? author.name : "brak danych"
    }

    const countBooks = (id: string): number => {
        return books.filter(book => book.authorIDs.includes(id)).length
    }

    const getAuthorIndex = (id: string): number=> {
        return authors.findIndex(a => a.id === id)
    }

    const deleteAuthor = ():void => {
        setMessages([`Autor "${author.name}" został usunięty z biblioteki.`])
        setAuthors(authors.filter(b => b.id !== author.id))
        setModalState(false)
    }

    return (
    <tr>
        <td>{getAuthorIndex(author.id) + 1}</td>
        <td style={{width: "60%"}}>{translateAuthor(author.id)}</td>
        <td>{countBooks(author.id)}</td>
        <td>
            <Modal show={modalState} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Kasowanie autora</Modal.Title>
                </Modal.Header>
                <Modal.Body>Czy jesteś pewien, że chcesz usunąć "{author.name}" z biblioteczki?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteAuthor}>
                         Usuń
                    </Button>
                    <Button variant="primary" onClick={closeModal}>
                        Anuluj
                    </Button>
                 </Modal.Footer>
             </Modal>
            <ButtonGroup className="d-flex justify-content-center ms-4 me-4">
                <Button variant="outline-primary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={openModal} disabled={countBooks(author.id) > 0}>
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