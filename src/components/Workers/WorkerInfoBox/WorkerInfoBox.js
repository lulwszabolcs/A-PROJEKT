  import * as React from 'react';
  import Box from '@mui/material/Box';
  import Card from '@mui/material/Card';
  import CardActions from '@mui/material/CardActions';
  import CardContent from '@mui/material/CardContent';
  import Button from '@mui/material/Button';
  import Typography from '@mui/material/Typography';
  import InfoIcon from '@mui/icons-material/Info';
  import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
  import styles from './WorkerInfoBox.css'
  import WorkerDetails from './WorkerDetails/WorkerDetails';
  import { InputLabel, MenuItem, Modal, Select, SnackbarContent, useColorScheme } from '@mui/material';
  import { useState,useEffect, useContext} from 'react';
  import axios from 'axios';
  import { useFetcher } from 'react-router-dom';
  import { RoleProvider } from '../../../contexts/RoleProvider';
  import Fab from '@mui/material/Fab';
  import AddIcon from '@mui/icons-material/Add';
  import AddWorker from './AddWorker/AddWorker';
  import { WorkerContext } from '../../../contexts/WorkerProvider';
  import { ImageContext } from '../../../contexts/ImageProvider';
import SnackbarComponent from "../../Snackbar/SnackbarComponent";
import { SnackbarContext } from '../../../contexts/SnackbarProvider';

  export default function WorkerInfoBox() {
      let {images,getImages} = useContext(ImageContext)
      const [openWorkerDetails,setOpenWorkerDetails] = useState(false)
      const [openAddWorker,setOpenAddWorker] = useState(false)
      const [selectedRole,setSelectedRole] = useState()
      const [selectedWorker,setSelectedWorker] = useState()
      let {workers,getWorkers} = useContext(WorkerContext)
      let {SnackbarOpen,closeSnackbar,SnackbarMessage,SnackbarSuccess} = useContext(SnackbarContext)
      function closeWorkerDetails() {
          setOpenWorkerDetails(false)
      }
    const handleChange = (event) => {
        setSelectedRole(event.target.value);
        console.log(selectedRole);
      }
      const closeAddWorker = () => {
        setOpenAddWorker(false)
      }
    useEffect(()=>{
      getWorkers()
      getImages()
    },[])
    const filteredWorkers = selectedRole && selectedRole != "all"
      ? workers.filter((worker) => worker.title === selectedRole)
      : workers;
      function findImage(worker) {
        let result = images.find(
          (x) => x.worker_id === worker.workerId
        );
        if (result && result.imageName) {
          return result.imageName; 
        }
      
        return null;
      }
    return (
      <>
      <h1 className='worker-main-text'>Dolgozók kezelése</h1>
      <div style={{marginLeft:'10vw',marginBottom:'10vh'}}>
      <Select style={{width:'20vw'}}
      labelId="demo-simple-select"
      id="demo-simple-select"
      onChange={handleChange}
      defaultValue={"all"}
    > 
    <MenuItem value={"all"}>
        Minden alkalmazott
      </MenuItem>
      {[...new Set(workers.map((worker) => worker.title))].map((uniqueTitle) => (
      <MenuItem key={uniqueTitle} value={uniqueTitle}>
        {uniqueTitle}
      </MenuItem>
    ))}
    </Select>
      </div>
      <Box 
      sx={{
      marginLeft: '10vw',
      marginBottom: '5vh',
      textAlign: 'center',
      borderRadius: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '40px',
    }}>
        {filteredWorkers.map((worker)=>( 
          <Card variant="outlined" style={{paddingTop:10,position:'relative'}}>
          <CardContent>
          <Button style={{position:'absolute',top:0,right:0}} onClick={()=>{setOpenWorkerDetails(true);setSelectedWorker(worker)}}><InfoIcon></InfoIcon></Button>
          <img src={`http://localhost:8080/images/${findImage(worker)}`} style={{width:150, height:150, borderRadius:100}}></img>
          <Typography variant="h6" component="div">
            {worker.name}
          </Typography>
          <Typography sx={{color: 'text.secondary', marginBottom:1}}>{worker.title}</Typography>
        </CardContent>
          </Card>
        ))}  
        </Box>
      <Modal open={openWorkerDetails} className='flexcenter'>
        <RoleProvider>
        <WorkerDetails close={closeWorkerDetails} worker={selectedWorker} ></WorkerDetails>
        </RoleProvider>
      </Modal>
      <Modal open={openAddWorker} className='flexcenter'>
        <RoleProvider>
        <AddWorker close={closeAddWorker}></AddWorker>
        </RoleProvider>
      </Modal>
      <div className='addicon'>
      <Fab color="primary" aria-label="add" onClick={()=>setOpenAddWorker(true)}>
          <AddIcon/>
      </Fab>

      </div>
        <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/>
      
      </>
    );
  }
