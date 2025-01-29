import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TypeContext, TypeProvider} from "./TypeProvider";

const VehicleContext = createContext();
const VehicleProvider = ({ children }) => {
  let {vehicleTypes} = useContext(TypeContext)
  const [vehicles, setVehicles] = useState([]);

  async function getVehicles() {
    try {
      const response = await axios.get("http://localhost:8080/vehicle/list");
      setVehicles(response.data);
    } catch (error) {
      console.error("Hiba történt a járművek lekérésekor:", error.message);
    }
  }

  async function addVehicle(vehicle) {
    try {
      const result = await axios.post("http://localhost:8080/vehicle/", vehicle);
      setVehicles((prev) => [result.data, ...prev]);
    } catch (error) {
      console.error("Hiba történt jármű hozzáadásakor:", error.message);
    }
  }

  async function modifyVehicle(id, newStatus) {
    try {
      const result = await axios.patch(`http://localhost:8080/vehicle/${id}`, {
        key: "STATUS",
        value: newStatus,
      });
  
      console.log("API válasz:", result.data); 
  
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.vehicleId === id ? { ...vehicle, status: newStatus } : vehicle
        )
      );
  
      console.log("Frissített vehicles állapot:", vehicles);
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
    getVehicles();
  }, []);

  return (
    <TypeProvider>

    <VehicleContext.Provider
      value={{ vehicles, addVehicle, getVehicles, modifyVehicle, setVehicles, pickImage,getActiveVehicles,getInActiveVehicles }}
      >
      {children}
    </VehicleContext.Provider>
      </TypeProvider>
  );
};

export { VehicleContext, VehicleProvider };
