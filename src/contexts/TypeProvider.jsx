import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext} from "./UserProvider";
import { SnackbarContext } from "./SnackbarProvider";

const TypeContext = createContext();

const TypeProvider = ({children}) => {

    let {token} = useContext(UserContext);
    let {displaySnackbar} = useContext(SnackbarContext)

    const [vehicleTypes,setVehicleTypes] = useState([]);
    const [vehicleStatuses,setVehicleStatuses] = useState([]);
    const [problemTypes,setProblemTypes] = useState([]);
    const [problemTypeDescriptions,setProblemTypeDescriptions] = useState([]);

    async function getVehicleTypes() {
        try {
            if (!token) {
                return;
              }
            const response = await axios.get("/vehicletypes/list",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 
            setVehicleTypes([...response.data])
            } catch (error) {
            displaySnackbar("Hiba a jármű típusok lekérdezéskor!",false)
        }
    }
        
    async function getVehicleStatuses() {
        try {
            setVehicleStatuses(((await axios.get("/vehiclestatuses/list",{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })).data))
        } catch (error) {
            displaySnackbar("Hiba a jármű állapotok lekérdezésekor!",false)
        }
    }
    
    async function getProblemTypes() {
        try {
            const response = (await axios.get("/problemtypes/list",{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            }))
            setProblemTypes([...response.data])
        } catch (error) {
            displaySnackbar("Hiba a probléma típusok lekérdezésekor!",false)
        } 
    }

    function getProblemTypeDescriptions() {
        const descriptions = problemTypes.map(problem => problem.problemTypeDescription);
        setProblemTypeDescriptions(descriptions)
        return problemTypeDescriptions
    }    
    
    useEffect(()=>{
        if (token) {
            getVehicleTypes()
            getVehicleStatuses()
            getProblemTypes()
        }
    },[token])
    return (
        <TypeContext.Provider value={{vehicleTypes,vehicleStatuses,problemTypes,getProblemTypeDescriptions,problemTypeDescriptions,setProblemTypeDescriptions}}>
            {children}
        </TypeContext.Provider>
    )
}

export {TypeContext,TypeProvider}