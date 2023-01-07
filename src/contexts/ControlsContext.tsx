import { createContext, ReactNode, useContext, useState } from "react";
import { NewBookComponent } from "../components/NewBookComponent";

type ControlsProviderProps = {
    children: ReactNode
}

type ControlsContextProps = {
    openCreatorPane: () => void
    closeCreatorPane: () => void
    creatorPane: boolean
    openEditorPane: () => void
    closeEditorPane: () => void
    editorPane: boolean
    editorTargetID: string
    setEditorTargetID: () => void
    messages: string[]
    setMessages: (data: string[]) => void
}

const ControlsContext = createContext({} as ControlsContextProps);

export function useControlsContext() {
    return useContext(ControlsContext);
}

export function ControlsProvider({children}: ControlsProviderProps) {
    const [creatorPane, setCreatorPane] = useState(false)
    const [editorPane, setEditorPane] = useState(false)
    const [editorTargetID, setEditorTargetID] = useState<string>(null)
    const [messages, setMessages] = useState<string[]>([])


    const openCreatorPane = () => setCreatorPane(true)
    const closeCreatorPane = () => setCreatorPane(false)
    
    const openEditorPane = () => setEditorPane(true)
    const closeEditorPane = () => setEditorPane(false)

    return (
    <ControlsContext.Provider value={{
        openCreatorPane, closeCreatorPane, creatorPane, 
        openEditorPane, closeEditorPane, editorPane, 
        editorTargetID, setEditorTargetID,
        messages, setMessages}}>
        {children}
    </ControlsContext.Provider>)
}