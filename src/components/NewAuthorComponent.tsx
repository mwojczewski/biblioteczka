import { FormEvent, useRef, useState } from "react";
import { Offcanvas, Stack, Form, Button } from "react-bootstrap";
import { useControlsContext } from "../contexts/ControlsContext";
import { useStorageContext } from "../contexts/StorageContext";
import CreatibleReactSelect from 'react-select/creatable'
import { Author } from "../App";
import { v4 as uuidV4 } from "uuid";

type newAuthorProps = {
    isOpen: boolean
}

export function NewAuthorComponent({isOpen}:newAuthorProps) {

    const { closeCreatorPane, setMessages } = useControlsContext()
    const { authors, setAuthors } = useStorageContext()

    const authorRef = useRef<HTMLInputElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        // dodajemy nowych autorów
        let idx = uuidV4()
        setAuthors([...authors, {id: idx, name: authorRef.current!.value}])

        setMessages([`Autor został dodany do bazy.`])

        closeCreatorPane()
    }


    return (
        <Offcanvas show={isOpen} onHide={closeCreatorPane} placement="end">
            <Offcanvas.Header closeButton><h3>Dodaj Autora</h3></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookAuthors">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control name="genre" ref={authorRef} required/>
                        </Form.Group>
                        <Button variant='success' type="submit">Zapisz</Button>
                    </Form>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
