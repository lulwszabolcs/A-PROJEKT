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

  async function pickImage(vehicle) {
    try {
      const response = await axios.get(
        `http://localhost:3000/images/vehicle_images/${convertType(vehicle.type)}.png`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Blobként kérjük a képet
        }
      );
      const imageUrl = URL.createObjectURL(response.data); // Blob-ból URL generálása
      return imageUrl;
    } catch (error) {
      console.error("Hiba a kép lekérésekor:", error);
    }
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

  useEffect(() => {
    console.log("Vehicles state updated:", vehicles);
  }, [vehicles]);

  return (
    
    <VehicleContext.Provider
      value={{ vehicles, addVehicle, getVehicles, modifyVehicle, setVehicles,getActiveVehicles,getInActiveVehicles,pickImage}}
      >
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
