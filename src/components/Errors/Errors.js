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
import MiniDrawer from '../Sidebar/Sidebar';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import './Errors.css'
import { useState } from 'react';
import Addproblem from './AddProblem/Addproblem';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditProblem from './EditProblem/EditProblem';
export default function Errors() {
    const problems = [
        {
        name: "Lebomlott plafon",
        desc: "Lebomlott a palfon",
        date: "2022-02-22",
        id: 1
        },
        {
        name: "Lebomlott fal",
        desc: "Lebomlott a palfon",
        date: "2022-02-22",
        id: 2
        },
        {
        name: "Lebomlott csempe",
        desc: "Lebomlott a palfon",
        date: "2022-02-22",
        id: 3
        },
        {
        name: "Lebomlott csempe",
        desc: "Lebomlott a palfon",
        date: "2022-02-22",
        id: 4
        },
        {
        name: "Lebomlott csempe",
        desc: "Lebomlott a palfon",
        date: "2022-02-22",
        id: 5
        }
]
    const [IsaddNewProblemOpen,setIsAddNewProblemOpen] = useState(false);
    const [IsEditModalOpen,setIsEditModalIOpen] = useState(false);
    function closeAddProblemModal() {
      setIsAddNewProblemOpen(false)
    }
    function closeEditModal() {
      setIsEditModalIOpen(false)
    }

    return (
        <>
        <MiniDrawer></MiniDrawer>
        
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
                <TableRow key={problem.id}>
                <TableCell >{problem.name}</TableCell>
                <TableCell >{problem.desc}</TableCell>
                <TableCell >{problem.date}</TableCell>
                <TableCell >{problem.id}</TableCell>
                <TableCell >
                    <Button onClick={()=>setIsEditModalIOpen(true)}><CreateIcon/></Button>
                    <Button><DeleteIcon/></Button>
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
          <Addproblem close={closeAddProblemModal}></Addproblem>
          </LocalizationProvider>
        </Modal>
        <Modal open={IsEditModalOpen} className='flexcenter'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EditProblem close={closeEditModal} problem={problems[1]}></EditProblem>
          </LocalizationProvider>
        </Modal>
            </div>
            
        </>
    )
}