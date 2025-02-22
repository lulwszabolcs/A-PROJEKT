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
    console.log("getVehicles called, token:", token);
    if (!token) {
      console.log("Token missing, skipping request");
      return;
    }
    try {
      const response = await axios.get("/vehicle/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response data before setVehicles:", response.data);
      console.log("Response data type:", typeof response.data);
      console.log("Response data is array:", Array.isArray(response.data));
      setVehicles(response.data);
      console.log("setVehicles called with:", response.data);
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
      console.error("Hiba történt jármű hozzáadásakor:", error.message);
    }
  }

  async function modifyVehicle(id, newStatus) {
    try {
      const result = await axios.patch(`/vehicle/${id},`, {
        key: "STATUS",
        value: newStatus,
      },{
        headers: {
          'Authorization': token ? `Bearer ${token}` : ""
      }
      });  
      let modified = vehicles.find((x)=>x.vehicleId === result.data.vehicleId)
      modified.status = result.data.status
      setVehicles([modified,...vehicles])
      displaySnackbar("Jármű állapot módosítva!",true)
    } catch (error) {
      console.error("Hiba történt jármű módosításakor:", error);
    }
  }
  function convertType(type) {
      let result = vehicleTypes.find((x)=>x.vehicleTypeDescription === type)
      return result.vehicleTypeName
  }
  function pickImage(vehicle) {
    const imageSrc = `http://localhost:8080/images/vehicle_images/${convertType(vehicle.type)}.png`
    return imageSrc;
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
    console.log("useEffect ran, token:", token);
    if (token) {
      console.log("Token available, fetching vehicles...");
      getVehicles();
    } else {
      console.log("No token yet in VehicleProvider");
    }
  }, [token]);

  useEffect(() => {
    console.log("Vehicles state updated:", vehicles);
  }, [vehicles]);

  return (
    

    <VehicleContext.Provider
      value={{ vehicles, addVehicle, getVehicles, modifyVehicle, setVehicles, pickImage,getActiveVehicles,getInActiveVehicles }}
      >
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
