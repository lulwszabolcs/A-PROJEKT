import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals"
const NoteContext = createContext()
const NoteProvider = ({children}) => {
    const [notes,setNotes] = useState([])
    async function getNotes() {
        const response = await axios.get("http://localhost:8080/notes/list")
        setNotes(response.data)
    }
    async function addNote(data) {
        const response  = await axios.post("http://localhost:8080/notes",data)
        setNotes([response.data,...notes])
    }
    async function deleteNote(id) {
        const response = (await axios.delete(`http://localhost:8080/note/${id}`)).data
        console.log(response)
        let modified = notes.filter((x)=>x.id !== response.id)
        setNotes(modified)
    }
    useEffect(()=>{
        getNotes();
    },[])
    return <NoteContext.Provider value={{getNotes,addNote,notes,deleteNote}}>
        {children}
    </NoteContext.Provider>
}

export {NoteContext,NoteProvider}