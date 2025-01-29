import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [users,setUsers] = useState([])
    async function getUsers() {
        const response = await axios.get("http://localhost:8080/api/user")
        setUsers(response.data)
    }

    function getOnlineUsers() {
        let result = users.filter((x)=>x.status==='ONLINE')
        return result.length
    }
    function getUsersLenght() {
        return users.length
    }
    useEffect(()=>{
        getUsers();
    })
    return <UserContext.Provider value={{users,getUsers,getOnlineUsers,getUsersLenght}}>
        {children}
    </UserContext.Provider>
}

export {UserContext,UserProvider}