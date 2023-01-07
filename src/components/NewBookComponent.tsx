import React, { FormEvent, useRef, useState } from 'react'
import { Button, Form, FormLabel, Offcanvas, Stack } from 'react-bootstrap'
import { useControlsContext } from '../contexts/ControlsContext'
import CreatibleReactSelect from 'react-select/creatable'
import { useStorageContext } from '../contexts/StorageContext'
import { v4 as uuidV4 } from 'uuid'
import { Author, Genre, RawBook, RawBookData } from '../App'
import { valueContainerCSS } from 'react-select/dist/declarations/src/components/containers'

type newBookProps = {
  isOpen: boolean
}

export function NewBookComponent({isOpen}:newBookProps, msg:(data: string[]) => void) {

  const { closeBookCreator, setMessages } = useControlsContext()

  const titleRef = useRef<HTMLInputElement>(null)
  const notesRef = useRef<HTMLTextAreaElement>(null)
  const { genres, setGenres, authors, setAuthors, books, setBooks, locations, setLocations } = useStorageContext();
  const [ localAuthors, setLocalAuthors ] = useState<Author[]>([]) 
  const [ localGenres, setLocalGenres ] = useState<Genre[]>([]);
  const [ localLocation, setLocalLocation ] = useState<Location[]>([]);

  function handleSubmit(e: FormEvent) {

    e.preventDefault()

    // dodajemy nowych autorów
    localAuthors.map(la => {
      if (la?.new == true) {
        la.id = uuidV4()
        setAuthors([...authors, {id: la.id, name: la.name}])
        return {id: la.id, name: la.name}
      }
    })

    // dodajemy nowe kategorie
    localGenres.map(lg => {
      if (lg?.new == true) {
        lg.id = uuidV4()
        setGenres([...genres, {id: lg.id, name: lg.name}])
        return {id: lg.id, name: lg.name}
      }
    })

     // dodajemy nowe lokalizacje
    if (localLocation?.new == true) {
      localLocation.id = uuidV4()
      setLocations([...locations, {id: localLocation.id , name: localLocation.name}])
    }

    const book: RawBook = {
      id: uuidV4(),
      title: titleRef.current!.value,
      authorIDs: localAuthors.map(author => {return author.id}),
      genreIDs: localGenres.map(genre => {return genre.id}), 
      notes: notesRef.current?.value + "",
      locationID: localLocation!.id
    }

    // dodajemy nową książkę do kontekstu
    setBooks([...books, book])

    // powiadamiamy o powodzeniu
    setMessages([`Pozycja "${book.title}" została dodana do biblioteczki.`])

    closeBookCreator()

  }

  return (
    <Offcanvas show={isOpen} onHide={closeBookCreator} placement="end">
      <Offcanvas.Header closeButton><h3>Dodaj książkę</h3></Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={2}>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="bookTitle">
          <Form.Label>Tytuł pozycji</Form.Label>
          <Form.Control name="title "type="text" ref={titleRef} placeholder="Podaj tytuł" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookAuthors">
          <Form.Label>Autorzy</Form.Label>
          <CreatibleReactSelect 
            name="authors"
            options={authors.map(author => { 
              return {value: author.id, label: author.name}
              })}
              onChange={auth => {
                setLocalAuthors(auth.map(a => {
                  return {id: a.value, name: a.label, new: a?.__isNew__}
                }))
              }}
            isMulti required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookAuthors">
          <Form.Label>Gatunki</Form.Label>
          <CreatibleReactSelect 
            name="genres"
            options={genres.map(genre => { 
              return {value: genre.id, label: genre.name}
              })} 
            onChange={genre => {
              setLocalGenres(genre.map(gen => {
                return {id: gen.value, name: gen.label, new: gen?.__isNew__}
              }))
            }}
            isMulti required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookAuthors">
          <Form.Label>Lokalizacja</Form.Label>
          <CreatibleReactSelect 
            name="location"
            options={locations.map(location => { 
              return {value: location?.id, label: location?.name}
              })} 
            onChange={location => {
              setLocalLocation({id: location!.value, name: location!.label, new: location?.__isNew__})
            }}
            required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="bookTitle">
          <Form.Label>Notatki</Form.Label>
          <Form.Control as="textarea" rows={5} type="text" ref={notesRef} name="notes" placeholder="dodaj notatki" />
        </Form.Group>
        <Button variant='success' type="submit">Zapisz</Button>
      </Form>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}