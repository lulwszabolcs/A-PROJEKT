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
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios'
import './ErrorList.css';
import Addproblem from '../AddProblem/Addproblem';
import EditProblem from '../EditProblem/EditProblem';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

export default function ErrorList() {
    const [problems,setProblems] = useState([]);
useEffect(()=>{
  axios.get('http://localhost:8080/api/problem').then(({data})=>{
    const problems = data
    setProblems(problems)
    console.log(problems);
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
    const openSnackbar = (message) => {
      setSnackbarMessage(message)
      setSnackbarOpen(true)
    }
    const closeSnackbar = () =>{
      setSnackbarOpen(false)
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
        axios.delete(`http://localhost:8080/api/problem/${id}`).then(refreshProblemList,openSnackbar("Hiba sikeresen törölve!")).catch((error)=>{console.log(error)})
    }
    return (
        <>
        <div className='table-container'>
        <h1 className='error-primary-text'>Folyamatban lévő hibák</h1>
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
            {problems.map((problem)=>(
                <TableRow key={problem.problemId}>
                <TableCell >{problem.name}</TableCell>
                <TableCell >{problem.description}</TableCell>
                <TableCell >{problem.datum}</TableCell>
                <TableCell >{problem.problemId}</TableCell>
                <TableCell >
                    <Button onClick={()=> openEditModal(problem)}><CreateIcon/></Button>
                    <Button onClick={() => deleteSelectedProblem(problem.problemId)}><DeleteIcon/></Button>
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
          <Addproblem close={closeAddProblemModal} refreshProblems={refreshProblemList}></Addproblem>
          </LocalizationProvider>
        </Modal>
        
            </div>
            <Modal open={IsEditModalOpen} className='flexcenter'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditProblem close={closeEditModal} problem={currentProb} refreshProblems={refreshProblemList}></EditProblem>
          </LocalizationProvider>
        </Modal>
        <Snackbar
        ContentProps={{
          sx: {
            background: "lightgreen"
          }
        }}
          open={snackbarOpen}
          onClose={closeSnackbar}
          TransitionComponent={state.Transition}
          message={snackbarMessage}
          key={state.Transition.name}
          autoHideDuration={1200}
        />
        </>
    )
}