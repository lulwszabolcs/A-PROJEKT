import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { SnackbarContext} from "./SnackbarProvider";


const UserContext = createContext();

const UserProvider = ({children}) => {
    let {displaySnackbar} = useContext(SnackbarContext)
    const [token,setToken] = useState()
    const [users,setUsers] = useState([])
    const [userProfile,setUserProfile] = useState({
        name:"",
        email:"",
        phoneNumber:"",
        role:"",
        workerId:"",
        userId:"",
        status:""
    })
    const [userStatus,setUserStatus] = useState()

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
            setUserProfile({
                "name":response.data.worker.name,
                "email":response.data.worker.email,
                "phoneNumber":response.data.worker.phoneNumber,
                "role":response.data.worker.title,
                "workerId":response.data.worker.workerId,
                "userId":response.data.id,
                "status":response.data.status
            });
            if (response.headers.jwt_token || response.headers.Authorization) {
                const token = response.headers.jwt_token
                setToken(token)
            }
            return true;
        } catch (error) {
            displaySnackbar("Hibás felhasználói adatok!",false)
        }
    }

    function logout() {
        setToken(null)
        setUserProfile({
            name:"",
            email:"",
            phoneNumber:"",
            role:"",
            workerId:"",
            status:""
        })
    }

    async function getUsers() {
        try {
            const response = await axios.get('/api/user', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            setUsers(response.data)
        } catch (error) {
            displaySnackbar("Hiba a felhasználók lekérdezésekor!",false)
        }
    }

    function getToken() {
        return token;
    }

    function getOnlineUsers() {
        let result = users.filter((x)=>x.status==='User is currently online')
        return result.length
    }
    function getUsersLenght() {
        return users.length
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
        } else if (status === "User is currently on holiday") {
            return "SZABADSÁGON"
        } else if (status === "ONLINE") {
            return "User is currently online"
        } else if (status === "OFFLINE") {
            return "User is currently offline"
        } else if (status === "ON_HOLIDAY") {
            return "User is currently on holiday"
        }
    }
    async function changeUserStatus(id,changedStatus) {
        try {
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
                    setUsers([...users])
                    setUserStatus(response.data.status)
                    displaySnackbar(`Mostantól ${userStatusConverter(response.data.status)} vagy!`,true)
                }
            }
        } catch (error) {
            displaySnackbar("Hiba a felhasználó állapot módosításnál!",false)
        }
    }

    async function checkIfUserHasPermission(permission) {
        try {
            const response = await axios.get(`api/check-permission?permission=${permission}`,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            return response.data
        } catch (error) {
            displaySnackbar("Hiba a jogosultság lekérdezésekor!",false)
        }
    }

    function generatePdfFileForUser(id) {
        try {
            axios.get(`/api/user/pdf/${id}`,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            }).then(()=>{
                displaySnackbar("PDF sikeresen mentve!",true)
            })
        } catch (error) {
            displaySnackbar("Hiba a PDF generálásánál!",false)
        }
    }
    async function getUserStatus(id) {
        try {
            const response = (await axios.get(`/api/user/getstatus/${id}`,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            }))
            return response
        } catch (error) {
            displaySnackbar("Hiba a felhasználó állapot lekérdezésekor",true)
        }
    }

    useEffect(()=>{
        if (token) {
            getUsers()
        }
    },[token])
    
    return <UserContext.Provider value={{users,getUsers,getOnlineUsers,getUsersLenght,generateUser,changeUserStatus,userLogin,userProfile,token,getToken,logout,checkIfUserHasPermission,generatePdfFileForUser,getUserStatus,userStatus}}>
        {children}
    </UserContext.Provider>
}

export {UserContext,UserProvider}