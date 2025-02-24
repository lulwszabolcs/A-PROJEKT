import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { UserContext } from "./UserProvider";
import { SnackbarContext } from "./SnackbarProvider";
const WorkerContext = createContext()
const WorkerProvider = ({children})=>{
    let {token} = useContext(UserContext)
    let [workers,setWorkers] = useState([])
    let {displaySnackbar} = useContext(SnackbarContext)
    console.log("token a workerben",token)
    async function getWorkers() {
        const respone = await axios.get("/worker/list",{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ""
            }
        })
        setWorkers(respone.data);
    }
    async function updateWorker(id,data) {
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
    }
    useEffect(()=>{
        getWorkers()
    },[])

    return <WorkerContext.Provider value={{workers,getWorkers,updateWorker}}>
        {children}
    </WorkerContext.Provider>
}

export {WorkerContext,WorkerProvider}