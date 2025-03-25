import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { SnackbarContext } from "./SnackbarProvider"
import { UserContext } from "./UserProvider"

const NoteContext = createContext()

const NoteProvider = ({children}) => {
    let {displaySnackbar} = useContext(SnackbarContext)
    let {token} = useContext(UserContext)

    const [notes,setNotes] = useState([])

    async function getNotes() {
        try {
            const response = await axios.get("/api/notes/list",{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            setNotes(response.data)
        } catch (error) {
            displaySnackbar("Hiba a jegyzetek lekérdezésekor!",false)
        }   
    }

    async function addNote(data) {
        try {
            const response  = await axios.post("/api/notes",data,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            setNotes([response.data,...notes])
            displaySnackbar("Jegyzet hozzáadva!",true)
        } catch (error) {
            displaySnackbar("Hiba a jegyzet hozzáadásakor!",false)
        }   
    }
    async function deleteNote(id) {
        try {
            const response = (await axios.delete(`/api/note/${id}`,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })).data
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