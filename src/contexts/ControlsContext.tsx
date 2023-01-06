import { createContext, ReactNode, useContext, useState } from "react";
import { NewBookComponent } from "../components/NewBookComponent";

type ControlsProviderProps = {
    children: ReactNode
}

type ControlsContextProps = {
    bookCreator: boolean
    openBookCreator: () => void
    closeBookCreator: () => void
    openAuthorCreator: () => void
    closeAuthorCreator: () => void
    authorCreator: boolean
    openGenreCreator: () => void
    closeGenreCreator: () => void
    genreCreator: boolean
    messages: string[]
    setMessages: (data: string[]) => void
}

const ControlsContext = createContext({} as ControlsContextProps);

export function useControlsContext() {
    return useContext(ControlsContext);
}

export function ControlsProvider({children}: ControlsProviderProps) {
    const [bookCreator, setBookCreator] = useState(false)
    const [authorCreator, setAuthorCreator] = useState(false)
    const [genreCreator, setGenreCreator] = useState(false)
    const [messages, setMessages] = useState<string[]>([])


    const openBookCreator = () => setBookCreator(true)
    const closeBookCreator = () => setBookCreator(false)

    const openAuthorCreator = () => setAuthorCreator(true)
    const closeAuthorCreator = () => setAuthorCreator(false)

    const openGenreCreator = () => setGenreCreator(true)
    const closeGenreCreator = () => setGenreCreator(false)

    return (
    <ControlsContext.Provider value={{
        openBookCreator, closeBookCreator, bookCreator, 
        openAuthorCreator, closeAuthorCreator, authorCreator,
        openGenreCreator, closeGenreCreator, genreCreator,
        messages, setMessages}}>
        {children}
    </ControlsContext.Provider>)
}