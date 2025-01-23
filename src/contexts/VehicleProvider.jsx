import { createContext, useEffect, useState } from "react";
import axios from 'axios'
const VehicleContext = createContext()

const VehicleProvider = ({children})=>{

    let [vehicles,setVehicles] = useState([])
    async function getVehicles() {
        setVehicles(((await axios.get("http://localhost:8080/vehicle/list")).data))
    }
    useEffect(()=>{
        getVehicles()
    },[])

    return <VehicleContext.Provider value={{vehicles}}>
        {children}
    </VehicleContext.Provider>
}

export {VehicleContext,VehicleProvider}