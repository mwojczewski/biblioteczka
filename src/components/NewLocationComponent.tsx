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

export function NewLocationComponent({isOpen}:newAuthorProps) {

    const { closeCreatorPane, setMessages } = useControlsContext()
    const { locations, setLocations } = useStorageContext()

    const locationRef = useRef<HTMLInputElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        // dodajemy nowych autorów
        let idx = uuidV4()
        setLocations([...locations, {id: idx, name: locationRef.current!.value}])

        setMessages([`Lokalizacja została dodana do bazy.`])

        closeCreatorPane()
    }


    return (
        <Offcanvas show={isOpen} onHide={closeCreatorPane} placement="end">
            <Offcanvas.Header closeButton><h3>Dodaj Lokalizację</h3></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookAuthors">
                        <Form.Label>Lokalizacja</Form.Label>
                        <Form.Control name="genre" ref={locationRef} required/>
                        </Form.Group>
                        <Button variant='success' type="submit">Zapisz</Button>
                    </Form>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
