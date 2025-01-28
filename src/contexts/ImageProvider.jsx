import { createContext, useEffect, useState } from "react"
import axios from 'axios'
const ImageContext = createContext()
const ImageProvider = ({children})=>{
    let [images,setImages] = useState([])
    async function getImages() {
        setImages(((await axios.get("http://localhost:8080/images")).data))
    }
    useEffect(()=>{
        getImages()
    },[])

    return <ImageContext.Provider value={{images,getImages,setImages}}>
        {children}
    </ImageContext.Provider>
}

export {ImageContext,ImageProvider}