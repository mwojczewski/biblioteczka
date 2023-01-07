import { Badge, Button, ButtonGroup, Form, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { RawBook } from "../App"
import { useStorageContext } from "../contexts/StorageContext"
import { v4 as uuidV4 } from "uuid";
import { useRef, useState } from "react";
import { useControlsContext } from "../contexts/ControlsContext";

export function BookListEntryComponent(book:RawBook)
{
    const {authors, genres, locations, books, setBooks} = useStorageContext()
    const {setMessages} = useControlsContext()

    const [ modalState, setModalState ] = useState<boolean>()

    const notesRef = useRef<HTMLTextAreaElement>(null)

    const openModal = () => setModalState(true)
    const closeModal = () => setModalState(false)

    const translateAuthor = (id: string): string => {
        let author = authors.find(author => author.id === id)
        return typeof(author) !== "undefined" ? author.name : "brak danych"
    }

    const translateGenre = (id: string) => {
        let genre = genres.find(genre => genre.id === id)
        return (<Badge bg="success" key={`badge${uuidV4}`}>{typeof(genre) !== "undefined" ? genre.name : "brak danych"}</Badge>)
    }

    const translateLocation = (id: string): string => {
        let location = locations.find(location => location!.id === id)
        return typeof(location) !== "undefined" ? location!.name : "brak danych"
    }

    const getBookIndex = (id: string): number=> {
        return books.findIndex(b => b.id === id)
    }

    const deleteBook = ():void => {
        setMessages([`Pozycja "${book.title}" została usunięta z biblioteki.`])
        setBooks(books.filter(b => b.id !== book.id))
        setModalState(false)
    }

    const updateNotes = ():void => {
        setBooks(books.map(b => {
            if (b.id == book.id)
            return {...b, notes: notesRef.current?.value + ""}
            else
            return {...b}
        }))
    }

    return (
        <>
            <Modal show={modalState} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Kasowanie pozycji</Modal.Title>
                </Modal.Header>
                <Modal.Body>Czy jesteś pewien, że chcesz usunąć "{book.title}" z biblioteczki?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={deleteBook}>
                         Usuń
                    </Button>
                    <Button variant="outline-primary" onClick={closeModal}>
                        Anuluj
                    </Button>
                 </Modal.Footer>
             </Modal>
                <tr key={book.id}>
                    <td>{getBookIndex(book.id) + 1}</td>
                    <td>
                        <OverlayTrigger
                            trigger="click"
                            key={`tooltop_${book.id}`}
                            placement="right"
                            overlay={
                                <Popover>
                                <Popover.Header as="h3">Notatka do pozycji</Popover.Header>
                                <Popover.Body>
                                <Form>
                                <Form.Control as="textarea" rows={5} type="text" ref={notesRef} name="notes" placeholder="dodaj notatki" defaultValue={book.notes}/>
                                <Button variant="outline-primary" onClick={updateNotes} type="button">Zapisz zmiany</Button>
                                </Form>
                                </Popover.Body>
                                </Popover>
                            }
                            >
                            <span className="ms-auto me-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal" viewBox="0 0 16 16">
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                </svg>
                            </span>
                        </OverlayTrigger>
                        {book.title}
                    </td>
                    <td key={`author${uuidV4()}`}>{book.authorIDs.map(author => {
                        return translateAuthor(author) + " "
                    })}</td>
                    <td>{book.genreIDs.map(genre => {
                        return translateGenre(genre)
                    })}</td>
                    <td>{translateLocation(book.locationID)}</td>
                    <td>
                        <ButtonGroup className="d-flex justify-content-center ms-4 me-4">
                            <Button variant="outline-primary" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={openModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-x" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
    </>
    )
}