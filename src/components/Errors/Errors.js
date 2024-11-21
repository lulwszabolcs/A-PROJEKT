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
import { useEffect, useState } from 'react';
import Addproblem from './AddProblem/Addproblem';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import EditProblem from './EditProblem/EditProblem';
import axios from 'axios'
import ErrorList from './ErrorList/ErrorList';
export default function Errors() {


    return (
        <>
        <MiniDrawer></MiniDrawer>
        <ErrorList></ErrorList>
            
        </>
    )
}