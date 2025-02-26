import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { UserContext } from "./UserProvider";
import { SnackbarContext } from "./SnackbarProvider";
const WorkerContext = createContext()
const WorkerProvider = ({children})=>{
    let {token} = useContext(UserContext)
    let [workers,setWorkers] = useState([])
    let {displaySnackbar} = useContext(SnackbarContext)

    async function getWorkers() {
        try {
            const respone = await axios.get("/worker/list",{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            setWorkers(respone.data);
        } catch (error) {
            displaySnackbar("Hiba a dolgozók lekérdezésekor!",false)
        }
    }

    async function updateWorker(id,data) {
        try {
            const respone = await axios.put(`/worker/${id}`,data,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            let modified = workers.find((x)=>x.id===id)
            modified = respone.data;
            setWorkers([modified,...workers])
            displaySnackbar("Dolgozó frissítve",true)
            getWorkers(); 
        } catch (error) {
            displaySnackbar("Hiba a dolgozó hozzáadásakor!",false)
        }
    }

    async function addWorker(data) {
        try {
            const response = await axios.post(`/worker/`,data,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                } 
            })
            setWorkers([response.data,...workers])
            getWorkers()
            return response;
        } catch (error) {
            displaySnackbar("Hiba a dolgozó hozzáadásakor",false)
        }
    }

    useEffect(()=>{
        getWorkers()
    },[])

    return <WorkerContext.Provider value={{workers,getWorkers,updateWorker,addWorker}}>
        {children}
    </WorkerContext.Provider>
}

export {WorkerContext,WorkerProvider}