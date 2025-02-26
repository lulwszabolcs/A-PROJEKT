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

  async function getVehicles() {
    if (!token) {
      return;
    }
    try {
      const response = await axios.get("/api/vehicle/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles([...response.data]);   
     } catch (error) {
      displaySnackbar("Hiba a járművek lekérdezésekor!",false)
    }
  }

  async function addVehicle(vehicle) {
    try {
      const result = await axios.post("/api/vehicle/", vehicle,{
        headers: {
          'Authorization': token ? `Bearer ${token}` : ""
      }
      });
      setVehicles((prev) => [result.data, ...prev]);
      displaySnackbar("Jármű hozzáadva!",true)
    } catch (error) {
      displaySnackbar("Hiba a jármű hozzáadásakor!",false)
    }
  }

  async function modifyVehicle(id, newStatus) {
    try {
      const result = await axios.patch(`/api/vehicle/${id}`, {
        key: "STATUS",
        value: newStatus,
    },{
      headers: {
        'Authorization': token ? `Bearer ${token}` : ""
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
    let result = vehicles.filter((x)=>x.status === 'Jármű működőképes')
    return result.length
  }
  function getInActiveVehicles() {
    let result = vehicles.filter((x)=>x.status !== 'Jármű működőképes')
    return result.length
  }

  useEffect(() => {
    if (token) {
      getVehicles();
    }
  }, [token]);

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, getVehicles, modifyVehicle, setVehicles,getActiveVehicles,getInActiveVehicles,convertType}}>
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
