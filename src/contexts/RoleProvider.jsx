import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { UserContext } from "./UserProvider"
import { SnackbarContext } from "./SnackbarProvider"

const RoleContext = createContext()

const RoleProvider = ({children})=>{
    let [roles,setRoles] = useState([])
    let {token} = useContext(UserContext)
    let {displaySnackbar} = useContext(SnackbarContext)
    
    async function getRoles() {
        try {
            setRoles(((await axios.get("/roles/list",{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })).data))
        } catch (error) {
            displaySnackbar("Hiba a munkakörök lekérdezésekor!",false)
        }        
    }

    useEffect(()=>{
        getRoles()
    },[])

    return <RoleContext.Provider value={{roles}}>
        {children}
    </RoleContext.Provider>
}

export {RoleContext,RoleProvider}