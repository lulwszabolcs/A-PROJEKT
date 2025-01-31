import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import styles from './Addproblem.module.css';
import { useContext, useEffect, useState } from 'react';
import {MenuItem,Select } from '@mui/material';
import { useForm } from "react-hook-form"
import { TypeContext } from '../../../contexts/TypeProvider';
export default function Addproblem({close,refreshProblems,displaySnackbar}) {
    let {problemTypes} = useContext(TypeContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
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
    datum:null,
    problemType:null,
    status:'PENDING'
})
const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value,datum: formatDate(new Date)}));     
    console.log(formData)
};
function addNewProblem() {
    axios.post('http://localhost:8080/api/problem',formData).then(()=>{
        refreshProblems()
        displaySnackbar("Hiba hozzádava!")
        close()
    }).catch((error)=>{ 
        alert(error.message);
    })
}
const onSubmit = (data) => {
    setFormData(data);
    addNewProblem();
    console.log(formData)
}
    return (
            <div className={styles.addproblemcontainer}>
                <h3 style={{textAlign:'center'}}>Új probléma hozzáadása</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                <FormControl fullWidth className={styles.addproblemform}>
                    <TextField onInput={handleChange} name='name'  id="outlined-basic" label="Név" variant="outlined" {...register("name",{required:true})} />
                    <TextField onInput={handleChange} name='description'  id="outlined-basic" label="Leírás" variant="outlined" {...register("description",{required:true})}/>
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        onChange={handleChange}
                        name='problemType'
                        defaultValue={'tpus'}
                        >
    <MenuItem value={'tpus'} disabled>Típus kiválasztása</MenuItem>
    {problemTypes.sort().map((type) => (
        <MenuItem key={type.id} value={type.problemTypeName}>
            {type.problemTypeDescription}
        </MenuItem>
    ))}
</Select>

{errors.name && console.log("rq") }
{errors.description && console.log("rq") }
{errors.problemType && console.log("rq") }
                    <Stack spacing={40} direction="row">
                            <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                            <Button variant="contained" type='submit'>Mentés</Button>
                    </Stack>
                </FormControl>
    </form>


            </div>
    )
}