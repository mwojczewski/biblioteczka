import { FormEvent, useEffect, useRef, useState } from "react";
import { Offcanvas, Stack, Form, Button } from "react-bootstrap";
import { useControlsContext } from "../contexts/ControlsContext";
import { useStorageContext } from "../contexts/StorageContext";

type EditLocationProps = {
    isOpen: boolean
}

export function EditLocationComponent({isOpen}:EditLocationProps) {

    const { closeEditorPane, setMessages, editorTargetID } = useControlsContext()
    const { locations, setLocations } = useStorageContext()
    const [ editedLocation, setEditedLocation ] = useState()

    useEffect(() => {
      setEditedLocation(locations.find(location => location.id === editorTargetID))
      console.log(editedLocation)
    }, [editorTargetID])
    

    const locationRef = useRef<HTMLInputElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        // edytujemy nazwę lokalizacji
        setLocations(locations.map(loc => {
            if (loc.id === editorTargetID)
                return {...loc, name: locationRef.current!.value}
            else {
                return loc
            }
        }))

        setMessages([`Lokalizacja została zmieniona w bazie.`])

        closeEditorPane()
    }


    return (
        <Offcanvas show={isOpen} onHide={closeEditorPane} placement="end">
            <Offcanvas.Header closeButton><h3>Edytuj Lokalizację</h3></Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="bookAuthors">
                        <Form.Label>Lokalizacja</Form.Label>
                        <Form.Control name="genre" ref={locationRef} defaultValue={editedLocation?.name} required/>
                        </Form.Group>
                        <Button variant='success' type="submit">Zapisz</Button>
                    </Form>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
