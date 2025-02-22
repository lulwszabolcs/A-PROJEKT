import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { getRoles } from "@testing-library/react"
import { UserContext } from "./UserProvider"
const RoleContext = createContext()
const RoleProvider = ({children})=>{
    let [roles,setRoles] = useState([])
    let {token} = useContext(UserContext)
    async function getRoles() {
        setRoles(((await axios.get("/roles/list",{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ""
            }
        })).data))
    }
    useEffect(()=>{
        getRoles()
    },[])

    return <RoleContext.Provider value={{roles}}>
        {children}
    </RoleContext.Provider>
}

export {RoleContext,RoleProvider}