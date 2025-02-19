import axios from "axios";
import { createContext, useEffect, useState } from "react";

const TypeContext = createContext();

const TypeProvider = ({children}) => {
    const [vehicleTypes,setVehicleTypes] = useState([]);
    const [vehicleStatuses,setVehicleStatuses] = useState([]);
    const [problemTypes,setProblemTypes] = useState([]);
    const [problemTypeDescriptions,setProblemTypeDescriptions] = useState([]);
    const [problemTypeSeries,setProblemTypeSeries] = useState([]);
    async function getVehicleTypes() {
        setVehicleTypes(await axios.get("http://localhost:8080/vehicletypes/list").data)   

        }
    async function getVehicleStatuses() {
        setVehicleStatuses(((await axios.get("http://localhost:8080/vehiclestatuses/list")).data))
    }
    
    async function getProblemTypes() {
        setProblemTypes(((await axios.get("http://localhost:8080/problemtypes/list")).data))
    }

    function getProblemTypeDescriptions() {
        const descriptions = problemTypes.map(problem => problem.problemTypeDescription);
        setProblemTypeDescriptions(descriptions)
        return problemTypeDescriptions
    }

    async function getProblemNumberSeries() {
        try {
            const response = await axios.get("http://localhost:8080/api/problem/typeseries");
            setProblemTypeSeries(response.data); 
        } catch (error) {
            console.error("Hiba történt a problématípus sorozat adatainak lekérésénél:", error);
            setProblemTypeSeries([]);  
        }
    }
    
    
    useEffect(()=>{
        getVehicleTypes();
        getVehicleStatuses()
        getProblemTypes()
    },[])
    return (
        <TypeContext.Provider value={{vehicleTypes,vehicleStatuses,problemTypes,getProblemTypeDescriptions,problemTypeDescriptions,getProblemNumberSeries,problemTypeSeries,setProblemTypeDescriptions,setProblemTypeSeries}}>
            {children}
        </TypeContext.Provider>
    )
}

export {TypeContext,TypeProvider}