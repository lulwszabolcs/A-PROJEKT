import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals"
import { SnackbarContext } from "./SnackbarProvider"
const NoteContext = createContext()
const NoteProvider = ({children}) => {
    let {displaySnackbar} = useContext(SnackbarContext)

    const [notes,setNotes] = useState([])
    async function getNotes() {
        const response = await axios.get("http://localhost:8080/notes/list")
        setNotes(response.data)
    }
    async function addNote(data) {
        try {
            const response  = await axios.post("http://localhost:8080/notes",data)
            setNotes([response.data,...notes])
            displaySnackbar("Jegyzet hozzáadva!",true)
        } catch (error) {
            displaySnackbar("Hiba történet a jegyzet hozzáadásakor!",false)
        }   
    }
    async function deleteNote(id) {
        try {
            const response = (await axios.delete(`http://localhost:8080/note/${id}`)).data
        if (response) {
            let modified = notes.filter((x)=>x.id !== response.id)
            setNotes(modified)
            displaySnackbar("Jegyzet törölve!",true)
        }
        } catch (error) {
            displaySnackbar("Hiba történet a jegyzet törlésekor!",false)
        }
        
    }
    useEffect(()=>{
        getNotes();
    },[])
    return <NoteContext.Provider value={{getNotes,addNote,notes,deleteNote}}>
        {children}
    </NoteContext.Provider>
}

export {NoteContext,NoteProvider}