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
import { ProblemContext } from '../../../contexts/ProblemProvider';
export default function Addproblem({close}) {
    let {problemTypes} = useContext(TypeContext);
    let {addNewProblem} = useContext(ProblemContext)
    
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

    const onSubmit = (data) => {
        try {
            data.datum = formatDate(new Date())
            data.status = "Függőben"
            addNewProblem(data)
        } catch (error) {
            console.log(error)   
        } finally {
            close()
        }  
    }
    return (
            <div className={styles.addproblemcontainer}>
                <h3 style={{textAlign:'center'}}>Új probléma hozzáadása</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                <FormControl fullWidth className={styles.addproblemform}>
                    <TextField required name='name'  id="outlined-basic" label="Név" variant="outlined" {...register("name",{required:true})} />
                    <TextField required name='description'  id="outlined-basic" label="Leírás" variant="outlined" {...register("description",{required:true})}/>
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple-select"
                        name='problemType'
                        required
                        defaultValue={'tpus'}
                        {...register("problemType",{required:true})}
                    >
                        <MenuItem value={'tpus'} disabled>Típus kiválasztása</MenuItem>
                        {problemTypes.map((type) => (
                            <MenuItem key={type.id} value={type.problemTypeDescription}>
                                {type.problemTypeDescription}
                            </MenuItem>
                        ))}
                    </Select>
                    <Stack direction="row" justifyContent={"space-between"}>
                            <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                            <Button variant="contained" type='submit'>Mentés</Button>
                    </Stack>
                </FormControl>
                </form>
            </div>
    )
}