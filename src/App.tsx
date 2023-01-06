import { Routes, Route } from 'react-router-dom'
import Author from './sites/Author'
import Book from './sites/Book'
import Genre from './sites/Genre'
import Home from './sites/Home'
import Location from './sites/Location'
import { NavbarComponent } from './components/NavbarComponent'
import { Container, Nav } from 'react-bootstrap'
import { ControlsProvider } from './contexts/ControlsContext'
import { StorageProvider } from './contexts/StorageContext'

export type Author = {
  id: string
  name: string
  new: boolean|undefined
}

export type Genre = {
  id: string
  name: string
  new: boolean|undefined
}

export type Location = {
  id: string
  name: string
  new: boolean|undefined
}

export type RawBook = {
  id: string
} & RawBookData

export type RawBookData = {
  title: string
  authorIDs: string[]
  genreIDs: string[]
  notes: string
  locationID: string
}

export type BookData = {
  title: string
  authors: Author[]
  genres: Genre[]
  notes: string|null
  location: string
}

export type NewBookProps = {
  onSubmit: (data: BookData) => void
}

function App() {

  return (
    <StorageProvider>
      <ControlsProvider>
        <NavbarComponent />
        <Container className='my-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ksiazki' element={<Book />} />
            <Route path='/autorzy' element={<Author />} />
            <Route path='/gatunki' element={<Genre />} />
            <Route path='/lokalizacje' element={<Location />} />
          </Routes>
        </Container>
      </ControlsProvider>
    </StorageProvider>
  )
}

export default App
