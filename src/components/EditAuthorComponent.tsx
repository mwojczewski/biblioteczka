import { FormEvent, useEffect, useRef, useState } from "react";
import { Offcanvas, Stack, Form, Button } from "react-bootstrap";
import { useControlsContext } from "../contexts/ControlsContext";
import { useStorageContext } from "../contexts/StorageContext";

type editAuthorsProps = {
    isOpen: boolean
}

export function EditAuthorComponent({isOpen}:editAuthorsProps) {

    const { closeEditorPane, setMessages, editorTargetID } = useControlsContext()
    const { authors, setAuthors } = useStorageContext()
    const [ editedAuthor, setEditedAuthor ] = useState()

    useEffect(() => {
      setEditedAuthor(authors.find(author => author.id === editorTargetID))
    }, [editorTargetID])
    

    const authorRef = useRef<HTMLInputElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        // edytujemy nazwę autora
        setAuthors(authors.map(aut => {
            if (aut.id === editorTargetID)
                return {...aut, name: authorRef.current!.value}
            else {
                return aut
            }
        }))

        setMessages([`Autor został zmieniony w bazie.`])

        closeEditorPane()
    }


    return (
        <Offcanvas show={isOpen} onHide={closeEditorPane} placement="end">
            <Offcanvas.Header closeButton><h3>Edytuj Autora</h3></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookAuthors">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control name="genre" ref={authorRef} defaultValue={editedAuthor?.name} required/>
                        </Form.Group>
                        <Button variant='success' type="submit">Zapisz</Button>
                    </Form>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
