import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { UserContext } from "./UserProvider"
import { VehicleContext } from "./VehicleProvider"
const ImageContext = createContext()
const ImageProvider = ({children})=>{
    let [images,setImages] = useState([])
    let {token} = useContext(UserContext)
    let {convertType} = useContext(VehicleContext)
    async function pickImageForVehicle(vehicle) {
        try {
          const response = await axios.get(
            `http://localhost:3000/images/vehicle_images/${convertType(vehicle.type)}.png`,
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

    return <ImageContext.Provider value={{images,getImages,setImages,pickImageForVehicle}}>
        {children}
    </ImageContext.Provider>
}

export {ImageContext,ImageProvider}