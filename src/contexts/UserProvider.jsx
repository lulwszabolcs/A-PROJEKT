import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { SnackbarContext} from "./SnackbarProvider";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [users,setUsers] = useState([])
    let {displaySnackbar} = useContext(SnackbarContext)
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
    async function generateUser(userData) {
        const response = await (axios.post("http://localhost:8080/api/generateuser",userData)).catch((error)=>{
            console.log(error)
        })
        setUsers([response.data,...users])
        console.log("siker" + response.data)
    }

    async function changeUserStatus(id,changedStatus) {
        let changingUser = users.find((x)=>x.id == id)
        if (changingUser.status === changedStatus) {
            displaySnackbar(`Már ${changedStatus} vagy!`,false)
        } else {
            const response = await axios.patch(`http://localhost:8080/api/user/${id}`,{"key":"STATUS","value":changedStatus})
            if (response) {
                let result = users.find((x)=>x.id === response.data.id)
                result.status = response.data.status
                setUsers([result,...users])
                displaySnackbar(`Mostantól ${response.data.status} vagy!`,true)
            }
        }
    }
    useEffect(()=>{
        getUsers();
    })
    return <UserContext.Provider value={{users,getUsers,getOnlineUsers,getUsersLenght,generateUser,changeUserStatus}}>
        {children}
    </UserContext.Provider>
}

export {UserContext,UserProvider}