import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { UserContext } from "./UserProvider"
import { VehicleContext } from "./VehicleProvider"
import { SnackbarContext } from "./SnackbarProvider"
import { FlashlightOffRounded } from "@mui/icons-material"

const ImageContext = createContext()

const ImageProvider = ({children})=>{
    let [images,setImages] = useState([])
    let {token} = useContext(UserContext)
    let {convertType} = useContext(VehicleContext)
    let {displaySnackbar} = useContext(SnackbarContext)

    async function uploadImage(file,imageSave) {
      try {
        const formData = new FormData();
        formData.append("file", file); 
        formData.append("imageSave", JSON.stringify(imageSave)); 
        const response = await axios.post("/api/images/upload", formData, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : "",
            "Content-Type": "multipart/form-data",
          },
        });      
      } catch (error) {
        displaySnackbar("Hiba a kép feltöltése közben!",FlashlightOffRounded)
      }
    }

    async function pickImageForVehicle(type) {
        try {
          const response = await axios.get(
            `/images/vehicle_images/${convertType(type)}.png`,
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
          displaySnackbar("Hiba a kép lekérésekor!",false)
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
        displaySnackbar("Hiba a kép lekérésekor!",false)
      }
    }
    async function getImages() {
      try {
        setImages(((await axios.get("/api/images",{
          headers: {
            'Authorization': token ? `Bearer ${token}` : ""
          }
        })).data))
      } catch (error) {
        displaySnackbar("Hiba a képek lekérésekor!",false)
      }
    }
    // useEffect(()=>{
    //     getImages()
    // },[])

    return <ImageContext.Provider value={{images,getImages,setImages,pickImageForVehicle,pickImageForWorker,uploadImage}}>
        {children}
    </ImageContext.Provider>
}

export {ImageContext,ImageProvider}