import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TypeContext, TypeProvider} from "./TypeProvider";
import { SnackbarContext } from "./SnackbarProvider";
import { UserContext, UserProvider } from "./UserProvider";

const VehicleContext = createContext();
const VehicleProvider = ({ children }) => {
  let {token,getToken,userProfile} = useContext(UserContext)
  let {vehicleTypes} = useContext(TypeContext)
  const [vehicles, setVehicles] = useState([]);
  let {displaySnackbar} = useContext(SnackbarContext)
  async function getVehicles(auth) {
    if (!auth) {
      return;
    }
    try {
      const response = await axios.get("/vehicle/list", {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setVehicles([...response.data]);   
     } catch (error) {
      console.error("Hiba történt a járművek lekérésekor:", error.message);
      console.error("Error response:", error.response);
    }
  }
  async function addVehicle(vehicle) {
    try {
      const result = await axios.post("/vehicle/", vehicle,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : ""
      }
      });
      setVehicles((prev) => [result.data, ...prev]);
      displaySnackbar("Jármű hozzáadva!",true)
    } catch (error) {
      displaySnackbar("Nincs jogosultsága ehhez a művelethez!",false)
    }
  }

  async function modifyVehicle(id, newStatus,auth) {
    console.log(id,newStatus)
    try {
      const result = await axios.patch(`/vehicle/${id}`, {
        key: "STATUS",
        value: newStatus,
    },{
      headers: {
        'Authorization': auth ? `Bearer ${auth}` : ""
      }
    });  
      let modified = vehicles.find((x)=>x.vehicleId === result.data.vehicleId)
      modified.status = result.data.status
      setVehicles([...vehicles])
      displaySnackbar("Jármű állapot módosítva!",true)
    } catch (error) {
      displaySnackbar("Nincs jogosultsága ehhez a művelethez!",false)
    }
  }
  function convertType(type) {
      let result = vehicleTypes.find((x)=>x.vehicleTypeDescription === type)
      return result.vehicleTypeName
  }

  
  function getActiveVehicles() {
    let result = vehicles.filter((x)=>x.status === 'Működőképes')
    return result.length
  }
  function getInActiveVehicles() {
    let result = vehicles.filter((x)=>x.status !== 'Működőképes')
    return result.length
  }

  useEffect(() => {
    if (token) {
      console.log("Token available, fetching vehicles...");
      getVehicles(token);
    } else {
      console.log("No token yet in VehicleProvider");
    }
  }, [token]);

  return (
    
    <VehicleContext.Provider
      value={{ vehicles, addVehicle, getVehicles, modifyVehicle, setVehicles,getActiveVehicles,getInActiveVehicles,convertType}}
      >
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
