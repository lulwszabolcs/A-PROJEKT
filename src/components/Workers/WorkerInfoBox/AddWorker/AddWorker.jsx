import { useContext, useState } from 'react'
import styles from './AddWorker.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { RoleContext } from '../../../../contexts/RoleProvider';
import {MenuItem,Select} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { WorkerContext } from '../../../../contexts/WorkerProvider';
import { ImageContext } from '../../../../contexts/ImageProvider';
import { UserContext } from '../../../../contexts/UserProvider';
import { SnackbarContext } from '../../../../contexts/SnackbarProvider';
import SnackbarComponent from "../../../Snackbar/SnackbarComponent";
export default function AddWorker({close}) {
    let {roles} = useContext(RoleContext)
    let {getWorkers,addWorker} = useContext(WorkerContext)
    let {setImages,uploadImage} = useContext(ImageContext)
    let {token,generateUser} = useContext(UserContext)
    let {SnackbarOpen,displaySnackbar,closeSnackbar,SnackbarMessage,SnackbarSuccess} = useContext(SnackbarContext)
    const [selectedFile,setSelectedFile] = useState();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    async function onSubmit(data) {
        let name = data.name
        try {
          if (!name.includes(" ")) {
            displaySnackbar("A névnek két részből kell állnia!",false)
          } else {
            const response = await addWorker(data)
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
            
          const fullName = response.data.name.trim(); 
          const nameParts = fullName.split(" "); 
          const lastName = removeAccents(nameParts[0]).toLowerCase();
          const firstNameInitial = removeAccents(nameParts[nameParts.length - 1].charAt(0)).toLowerCase();
          const formattedUsername = `${lastName}${firstNameInitial}`;
             const userData = {
              "username":formattedUsername,
              "password":data.password,
              "role":response.data.title,
              "status":"User is currently online",
              "worker_id":response.data.workerId
            }
            generateUser(userData,token)
            displaySnackbar("Dolgozó hozzáadva!",true)
            getWorkers()
            close()
        } 
      } catch (error) {
          displaySnackbar("Hiba a dolgozó hozzáadásakor!",false)
        } 
      }
      
    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        setSelectedFile(file)
      };
      
    return (
        <div className={styles.modalworker}>
        <h3 className={styles.hiremaintext}>Új dolgozó felvétele</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth className={styles.workerform}>  
            <TextField  name='name'  id="outlined-basic" label="Név" variant="outlined" required {...register("name",{required:true})}
            />
            <TextField  name='name'  id="outlined-basic" label="Jelszó" variant="outlined" type='password' required {...register("password",{required:true})}
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