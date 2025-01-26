import axios from "axios";
import { createContext, useEffect, useState } from "react";

const TypeContext = createContext();

const TypeProvider = ({children}) => {
    const [vehicleTypes,setVehicleTypes] = useState([]);
    const [vehicleStatuses,setVehicleStatuses] = useState([]);
    async function getVehicleTypes() {
        setVehicleTypes(((await axios.get("http://localhost:8080/vehicletypes/list")).data))
    }
    async function getVehicleStatuses() {
        setVehicleStatuses(((await axios.get("http://localhost:8080/vehiclestatuses/list")).data))
    }
    useEffect(()=>{
        getVehicleTypes();
        getVehicleStatuses()
    },[])
    return (
        <TypeContext.Provider value={{vehicleTypes,vehicleStatuses}}>
            {children}
        </TypeContext.Provider>
    )
}

export {TypeContext,TypeProvider}