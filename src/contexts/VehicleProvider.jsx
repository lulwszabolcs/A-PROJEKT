import { createContext, useEffect, useState } from "react";
import axios from "axios";

const VehicleContext = createContext();

const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  // Adatok lekérése
  async function getVehicles() {
    try {
      const response = await axios.get("http://localhost:8080/vehicle/list");
      setVehicles(response.data);
    } catch (error) {
      console.error("Hiba történt a járművek lekérésekor:", error.message);
    }
  }

  // Új jármű hozzáadása
  async function addVehicle(vehicle) {
    try {
      const result = await axios.post("http://localhost:8080/vehicle/", vehicle);
      setVehicles((prev) => [result.data, ...prev]);
    } catch (error) {
      console.error("Hiba történt jármű hozzáadásakor:", error.message);
    }
  }

  // Jármű módosítása
  async function modifyVehicle(id, newStatus) {
    try {
      const result = await axios.patch(`http://localhost:8080/vehicle/${id}`, {
        key: "STATUS",
        value: newStatus,
      });
  
      console.log("API válasz:", result.data); // Ellenőrizd, mit küld vissza az API
  
      // Ellenőrizd, hogy az állapot frissítése jól működik
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

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <VehicleContext.Provider
      value={{ vehicles, addVehicle, getVehicles, modifyVehicle, setVehicles }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export { VehicleContext, VehicleProvider };
