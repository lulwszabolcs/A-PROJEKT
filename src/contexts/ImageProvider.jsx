import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { UserContext } from "./UserProvider"
import { VehicleContext } from "./VehicleProvider"
const ImageContext = createContext()
const ImageProvider = ({children})=>{
    let [images,setImages] = useState([])
    let {token} = useContext(UserContext)
    let {convertType} = useContext(VehicleContext)
    async function pickImageForVehicle(type) {
        try {
          const response = await axios.get(
            `http://localhost:3000/images/vehicle_images/${convertType(type)}.png`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: "blob",
            }
          );
          const imageUrl = URL.createObjectURL(response.data); 
          return imageUrl;
        } catch (error) {
          console.error("Hiba a kép lekérésekor:", error);
        }
    }
    async function pickImageForWorker(workerId) {
      try {
        const response = await axios.get(
          `/images/${workerId}.jpg`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        const imageUrl = URL.createObjectURL(response.data); 
        return imageUrl;
      } catch (error) {
        console.error("Hiba a kép lekérésekor:", error);
      }
    }
    async function getImages() {
        setImages(((await axios.get("/images")).data))
    }
    useEffect(()=>{
        getImages()
    },[])

    return <ImageContext.Provider value={{images,getImages,setImages,pickImageForVehicle,pickImageForWorker}}>
        {children}
    </ImageContext.Provider>
}

export {ImageContext,ImageProvider}