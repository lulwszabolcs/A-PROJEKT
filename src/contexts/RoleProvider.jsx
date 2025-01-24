import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { getRoles } from "@testing-library/react"
const RoleContext = createContext()
const RoleProvider = ({children})=>{
    let [roles,setRoles] = useState([])
    async function getRoles() {
        setRoles(((await axios.get("http://localhost:8080/roles/list")).data))
    }
    useEffect(()=>{
        getRoles()
    },[])

    return <RoleContext.Provider value={{roles}}>
        {children}
    </RoleContext.Provider>
}

export {RoleContext,RoleProvider}