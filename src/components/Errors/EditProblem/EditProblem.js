import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import './EditProblem.css';
import { useContext, useEffect, useState } from 'react';
import ErrorList from '../ErrorList/ErrorList';
import {MenuItem,Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TypeContext } from '../../../contexts/TypeProvider';
import { ProblemContext } from '../../../contexts/ProblemProvider';

export default function EditProblem({close,problem}) {
    let {problemTypes} = useContext(TypeContext)
    let {editSelectedProblem} = useContext(ProblemContext)
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()
    const onSubmit = (data) => {
        data.status = "Függőben"
        data.datum = problem.datum
        try {
            editSelectedProblem(problem.problemId,data)
        } catch (error) {
            console.log(error)
        } finally {
            close()
        }
    }
    return (
        <div className='editProblem-container'>
            <h3 style={{textAlign:'center'}}>Probléma szerkesztése</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth className='editError-form'>     
                <TextField defaultValue={problem.name} required name='name'  id="outlined-basic" label="Név" variant="outlined" {...register("name",{required:true})} />
                <TextField defaultValue={problem.description} required name='description'  id="outlined-basic" label="Leírás" variant="outlined" {...register("description",{required:true})} />
                <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select"
                    defaultValue={problem.problemType || ''} 
                    name='problemType'
                    {...register("problemType",{required:true})}
                    >
                    <MenuItem value="" disabled>Típus kiválasztása</MenuItem>
                    {problemTypes.map((type) => (
                        <MenuItem key={type.id} value={type.problemTypeDescription}>
                            {type.problemTypeDescription}
                        </MenuItem>
                    ))}
                </Select>
                <Stack direction="row" justifyContent={"space-between"}>
                        <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                        <Button variant="contained" type='submit' >Mentés</Button>
                </Stack>
            </FormControl>  
            </form>
        </div>
    )
}