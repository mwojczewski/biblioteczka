import { createContext, ReactNode, useContext } from "react"
import { RawBook, Author, Genre } from "../App"
import { useLocalStorage } from "../hooks/useLocalStorage"

type StorageProviderProps = {
    children: ReactNode
}

type StorageContextProps = {
    books: RawBook[]
    setBooks: (books: RawBook[]) => void
    authors: Author[]
    setAuthors: (authors: Author[]) => void
    genres: Genre[]
    setGenres: (genres: Genre[]) => void
    locations: Location[]
    setLocations: (locations: Location[]) => void
}

const StorageContext = createContext({} as StorageContextProps);

export function useStorageContext() {
    return useContext(StorageContext);
}

export function StorageProvider({children}: StorageProviderProps) {
    const [books, setBooks] = useLocalStorage<RawBook[]>("BOOKS", [])
    const [authors, setAuthors] = useLocalStorage<Author[]>("AUTHORS", [])
    const [genres, setGenres] = useLocalStorage<Genre[]>("GENRES", [])
    const [locations, setLocations] = useLocalStorage<Location[]>("LOCATIONS", [])

    return (
    <StorageContext.Provider value={{ 
        books , setBooks, 
        authors, setAuthors, 
        genres, setGenres, 
        locations, setLocations
        }}>
        {children}
    </StorageContext.Provider>)
}