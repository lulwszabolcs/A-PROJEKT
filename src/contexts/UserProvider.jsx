import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { SnackbarContext} from "./SnackbarProvider";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [token,setToken] = useState()
    const [users,setUsers] = useState([])
    const [userProfile,setUserProfile] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        role:"",
        workerId:""
    })
    let {displaySnackbar} = useContext(SnackbarContext)
    async function userLogin(data) {
        try {
            const response = await axios.post(
                "/api/user/login",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("All Headers:", response.headers);
            console.log("Authorization Header:", response.headers['jwt_token']);
            setUserProfile({
                "name":response.data.worker.name,
                "email":response.data.worker.email,
                "phoneNumber":response.data.worker.phoneNumber,
                "role":response.data.worker.title,
                "workerId":response.data.worker.workerId,

            });
            if (response.headers.jwt_token || response.headers.Authorization) {
                const token = response.headers.jwt_token
                setToken(token)
                console.log("JWT Token:", token);
            } else {
                console.log("No token found in headers");
            }
            return true;
        } catch (error) {
            console.error("Hiba történt a bejelentkezésnél:", error.response?.data || error.message);
        }
    }
    

    async function getUsers() {
        const response = await axios.get('/api/user', {
            headers: {
                'Accept': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ""
            }
        })
        console.log("users",response.data)
        setUsers(response.data)
    }

    function getToken() {
        console.log(token)
        return token;
    }

    function getOnlineUsers() {
        let result = users.filter((x)=>x.status==='User is currently online')
        console.log(result.length)
        return result.length
    }
    function getUsersLenght() {
        console.log("lenght",users.length)
        return users.length
    }
    function getUserProfile() {
        return userProfile;
    }
    async function generateUser(userData,auth) {
        try {
            const response = await (axios.post("/api/user",userData,{
                headers: {
                    'Authorization': auth ? `Bearer ${auth}` : ""
                }
            }))
            if (response) {
                setUsers([response.data,...users])
            }
        } catch (error) {
            displaySnackbar("Hiba a felhasználó hozzáadásakor!",false)
        }
    }
    function userStatusConverter(status) {
        if (status === "User is currently offline") {
            return "OFFLINE"
        } else if (status === "User is currently online") {
            return "ONLINE"
        } else if (status === "ONLINE") {
            return "User is currently online"
        } else if (status === "OFFLINE") {
            return "User is currently offline"
        }
    }
    async function changeUserStatus(id,changedStatus) {
        let changingUser = users.find((x)=>x.id == id)
        if (changingUser.status === userStatusConverter(changedStatus)) {
            displaySnackbar(`Már ${changedStatus} vagy!`,false)
        } else {
            const response = await axios.patch(`/api/user/${id}`,{"key":"STATUS","value":changedStatus},{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            if (response) {
                let result = users.find((x)=>x.id === response.data.id)
                result.status = response.data.status
                setUsers([result,...users])
                displaySnackbar(`Mostantól ${userStatusConverter(response.data.status)} vagy!`,true)
            }
        }
    }
    useEffect(()=>{
        if (token) {
            getUsers();
        }
    },[token])
    return <UserContext.Provider value={{users,getUsers,getOnlineUsers,getUsersLenght,generateUser,changeUserStatus,userLogin,userProfile,token,getToken}}>
        {children}
    </UserContext.Provider>
}

export {UserContext,UserProvider}