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
import { InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useFetcher } from 'react-router-dom';
import { RoleProvider } from '../../../contexts/RoleProvider';
export default function WorkerInfoBox() {
    const [workers,setWorkers] = useState([]);
    const [openWorkerDetails,setOpenWorkerDetails] = React.useState(false)
    const [selectedRole,setSelectedRole] = React.useState()
    const [selectedWorker,setSelectedWorker] = useState()
    function closeWorkerDetails() {
        setOpenWorkerDetails(false)
    }
  function fetchWorkers() {
    axios.get("http://localhost:8080/worker/list").then(({data})=>{
        setWorkers(data)
      }).catch((error)=>{
      console.log(error);
    })
  }
   const handleChange = (event) => {
      setSelectedRole(event.target.value);
      console.log(selectedRole);
}
  useEffect(()=>{
    fetchWorkers();
  },[])
  const filteredWorkers = selectedRole && selectedRole != "all"
    ? workers.filter((worker) => worker.title === selectedRole)
    : workers;
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
    gap: '40px', // A belső div helyett itt állítsd be a távolságot
  }}>
      {filteredWorkers.map((worker)=>(
        <Card variant="outlined" style={{paddingTop:10,position:'relative'}}>
        <CardContent>
        <Button style={{position:'absolute',top:0,right:0}} onClick={()=>{setOpenWorkerDetails(true);setSelectedWorker(worker)}}><InfoIcon></InfoIcon></Button>
        <img src={`./images/${worker.workerId}.jpg`} style={{width:150, height:150, borderRadius:100}}></img>
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
    </>
  );
}
