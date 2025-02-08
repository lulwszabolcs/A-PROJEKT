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

export default function ErrorList() {
  let {problemTypes} = useContext(TypeContext)
  let {SnackbarOpen,displaySnackbar,closeSnackbar,SnackbarMessage} = useContext(SnackbarContext)
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

  const [seeClosedProblems,setSeeClosedProblems] = useState(false);
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
  const problemTypeConverter = (problemType) => {
    let result = problemTypes.find((x)=> x.problemTypeName === problemType)
    if (result) {
      return result.problemTypeDescription
    }
  }
  const problemColorPicker = (problemType) => {
    let color = "";
    switch (problemType) {
      case "Berendezés meghibásodása":
      case "Kommunikációs hiba":
      case "Navigációs hiba":
      case "Légi forgalomirányítási hiba":
      case "Rendszerhiba":
        color = "purple";
        break;

      case "Üzemanyag szivárgás":
      case "Üzemanyag ellátási probléma":
      case "Üzemanyag teherautó késés":
        color = "#f08737";
        break;

      case "Áramszünet":
      case "Világítási hiba":
      case "Biztonsági rendszer hiba":
      case "Rádió meghibásodás":
        color = "#d1ce0f";
        break;

      case "Kifutópálya akadály":
      case "Kifutó pálya repedés":
      case "Madárütközés":
      case "Kifutó pálya túlfutás":
      case "Járműhiba":
        color = "gray";
        break;

      case "Időjárási zavar":
      case "Jégtelenítési probléma":
      case "Hóeltakarítási probléma":
        color = "blue";
        break;

      case "Elveszett poggyász":
      case "Vámdelay":
      case "Check-in hiba":
      case "Beszállási késés":
      case "Poggyászátvilágítási hiba":
        color = "brown";
        break;

      case "Tűzriadó":
      case "Mellékhelyiség meghibásodás":
      case "Elveszett gyermek":
      case "Fűtési hiba":
      case "Hűtési hiba":
      case "Illetéktelen személy":
      case "Vészkijárat probléma":
        color = "red";
        break;

      case "Jegykezelési hiba":
      case "Orvosi vészhelyzet":
      case "Parkolóhely hiány":
      case "Rakomány biztonsági rés":
        color = "#ff14b5";
        break;
      default:
        color = "#0fe6fa";
        break;
    }
    return color;
};
  function deleteSelectedProblem(id) {
      axios.delete(`http://localhost:8080/api/problem/${id}`).then(refreshProblemList,closeDialog()).catch((error)=>{console.log(error)})
      displaySnackbar("Hiba sikeresen törölve!")
  }
  function showClosedProblenms() {
    setSeeClosedProblems(true)
  }
  const handleCheckboxChange = (event) => {
    setSeeClosedProblems(event.target.checked);
  };
  function handleStatusChange(problem) {
    axios.patch(`http://localhost:8080/api/problem/${problem.problemId}`,{"key": "STATUS","value":"CLOSED"}).then(()=>{
      displaySnackbar("Hiba sikeresen lezárva!")
      refreshProblemList();
  }).catch((error)=>{
      alert(error.message);
  })

  

  }
    return (
        <>
        <div className='table-container'>
        <h1 className='error-primary-text'>Folyamatban lévő hibák</h1>
        <div className='checkBoxErrors'>
        <FormControlLabel control={<Checkbox checked={seeClosedProblems} onChange={handleCheckboxChange}/>} label="Megoldott problémák mutatása" style={{fontSize:10}}/>
        <FormControlLabel control={<Checkbox/>} label="Beosztáshoz tartozó problémák" style={{fontSize:10}}/>
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
      <TableCell style={{ fontStyle: problem.status === "CLOSED" ? "italic" : "normal"}}>
        {problem.datum}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status === "CLOSED" ? "italic" : "normal",color: problemColorPicker(problemTypeConverter(problem.problemType))}}>
      <div style={{ 
            display: "inline-block", 
            padding: "6px", 
            border: `1px solid ${problemColorPicker(problemTypeConverter(problem.problemType))}`,
            borderRadius:'8px',
      }}>
            {problemTypeConverter(problem.problemType)}
  </div>
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
          <Addproblem close={closeAddProblemModal} refreshProblems={refreshProblemList} displaySnackbar={displaySnackbar}></Addproblem>
          </TypeProvider>
          </LocalizationProvider>
        </Modal>
        
            </div>
            <Modal open={IsEditModalOpen} className='flexcenter'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditProblem close={closeEditModal} problem={currentProb} refreshProblems={refreshProblemList} displaySnackbar={displaySnackbar} types={problemTypes}></EditProblem>
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
          <Button onClick={()=>{deleteSelectedProblem(currentProb.problemId)}} autoFocus>
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar}/>
        </>
    )
}