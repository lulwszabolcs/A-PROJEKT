import styles from "./ErrorList.module.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Card} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Addproblem from '../AddProblem/Addproblem';
import EditProblem from '../EditProblem/EditProblem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SnackbarContext } from '../../../contexts/SnackbarProvider';
import SnackbarComponent from '../../Snackbar/SnackbarComponent';
import { ProblemContext } from '../../../contexts/ProblemProvider';
import { UserContext } from '../../../contexts/UserProvider';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function ErrorList({canUpdateProblemInitial,canDeleteProblemInitial,canCreateProblemInitial,canCloseProblemInitial}) {
  let {SnackbarOpen,closeSnackbar,SnackbarMessage} = useContext(SnackbarContext)
  let {problems,deleteSelectedProblem,closeSelectedProblem,problemColorPicker} = useContext(ProblemContext)
  let {userProfile,checkIfUserHasPermission} = useContext(UserContext)

  const [IsaddNewProblemOpen,setIsAddNewProblemOpen] = useState(false);
  const [IsEditModalOpen,setIsEditModalIOpen] = useState(false);
  const [currentProb,setCurrentProb] = useState([]);
  const [seeClosedProblems,setSeeClosedProblems] = useState(false);
  const [onlySeeClosedProblems,setOnlySeeClosedProblems] = useState(false);
  const [openDialog,setOpenDialog] = useState(false)

  const [canUpdateProblem,setCanUpdateProblem] = useState(canUpdateProblemInitial || false)
  const [canDeleteProblem,setCanDeleteProblem] = useState(canDeleteProblemInitial || false)
  const [canCreateProblem,setCanCreateProblem] = useState(canCreateProblemInitial || false)
  const [canCloseProblem,setCanCloseProblem] = useState(canCloseProblemInitial || false)

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
  
  const handleCheckboxChange = (event) => {
    setSeeClosedProblems(event.target.checked);
  };
  const handleRoleCheckboxChange = (event) => {
    setOnlySeeClosedProblems(event.target.checked);
  };
  useEffect(()=>{
    checkIfUserHasPermission("UPDATE_PROBLEM").then(permission =>{
      setCanUpdateProblem(permission)
    })
    checkIfUserHasPermission("DELETE_PROBLEM").then(permission =>{
      setCanDeleteProblem(permission)
    })
    checkIfUserHasPermission("CREATE_PROBLEM").then(permission =>{
      setCanCreateProblem(permission)
    })
    checkIfUserHasPermission("MODIFY_PROBLEM_STATUS").then(permission =>{
      setCanCloseProblem(permission)
    })
  },[])
  return (
    <>
        <div className={styles.tablecontainer}>
        <h1 className={styles.errorprimarytext}>Folyamatban lévő hibák</h1>
        <div className={styles.checkBoxErrors}>
        <FormControlLabel control={<Checkbox checked={seeClosedProblems} onChange={handleCheckboxChange}/>} label="Megoldott problémák mutatása" style={{fontSize:10}} data-testid={"filterClosed"}
        />
        <FormControlLabel control={<Checkbox/>} checked={onlySeeClosedProblems} onChange={handleRoleCheckboxChange} label="Beosztáshoz tartozó problémák" style={{fontSize:10}} data-testid={"filterByRole"}
        />
        </div>
        <TableContainer component={Paper} className={styles.problemstable} data-testid={"problemTable"}>
        <Table>
          <TableHead className={styles.fixedtable}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Név</TableCell>
              <TableCell>Leírás</TableCell>
              <TableCell >Hozzáadva</TableCell>
              <TableCell>Típus</TableCell>
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
      <TableCell style={{ fontStyle: problem.status !== "Függőben" ? "italic" : "normal" }}>
        {problem.problemId}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status !== "Függőben" ? "italic" : "normal" }}>
        {problem.name}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status !== "Függőben" ? "italic" : "normal" }}>
        {problem.description}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status !== "Függőben" ? "italic" : "normal"}}>
        {problem.date}
      </TableCell>
      <TableCell style={{ fontStyle: problem.status !== "Függőben" ? "italic" : "normal",color: problemColorPicker(problem.problemType)}}>
      <div style={{ 
        display: "inline-block", 
        padding: "6px", 
        border: `1px solid ${problemColorPicker(problem.problemType)}`,
        borderRadius:'8px',
      }}>
        {problem.problemType}
  </div>
      </TableCell>
      <TableCell>
        {problem.status !== "Lezárva" && (
          <>
              { canUpdateProblem && (
                <Button onClick={() => openEditModal(problem)}>
                  <CreateIcon data-testid={"updateIcon"}/>
                </Button>
              ) }
              {canDeleteProblem &&
                  (<Button
                    onClick={() => {
                      openDialogBox();
                      setCurrentProb(problem);
                      }}>
                    <DeleteIcon data-testid={"deleteIcon"} />
                  </Button>)
              }
              {canCloseProblem &&
              <Button onClick={() => closeSelectedProblem(problem.problemId)}>
              <CheckIcon data-testid={"closeIcon"} />
            </Button>
              }
          </>
        )}
      </TableCell>
    </TableRow>
  ))}
          </TableBody>
        </Table>
      </TableContainer>
<div className={styles.problemcardcontainer}>

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
  <Card sx={{ minWidth: 275 }} style={{fontStyle: problem.status === "Lezárva" ? "italic" : "normal"}} elevation={5} className={styles.problemcard}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          #{problem.problemId}
        </Typography>
        <Typography variant="h5" component="div">
          {problem.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{problem.date}</Typography>
        <div style={{ 
        display: "inline-block", 
        padding: "6px", 
        border: `1px solid ${problemColorPicker(problem.problemType)}`,
        color:`${problemColorPicker(problem.problemType)}`,
        borderRadius:'8px',
        marginBottom:'14px'
        }}>
            {problem.problemType}
              </div>
              <Typography variant="body2">
                {problem.description}
              </Typography>
            </CardContent>
            <CardActions>
            {problem.status !== "Lezárva" && (
                <>
                  {canUpdateProblem && <Button onClick={() => openEditModal(problem)}>
                    <CreateIcon />
                  </Button>}
                  {canDeleteProblem &&
                  <Button
                    onClick={() => {
                      openDialogBox();
                      setCurrentProb(problem);
                      }}>
                    <DeleteIcon />
                  </Button>
}                   {canCloseProblem &&
                    <Button onClick={() => closeSelectedProblem(problem.problemId)}>
                    <CheckIcon />
                  </Button>
                    }
                </>
        )}
      </CardActions>
    </Card>
  ))}
  </div>
        {canCreateProblem &&
      <div className={styles.fabicon}>
        <Fab color="primary" aria-label="add" onClick={()=>setIsAddNewProblemOpen(true)}>
          <AddIcon data-testid={"addIcon"} />
        </Fab>
        </div>
        }
        <Modal open={IsaddNewProblemOpen} className={styles.flexcenter}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Addproblem close={closeAddProblemModal} ></Addproblem>
          </LocalizationProvider>
        </Modal>
            </div>
            <Modal open={IsEditModalOpen} className={styles.flexcenter}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditProblem close={closeEditModal} problem={currentProb}></EditProblem>
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