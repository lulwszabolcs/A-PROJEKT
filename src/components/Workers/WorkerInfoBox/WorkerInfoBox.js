import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import './WorkerInfoBox.css';
import WorkerDetails from './WorkerDetails/WorkerDetails';
import { Modal } from '@mui/material';


export default function WorkerInfoBox() {
  const card = (
    <React.Fragment>
      <CardContent>
        <Button style={{position:'absolute',top:0,right:0}} onClick={()=>setOpenWorkerDetails(true)}><InfoIcon></InfoIcon></Button>
        <img src='https://www.opportunityhome.org/wp-content/uploads/2013/03/image-alignment-150x150.jpg' style={{width:150, height:150, borderRadius:100}}></img>
        <Typography variant="h6" component="div">
          Example name
        </Typography>
        <Typography sx={{color: 'text.secondary', marginBottom:1}}>Example role</Typography>
      </CardContent>
    </React.Fragment>
  );
  const [openWorkerDetails,setOpenWorkerDetails] = React.useState(false)
function closeWorkerDetails() {
  setOpenWorkerDetails(false)
}
  return (
    <>
    <Box sx={{ width: 250, marginLeft:20, marginTop:20, textAlign:'center', borderRadius:1}}>
      <Card variant="outlined" style={{paddingTop:10,position:'relative'}}>{card}</Card>
    </Box>
    <Modal open={openWorkerDetails} className='workerdetails_container'>
      <WorkerDetails close={closeWorkerDetails} ></WorkerDetails>
    </Modal>
    </>
  );
}
