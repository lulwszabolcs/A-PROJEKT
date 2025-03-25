  import * as React from 'react';
  import Box from '@mui/material/Box';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import Button from '@mui/material/Button';
  import Typography from '@mui/material/Typography';
  import InfoIcon from '@mui/icons-material/Info';
  import styles from "./WorkerInfoBox.module.css"
  import WorkerDetails from './WorkerDetails/WorkerDetails';
  import { MenuItem, Modal, Select, useMediaQuery } from '@mui/material';
  import { useState,useEffect, useContext} from 'react';
  import { RoleProvider } from '../../../contexts/RoleProvider';
  import Fab from '@mui/material/Fab';
  import AddIcon from '@mui/icons-material/Add';
  import AddWorker from './AddWorker/AddWorker';
  import { WorkerContext } from '../../../contexts/WorkerProvider';
  import { ImageContext } from '../../../contexts/ImageProvider';
  import SnackbarComponent from "../../Snackbar/SnackbarComponent";
  import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import { UserContext } from '../../../contexts/UserProvider';

  export default function WorkerInfoBox({canAddWorkerInitial}) {
      let {getImages,pickImageForWorker} = useContext(ImageContext)
      let {workers,getWorkers} = useContext(WorkerContext)
      let {SnackbarOpen,closeSnackbar,SnackbarMessage,SnackbarSuccess} = useContext(SnackbarContext)
      let {checkIfUserHasPermission} = useContext(UserContext)

      const [openWorkerDetails,setOpenWorkerDetails] = useState(false)
      const [openAddWorker,setOpenAddWorker] = useState(false)
      const [selectedRole,setSelectedRole] = useState()
      const [selectedWorker,setSelectedWorker] = useState()
      const [imageUrls, setImageUrls] = useState({});
      const isMobile = useMediaQuery('(max-width: 1024px)');

      const [canAddWorker,setCanAddWorker] = useState(canAddWorkerInitial||false)
      const [canEditWorker,setCanEditWorker] = useState(false)

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
      checkIfUserHasPermission("CREATE_WORKER").then(permission =>{
        setCanAddWorker(permission)
      })
      checkIfUserHasPermission("UPDATE_WORKER").then(permission =>{
        setCanEditWorker(permission)
      })
    },[])

    const filteredWorkers = selectedRole && selectedRole != "all"
      ? workers.filter((worker) => worker.title === selectedRole)
      : workers;
      useEffect(() => {
        const loadImages = async () => {
          const urls = {};
          for (const worker of workers) {
            urls[worker.workerId] = await pickImageForWorker(worker.workerId);
          }
          setImageUrls(urls);
        };
    
        if (workers.length > 0) {
          loadImages();
        }
      }, [workers,pickImageForWorker]);

    return (
      <>
      <h1 className={styles.workermaintext}>Dolgozók kezelése</h1>
      <div className={styles.filtercontainer}>
      <Select 
          sx={{width: isMobile ? '40vw' : '20vw'}}
          labelId="demo-simple-select"
          id="demo-simple-select"
          onChange={handleChange}
          defaultValue={"all"}
          data-testid={"selectRole"}
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
              gap: isMobile? '50px':'4vw '
            }}>
              {filteredWorkers.map((worker)=>( 
                <Card variant="outlined" data-testid={"workerCard"} style={{paddingTop:10,position:'relative',boxShadow:'5px 5px 5px 5px rgba(173, 216, 230, 0.616)',width:'15rem'}}>
                <CardContent>
                <Button style={{position:'absolute',top:0,right:0}} onClick={()=>{setOpenWorkerDetails(true);setSelectedWorker(worker)}} ><InfoIcon data-testid={"detailIcon"}></InfoIcon></Button>
                <img src={imageUrls[worker.workerId]} style={{width:150, height:150, borderRadius:100}}></img>
                <Typography variant="h6" component="div">
                  {worker.name}
                </Typography>
                <Typography sx={{color: 'text.secondary', marginBottom:1}}>{worker.title}</Typography>
              </CardContent>
                </Card>
              ))}  
          </Box>
          <Modal open={openWorkerDetails} className={styles.flexcenter}>
            <RoleProvider>
            <WorkerDetails close={closeWorkerDetails} worker={selectedWorker} canEditWorker={canEditWorker} ></WorkerDetails>
            </RoleProvider>
          </Modal>
          <Modal open={openAddWorker} className={styles.flexcenter}>
            <RoleProvider>
            <AddWorker close={closeAddWorker}></AddWorker>
            </RoleProvider>
          </Modal>
            {canAddWorker &&
          <div className={styles.addicon}>
          <Fab color="primary" aria-label="add" data-testid={"addIcon"} onClick={()=>setOpenAddWorker(true)}>
              <AddIcon/>
          </Fab>
          </div>
          }
        <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess}/>
      </>
    );
  }
