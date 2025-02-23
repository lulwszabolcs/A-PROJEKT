import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext, UserProvider} from "./UserProvider";
const TypeContext = createContext();

const TypeProvider = ({children}) => {
    let {token} = useContext(UserContext);
    const [vehicleTypes,setVehicleTypes] = useState([]);
    const [vehicleStatuses,setVehicleStatuses] = useState([]);
    const [problemTypes,setProblemTypes] = useState([]);
    const [problemTypeDescriptions,setProblemTypeDescriptions] = useState([]);
    const [problemTypeSeries,setProblemTypeSeries] = useState([]);
    async function getVehicleTypes(auth) {
        if (!auth) {
            return;
          }
        const response = await axios.get("/vehicletypes/list",{
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        }) 
        setVehicleTypes([...response.data])
        }
    async function getVehicleStatuses() {
        setVehicleStatuses(((await axios.get("/vehiclestatuses/list",{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ""
            }
        })).data))
    }
    
    async function getProblemTypes() {
        setProblemTypes((await axios.get("/problemtypes/list",{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ""
            }
        }).data))
    }

    function getProblemTypeDescriptions() {
        const descriptions = problemTypes.map(problem => problem.problemTypeDescription);
        setProblemTypeDescriptions(descriptions)
        return problemTypeDescriptions
    }    
    
    useEffect(()=>{
        if (token) {
            getVehicleTypes(token)
            getVehicleStatuses()
        }
    },[token])
    return (
        <TypeContext.Provider value={{vehicleTypes,vehicleStatuses,problemTypes,getProblemTypeDescriptions,problemTypeDescriptions,problemTypeSeries,setProblemTypeDescriptions,setProblemTypeSeries}}>
            {children}
        </TypeContext.Provider>
    )
}

export {TypeContext,TypeProvider}