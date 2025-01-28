import { useContext, useState } from 'react'
import styles from './AddWorker.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { RoleContext } from '../../../../contexts/RoleProvider';
import {MenuItem,Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { WorkerContext } from '../../../../contexts/WorkerProvider';
import { ImageContext } from '../../../../contexts/ImageProvider';
export default function AddWorker({close}) {
    let {roles} = useContext(RoleContext)
    let {getWorkers} = useContext(WorkerContext)
    let {images,setImages,getImages} = useContext(ImageContext)
    const [selectedFile,setSelectedFile] = useState();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()



      async function onSubmit(data) {
        const response = await axios.post("http://localhost:8080/worker/", data);
      
        if (selectedFile) {
          const imageSave = {
            fileName: response.data.workerId + selectedFile.name.substring(selectedFile.name.lastIndexOf(".")),
            filePatch: "./images",
            worker_id: response.data.workerId,
          };
      
          await uploadImage(selectedFile, imageSave);
      
          const newImage = {
            imageName: imageSave.fileName,
            worker_id: imageSave.worker_id,
          };
          setImages((prevImages) => [...prevImages, newImage]);
        }
      
        close();
        getWorkers();
      }
      



    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        setSelectedFile(file)
        
      };
      
    const uploadImage = async (file,imageSave) => {
        try {
          
      
          const formData = new FormData();
          formData.append("file", file); 
          formData.append("imageSave", JSON.stringify(imageSave)); 
      
          const response = await axios.post("http://localhost:8080/images/upload", formData, {
            headers: {
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
            <Stack spacing={40} direction="row">
                    <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                    <Button variant="contained" type='submit'>Mentés</Button>
            </Stack>
        </FormControl>
        </form>
    </div>
    )
}