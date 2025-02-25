import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, SnackbarContent } from '@mui/material';
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TypeContext, TypeProvider } from '../../../contexts/TypeProvider';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { ProblemContext } from '../../../contexts/ProblemProvider';
import { UserContext } from '../../../contexts/UserProvider';

export default function ErrorList() {
  let {SnackbarOpen,displaySnackbar,closeSnackbar,SnackbarMessage} = useContext(SnackbarContext)
  let {problems,deleteSelectedProblem,closeSelectedProblem,problemColorPicker} = useContext(ProblemContext)
  let {userProfile} = useContext(UserContext)
  const [IsaddNewProblemOpen,setIsAddNewProblemOpen] = useState(false);
  const [IsEditModalOpen,setIsEditModalIOpen] = useState(false);
  const [currentProb,setCurrentProb] = useState([]);

  const [seeClosedProblems,setSeeClosedProblems] = useState(false);
  const [onlySeeClosedProblems,setOnlySeeClosedProblems] = useState(false);
  const [openDialog,setOpenDialog] = useState(false)
  const openDialogBox = () =>{
      setOpenDialog(true)
  }
  const closeDialog = () =>{
      setOpenDialog(false)
  }
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
  
  function showClosedProblenms() {
    setSeeClosedProblems(true)
  }
  const handleCheckboxChange = (event) => {
    setSeeClosedProblems(event.target.checked);
  };
  const handleRoleCheckboxChange = (event) => {
    console.log(userProfile.role)
    setOnlySeeClosedProblems(event.target.checked);
  };
  return (
    <>
        <div className='table-container'>
        <h1 className='error-primary-text'>Folyamatban lévő hibák</h1>
        <div className='checkBoxErrors'>
        <FormControlLabel control={<Checkbox checked={seeClosedProblems} onChange={handleCheckboxChange}/>} label="Megoldott problémák mutatása" style={{fontSize:10}}/>
        <FormControlLabel control={<Checkbox/>} checked={onlySeeClosedProblems} onChange={handleRoleCheckboxChange} label="Beosztáshoz tartozó problémák" style={{fontSize:10}}/>
        </div>
        <TableContainer component={Paper} className='problemstable'>
        <Table>
          <TableHead className='fixedtable'>
            <TableRow>
              <TableCell>Név</TableCell>
              <TableCell>Leírás</TableCell>
              <TableCell >Hozzáadva</TableCell>
              <TableCell>Típus</TableCell>
              <TableCell>Hibakód</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {problems
  .sort((a, b) => {
    if (a.status === "Függőben" && b.status !== "Függőben") return -1;
    if (a.status !== "Függőben" && b.status === "Függőben") return 1;
    return 0;
  })
  .filter((problem) => seeClosedProblems || problem.status === "Függőben")
  .filter((problem) => !
  onlySeeClosedProblems || problem.role === userProfile.role)
  .map((problem) => (
    <TableRow key={problem.problemId}>
      <TableCell style={{ fontStyle: problem.status === "Lezárva" ? "italic" : "normal" }}>
        {problem.name}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "Lezárva" ? "italic" : "normal" }}>
        {problem.description}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "Lezárva" ? "italic" : "normal"}}>
        {problem.datum}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "Lezárva" ? "italic" : "normal",color: problemColorPicker(problem.problemType)}}>
      <div style={{ 
        display: "inline-block", 
        padding: "6px", 
        border: `1px solid ${problemColorPicker(problem.problemType)}`,
        borderRadius:'8px',
      }}>
        {problem.problemType}
  </div>
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "Lezárva" ? "italic" : "normal" }}>
        {problem.problemId}
      </TableCell>
      <TableCell>
        {problem.status !== "Lezárva" && (
          <>
            <Button onClick={() => openEditModal(problem)}>
              <CreateIcon />
            </Button>
            
            <Button
              onClick={() => {
                openDialogBox();
                setCurrentProb(problem);
                }}>
              <DeleteIcon />
            </Button>
              <Button onClick={() => closeSelectedProblem(problem.problemId)}>
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
          <Addproblem close={closeAddProblemModal} displaySnackbar={displaySnackbar}></Addproblem>
          </TypeProvider>
          </LocalizationProvider>
        </Modal>
            </div>
            <Modal open={IsEditModalOpen} className='flexcenter'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditProblem close={closeEditModal} problem={currentProb} displaySnackbar={displaySnackbar}></EditProblem>
          </LocalizationProvider>
        </Modal>
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
          <Button onClick={()=>{deleteSelectedProblem(currentProb.problemId);closeDialog()}} autoFocus>
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar}/>
        </>
    )
  }