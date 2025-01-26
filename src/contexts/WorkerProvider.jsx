import { createContext, useEffect, useState } from "react";
import axios from 'axios'
const WorkerContext = createContext()

const WorkerProvider = ({children})=>{

    let [workers,setWorkers] = useState([])
    async function getWorkers() {
        setWorkers(((await axios.get("http://localhost:8080/worker/list")).data))
    }
    useEffect(()=>{
        getWorkers()
    },[])

    return <WorkerContext.Provider value={{workers,getWorkers}}>
        {children}
    </WorkerContext.Provider>
}

export {WorkerContext,WorkerProvider}