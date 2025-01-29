import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios'
import './ErrorList.css';
import Addproblem from '../AddProblem/Addproblem';
import EditProblem from '../EditProblem/EditProblem';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TypeContext, TypeProvider } from '../../../contexts/TypeProvider';

export default function ErrorList() {
  let {problemTypes} = useContext(TypeContext)
  const [problems,setProblems] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/problem').then(({data})=>{
    const problems = data
    setProblems(problems)
    }).catch((error)=>{
      console.log(error)
    })
      },[])
function refreshProblemList() {
  axios.get("http://localhost:8080/api/problem")
      .then((response) => {
          setProblems(response.data);
      })
      .catch((error) => {
          console.error("Failed to fetch problems:", error);
      });
}

  const [IsaddNewProblemOpen,setIsAddNewProblemOpen] = useState(false);
  const [IsEditModalOpen,setIsEditModalIOpen] = useState(false);
  const [currentProb,setCurrentProb] = useState([]);

  const [snackbarOpen,setSnackbarOpen] = useState(false);
  const [snackbarMessage,setSnackbarMessage] = useState();
  const [seeClosedProblems,setSeeClosedProblems] = useState(false);
  const openSnackbar = (message) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  }
  const closeSnackbar = () =>{
    setSnackbarOpen(false)
  }
  const [openDialog,setOpenDialog] = useState(false)
  const openDialogBox = () =>{
      setOpenDialog(true)
  }
  const closeDialog = () =>{
      setOpenDialog(false)
  }
  const [state, setState] = useState({
    open: false,
    Transition: Slide,
  });
  function closeAddProblemModal() {
    setIsAddNewProblemOpen(false)
  }
  function openEditModal(problem) {
    setIsEditModalIOpen(true);   
    setCurrentProb(problem);       
  }
  function closeEditModal() {
    setIsEditModalIOpen(false)
  }
  function deleteSelectedProblem(id) {
      axios.delete(`http://localhost:8080/api/problem/${id}`).then(refreshProblemList,openSnackbar("Hiba sikeresen törölve!"),closeDialog()).catch((error)=>{console.log(error)})
  }
  function showClosedProblenms() {
    setSeeClosedProblems(true)
  }
  const handleCheckboxChange = (event) => {
    setSeeClosedProblems(event.target.checked);
  };
  function handleStatusChange(problem) {
    axios.patch(`http://localhost:8080/api/problem/${problem.problemId}`,{"key": "STATUS","value":"CLOSED"}).then(()=>{
      refreshProblemList();
  }).catch((error)=>{
      alert(error.message);
  })
  }
    return (
      // beosztáshoz tartozó problémák megoldása
        <>
        <div className='table-container'>
        <h1 className='error-primary-text'>Folyamatban lévő hibák</h1>
        <div className='checkBoxErrors'>
        <FormControlLabel control={<Checkbox checked={seeClosedProblems} onChange={handleCheckboxChange}/>} label="Megoldott problémák mutatása" style={{fontSize:10}}/>
        <FormControlLabel control={<Checkbox/>} label="Beosztáshoz tartozó problémák" style={{fontSize:10}}/>
        </div>
        <TableContainer component={Paper} style={{minWidth:"100px", maxWidth:'70vw' , marginLeft:'auto', marginRight:'auto', marginBottom:'20px'}}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Név</TableCell>
              <TableCell>Leírás</TableCell>
              <TableCell>Hozzáadva</TableCell>
              <TableCell>Hibakód</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {problems
  .sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    return 0;
  })
  .filter((problem) => seeClosedProblems || problem.status === "PENDING")
  .map((problem) => (
    <TableRow key={problem.problemId}>
      <TableCell style={{ fontStyle: problem.status === "CLOSED" ? "italic" : "normal" }}>
        {problem.name}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "CLOSED" ? "italic" : "normal" }}>
        {problem.description}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "CLOSED" ? "italic" : "normal" }}>
        {problem.datum}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "CLOSED" ? "italic" : "normal" }}>
        {problem.problemId}
      </TableCell>
      <TableCell>
        {problem.status !== "CLOSED" && (
          <>
            <Button onClick={() => openEditModal(problem)}>
              <CreateIcon />
            </Button>
            
            <Button
              onClick={() => {
                openDialogBox();
                setCurrentProb(problem);}}>
              <DeleteIcon />
            </Button>
              <Button onClick={() => handleStatusChange(problem)}>
              <CheckIcon />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  ))}

          </TableBody>
        </Table>
        
      </TableContainer>
      <div className='fabicon'>
        <Fab color="primary" aria-label="add" onClick={()=>setIsAddNewProblemOpen(true)}>
          <AddIcon />
        </Fab>
        </div>
        <Modal open={IsaddNewProblemOpen} className='flexcenter'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TypeProvider>
          <Addproblem close={closeAddProblemModal} refreshProblems={refreshProblemList} displaySnackbar={openSnackbar}></Addproblem>
          </TypeProvider>
          </LocalizationProvider>
        </Modal>
        
            </div>
            <Modal open={IsEditModalOpen} className='flexcenter'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditProblem close={closeEditModal} problem={currentProb} refreshProblems={refreshProblemList} displaySnackbar={openSnackbar} types={problemTypes}></EditProblem>
          </LocalizationProvider>
        </Modal>
        <Snackbar
        ContentProps={{
          sx: {
            background: "#4BB543",
            marginLeft:8
          }
        }}
          open={snackbarOpen}
          onClose={closeSnackbar}
          TransitionComponent={state.Transition}
          message={snackbarMessage}
          key={state.Transition.name}
          autoHideDuration={1200}
        />
        <Dialog
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Biztosan törli a kiválasztott hibát?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>Mégsem</Button>
          <Button onClick={()=>{deleteSelectedProblem(currentProb.problemId)}} autoFocus>
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}