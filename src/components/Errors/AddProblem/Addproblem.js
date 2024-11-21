import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import './Addproblem.css'
import { useState } from 'react';
import Errors from '../Errors';
export default function Addproblem({close,refreshProblems}) {
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
        name:null,
        description:null,
        datum:null
    })
    const handleChange = (event) => { 
        const { name, value } = event.target; 
        setFormData((prevData) => ({ ...prevData, [name]: value,datum: formatDate(new Date)})); 
        console.log(formData);
    }
    const [problems,setProblems] = useState([]);
    function addNewProblem() {
        axios.post('http://localhost:8080/api/problem',formData).then(()=>{
            refreshProblems()
            close()
        }).catch((error)=>{
            alert(error.message);
        })
    }
    return (
        <div className='addError-container'>
            <h3 style={{textAlign:'center'}}>Új probléma hozzáadása</h3>
            <FormControl fullWidth className='addError-form'>

                    
                     
                <TextField onInput={handleChange} name='name'  id="outlined-basic" label="Név" variant="outlined" />
                <TextField onInput={handleChange} name='description'  id="outlined-basic" label="Leírás" variant="outlined" />



                <Stack spacing={40} direction="row">
                        <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                        <Button variant="contained" onClick={addNewProblem}>Mentés</Button>
                </Stack>

            </FormControl>


        </div>
    )
}