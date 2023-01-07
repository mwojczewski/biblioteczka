import { FormEvent, useEffect, useRef, useState } from "react";
import { Offcanvas, Stack, Form, Button } from "react-bootstrap";
import { useControlsContext } from "../contexts/ControlsContext";
import { useStorageContext } from "../contexts/StorageContext";

type editGenreProps = {
    isOpen: boolean
}

export function EditGenreComponent({isOpen}:editGenreProps) {

    const { closeEditorPane, setMessages, editorTargetID } = useControlsContext()
    const { genres, setGenres } = useStorageContext()
    const [ editedGenre, setEditedGenre ] = useState()

    useEffect(() => {
      setEditedGenre(genres.find(genre => genre.id === editorTargetID))
    }, [editorTargetID])
    

    const genreRef = useRef<HTMLInputElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        // edytujemy nazwę lokalizacji
        setGenres(genres.map(gen => {
            if (gen.id === editorTargetID)
                return {...gen, name: genreRef.current!.value}
            else {
                return gen
            }
        }))

        setMessages([`Gatunek został zmieniony w bazie.`])

        closeEditorPane()
    }


    return (
        <Offcanvas show={isOpen} onHide={closeEditorPane} placement="end">
            <Offcanvas.Header closeButton><h3>Edytuj Gatunek</h3></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookAuthors">
                        <Form.Label>Gatunek</Form.Label>
                        <Form.Control name="genre" ref={genreRef} defaultValue={editedGenre?.name} required/>
                        </Form.Group>
                        <Button variant='success' type="submit">Zapisz</Button>
                    </Form>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
