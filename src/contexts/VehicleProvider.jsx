import { createContext, useEffect, useState } from "react";
import axios from 'axios'
const VehicleContext = createContext()

const VehicleProvider = ({children})=>{

    let [vehicles,setVehicles] = useState([])
    async function getVehicles() {
        setVehicles(((await axios.get("http://localhost:8080/vehicle/list")).data))
    }
    async function addVehicle(vehicle) {
        const result = await axios.post("http://localhost:8080/vehicle/",vehicle)
        const updatedVehicles = [result.data,...vehicles]
        setVehicles(updatedVehicles)
    }
    useEffect(()=>{
        getVehicles()
    },[])

    return <VehicleContext.Provider value={{vehicles,addVehicle,getVehicles}}>
        {children}
    </VehicleContext.Provider>
}

export {VehicleContext,VehicleProvider}