import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { UserContext } from "./UserProvider";
import { SnackbarContext } from "./SnackbarProvider";
const WorkerContext = createContext()
const WorkerProvider = ({children})=>{
    let {generateUser} = useContext(UserContext)
    let [workers,setWorkers] = useState([])
    let {displaySnackbar} = useContext(SnackbarContext)

    async function getWorkers() {
        const respone = await axios.get("http://localhost:8080/worker/list")
        setWorkers(respone.data);
    }
    async function updateWorker(id,data) {
        const respone = await axios.put(`http://localhost:8080/worker/${id}`,data)
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