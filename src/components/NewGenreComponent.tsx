import { FormEvent, useRef, useState } from "react";
import { Offcanvas, Stack, Form, Button } from "react-bootstrap";
import { useControlsContext } from "../contexts/ControlsContext";
import { useStorageContext } from "../contexts/StorageContext";
import { Genre } from "../App";
import { v4 as uuidV4 } from "uuid";

type newAuthorProps = {
    isOpen: boolean
}

export function NewGenreComponent({isOpen}:newAuthorProps) {

    const { closeGenreCreator, setMessages } = useControlsContext()
    const { genres, setGenres } = useStorageContext()

    const genreRef = useRef<HTMLInputElement>(null)


    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        // dodajemy nowy gatunek      
        let idx = uuidV4()
        setGenres([...genres, {id: idx, name: genreRef.current!.value}])

        setMessages([`Gatunek został dodany do bazy.`])

        closeGenreCreator()
    }


    return (
        <Offcanvas show={isOpen} onHide={closeGenreCreator} placement="end">
            <Offcanvas.Header closeButton><h3>Dodaj Gatunek</h3></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookAuthors">
                        <Form.Label>Gatunek</Form.Label>
                        <Form.Control name="genre" ref={genreRef} required/>
                        </Form.Group>
                        <Button variant='success' type="submit">Zapisz</Button>
                    </Form>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
