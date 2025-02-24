import { useContext, useState } from 'react'
import styles from './AddWorker.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { RoleContext } from '../../../../contexts/RoleProvider';
import {MenuItem,Select, SnackbarContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { WorkerContext } from '../../../../contexts/WorkerProvider';
import { ImageContext } from '../../../../contexts/ImageProvider';
import { UserContext } from '../../../../contexts/UserProvider';
import { Password } from '@mui/icons-material';
import { SnackbarContext } from '../../../../contexts/SnackbarProvider';
import SnackbarComponent from "../../../Snackbar/SnackbarComponent";
export default function AddWorker({close}) {
    let {roles} = useContext(RoleContext)
    let {getWorkers} = useContext(WorkerContext)
    let {images,setImages,getImages} = useContext(ImageContext)
    let {token,generateUser} = useContext(UserContext)
    let {SnackbarOpen,displaySnackbar,closeSnackbar,SnackbarMessage,SnackbarSuccess} = useContext(SnackbarContext)
    const [selectedFile,setSelectedFile] = useState();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()



      async function onSubmit(data) {
        let name = data.name
        if (!name.includes(" ")) {
          displaySnackbar("A névnek két részből kell állnia!",false)
        } else {
          const response = await axios.post("/worker/", data,{
            headers: {
              'Authorization': token ? `Bearer ${token}` : ""
          }
          });
          if (selectedFile) {
            const imageSave = {
              fileName: response.data.workerId + selectedFile.name.substring(selectedFile.name.lastIndexOf(".")),
              filePatch: "./images",
              worker_id: response.data.workerId,
            };
        
            await uploadImage(selectedFile, imageSave,token);
        
            const newImage = {
              imageName: imageSave.fileName,
              worker_id: imageSave.worker_id,
            };
            setImages((prevImages) => [...prevImages, newImage]);
          }
          const userData = {
            "username":response.data.name,
            "password":"asd123qwe",
            "role":response.data.title,
            "status":"User is currently online",
            "worker_id":response.data.workerId
          }
          console.log("userdata",userData)
          generateUser(userData,token)
          displaySnackbar("Dolgozó hozzáadva!",true)
          close();
          getWorkers();
        }
        
      }
      



    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        setSelectedFile(file)
        
      };
      
    const uploadImage = async (file,imageSave,auth) => {
        try {
          
      
          const formData = new FormData();
          formData.append("file", file); 
          formData.append("imageSave", JSON.stringify(imageSave)); 
      
          const response = await axios.post("/images/upload", formData, {
            headers: {
              'Authorization': auth ? `Bearer ${auth}` : "",
              "Content-Type": "multipart/form-data",
            },
          });
      
          console.log("Sikeres feltöltés:", response.data);
        } catch (error) {
          console.error(error);
        }
        
        
      };
    return (
        <div className={styles.modalworker}>
        <h3 className={styles.hiremaintext}>Új dolgozó felvétele</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth className={styles.workerform}>  
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" required {...register("name",{required:true})}
            />
            <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                defaultValue={"Légiforgalmi irányító"} 
                required
                {...register("title",{required:true})}
                >   
                <MenuItem value="" disabled>Beosztás kiválasztása</MenuItem>
                {roles.map((role) => (
                    <MenuItem key={role.roleName} value={role.roleDescription}>
                        {role.roleDescription}
                    </MenuItem>
                ))}
                </Select>
                <div className={styles.imagelabel}>
                <label for="imageinput" class="btn" >{selectedFile ? selectedFile.name :"Kép kiválasztása"}</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id='imageinput'
                    className={styles.imageinput}
                />
                    </div>
            <TextField  name='phonenumber'  id="outlined-basic" label="Telefonszám" variant="outlined" required {...register("phoneNumber",{required:true})}/>
            <TextField  name='email'  id="outlined-basic" label="E-mail" variant="outlined" required {...register("email",{required:true})}/>
            <TextField  name='wage'  id="outlined-basic" label="Fizetés" variant="outlined" required {...register("wage",{required:true})} />
            <Stack className={styles.buttons} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    <Button variant="contained" type='submit'>Mentés</Button>
            </Stack>
        </FormControl>
        </form>
        <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/>
    </div>
    )
}