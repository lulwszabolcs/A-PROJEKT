import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import './EditProblem.css';
import { useEffect, useState } from 'react';
import ErrorList from '../ErrorList/ErrorList';
import {MenuItem,Select } from '@mui/material';

export default function EditProblem({close,problem,refreshProblems,displaySnackbar,types}) {
    
    function formatDate(date){
        var d = new Date(date),
        dformat = [d.getFullYear(),
                   d.getMonth()+1,
                   d.getDate()].join('-')+' '+
                  [d.getHours(),
                   d.getMinutes()].join(':');
        return dformat
    }
    const [formData,setFormData] = useState({
        name:problem.name,
        description:problem.description,
        datum:problem.date,
        problemType:problem.problemType,
        status:problem.status
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value,datum: formatDate(new Date)}));     
        console.log(formData)
    };
    function editProblem() {
        axios.put(`http://localhost:8080/api/problem/${problem.problemId}`,formData).then(()=>{
            refreshProblems()
            displaySnackbar("Hiba sikeresen módosítva!")
            close()
        }).catch((error)=>{
            alert(error.message);
        })
    }
    return (
        <div className='editProblem-container'>
            <h3 style={{textAlign:'center'}}>Probléma szerkesztése</h3>
            <FormControl fullWidth className='editError-form'>     
                <TextField onChange={handleChange} defaultValue={problem.name} name='name'  id="outlined-basic" label="Név" variant="outlined" />
                <TextField onChange={handleChange} defaultValue={problem.description} name='description'  id="outlined-basic" label="Leírás" variant="outlined" />
                
                <Select
    labelId="demo-simple-select"
    id="demo-simple-select"
    defaultValue={formData.problemType || ''} 
    onChange={handleChange}
    name='problemType'
>   
    <MenuItem value="" disabled>Típus kiválasztása</MenuItem>
    {types.map((type) => (
        <MenuItem key={type.id} value={type.problemTypeName}>
            {type.problemTypeDescription}
        </MenuItem>
    ))}
</Select>
                <Stack direction="row" justifyContent={"space-between"}>
                        <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                        <Button variant="contained" onClick={editProblem} >Mentés</Button>
                </Stack>
            </FormControl>
        </div>
    )
}