import axios from "axios";
import { createContext, useEffect, useState } from "react";

const TypeContext = createContext();

const TypeProvider = ({children}) => {
    const [vehicleTypes,setVehicleTypes] = useState([]);
    const [vehicleStatuses,setVehicleStatuses] = useState([]);
    const [problemTypes,setProblemTypes] = useState([]);
    async function getVehicleTypes() {
        setVehicleTypes(((await axios.get("http://localhost:8080/vehicletypes/list")).data))
    }
    async function getVehicleStatuses() {
        setVehicleStatuses(((await axios.get("http://localhost:8080/vehiclestatuses/list")).data))
    }
    
    async function getProblemTypes() {
        setProblemTypes(((await axios.get("http://localhost:8080/problemtypes/list")).data))
    }

    useEffect(()=>{
        getVehicleTypes();
        getVehicleStatuses()
        getProblemTypes()
    },[])
    return (
        <TypeContext.Provider value={{vehicleTypes,vehicleStatuses,problemTypes}}>
            {children}
        </TypeContext.Provider>
    )
}

export {TypeContext,TypeProvider}