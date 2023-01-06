import { Alert, Button, Col, Row, Table } from 'react-bootstrap'
import { Author, BookData, Genre, RawBook, RawBookData } from '../App';
import { BookListEntryComponent } from '../components/BookListEntryComponent';
import { NewBookComponent } from '../components/NewBookComponent';
import { useControlsContext } from '../contexts/ControlsContext';
import { useStorageContext } from '../contexts/StorageContext';
import { v4 as uuidV4 } from 'uuid'
import { useEffect, useState } from 'react';
import Select from 'react-select'



type NewBookProps = {
    onSubmit: (data: BookData) => void
}

function Book() {

    const { openBookCreator, bookCreator } = useControlsContext()
    const { books, authors, genres, locations } = useStorageContext()
    const { setBooks, setAuthors, setGenres, setLocations } = useStorageContext()

    const { messages, setMessages } = useControlsContext()

    const [localBooks, setLocalBooks] = useState<RawBookData[]>([])
    const [localAuthors, setLocalAuthors] = useState<Author[]>([])
    const [localGenres, setLocalGenres] = useState<Genre[]>([])
    const [localLocations, setLocalLocations] = useState<Location[]>([])

    const [bookFilter, setBookFilter] = useState<RawBook[]>([])

    useEffect(() => {
       let tempbooks:RawBook[] = [...books]

       if (localBooks.length > 0) {
            localBooks.map(book => {
                tempbooks = tempbooks.filter(b => b.title == book.name)
            })
       }

        if (localAuthors.length > 0) {
            localAuthors.map(author => {
                tempbooks = tempbooks.filter(book => book.authorIDs.includes(author.id))
            })
        }

        if (localGenres.length > 0) {
            localGenres.map(genre => {
                console.log(tempbooks, genre, tempbooks.filter(book => book.genreIDs.includes(genre.id)))

                tempbooks = tempbooks.filter(book => book.genreIDs.includes(genre.id))
            })
        }

        if (localLocations.length > 0) {
            localLocations.map(location => {
                tempbooks = tempbooks.filter(book => book.locationID === location.id)
            })
        }
       
        setBookFilter([...tempbooks])

    }, [localBooks, localAuthors, localGenres, localLocations])
    

  return (
    <>
        <Row>
            <Col>
                <h1>Katalog książek</h1>
            </Col>
        </Row>
        {
            messages.map(message => (
                <Alert variant="success" onClick={() => { setMessages(messages.filter(msg => msg !== message))}} dismissible>{message}</Alert>
            ))
        }
        <Row>
            <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={openBookCreator}>Dodaj nową książkę</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <Table className='mt-5' bordered hover responsive>
                <thead>
                    <tr>
                        <th style={{width: "3%"}}>#</th>
                        <th style={{minWidth: "30%"}}>Tytuł pozycji</th>
                        <th style={{width: "20%"}}>Autorzy pozycji</th>
                        <th style={{width: "15%"}}>Gatunki literackie</th>
                        <th style={{width: "15%"}}>Obecna lokalizacja</th>
                        <th style={{width: "17%"}}>Opcje</th>
                    </tr>
                    <tr>
                        <th>{ }</th>
                        <th>
                        <Select 
                            name="books"
                            options={books.map(book => { 
                            return {value: book.id, label: book.title}
                            })}
                            onChange={book => {
                                setLocalBooks(book.map(b => {
                                return {id: b.value, name: b.label}
                                }))
                            }}
                            isMulti />
                        </th>
                        <th>
                        <Select 
                            name="authors"
                            options={authors.map(author => { 
                            return {value: author.id, label: author.name}
                            })}
                            onChange={author => {
                                setLocalAuthors(author.map(a => {
                                return {id: a.value, name: a.label}
                                }))
                            }}
                            isMulti />
                        </th>
                        <th>
                        <Select 
                            name="genres"
                            options={genres.map(genre => { 
                            return {value: genre.id, label: genre.name}
                            })}
                            onChange={genre => {
                                setLocalGenres(genre.map(g => {
                                return {id: g.value, name: g.label}
                                }))
                            }}
                            isMulti />
                        </th>
                        <th>
                        <Select 
                            name="locations"
                            options={locations.map(location => { 
                            return {value: location.id, label: location.name}
                            })}
                            onChange={auth => {
                                setLocalLocations(auth.map(l => {
                                return {id: l.value, name: l.label}
                                }))
                            }}
                            isMulti />
                        </th>
                        <th>{ }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    bookFilter.length == 0 ?
                        (<tr><td colSpan={6} className="text-center fw-bold">W tej chwili lista jest pusta.</td></tr>)
                    :
                        bookFilter.map(book => (<BookListEntryComponent key={uuidV4()} {...book} />))
                    }
                </tbody>
            </Table>
            </Col>
        </Row>
        <Row>
            <Col>
            <h5>Opcje developerskie</h5></Col>
        </Row>
        
        <Row>
            <Col className="d-flex justify-content-center mb-4">
                <Button className="me-4" variant="warning" onClick={() => {console.log(books)}}>Zrzut books</Button>
                <Button className="me-4" variant="warning" onClick={() => {console.log(authors)}}>Zrzut authors</Button>
                <Button className="me-4" variant="warning" onClick={() => {console.log(genres)}}>Zrzut genres</Button>
                <Button variant="warning" onClick={() => {console.log(locations)}}>Zrzut locations</Button>

            </Col>
        </Row>
        <Row>
            <Col className="d-flex justify-content-center">
                <Button className="me-4" variant="danger" onClick={() => {setBooks([])}}>Usuń books</Button>
                <Button className="me-4" variant="danger" onClick={() => {setAuthors([])}}>Usuń authors</Button>
                <Button className="me-4" variant="danger" onClick={() => {setGenres([])}}>Usuń genres</Button>
                <Button variant="danger" onClick={() => {setLocations([])}}>Usuń locations</Button>
            </Col>
        </Row>
        <NewBookComponent isOpen={bookCreator} />
    </>
  )
}

export default Book