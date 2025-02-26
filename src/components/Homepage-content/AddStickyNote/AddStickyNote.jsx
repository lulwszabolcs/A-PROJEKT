import styles from './AddStickyNote.module.css'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { NoteContext } from '../../../contexts/NoteProvider';
export default function AddStickyNote({close}) {
    let {addNote} = useContext(NoteContext)
    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm()
          
    function onSubmit(data) {
        addNote(data)
        close();
    }
    return (
        <div className={styles.addstickycontainer}>
            <h3 className={styles.addstickytitle}>Új jegyzet hozzáadása</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth className={styles.addstickyform}>
                <TextField
                    id="outlined-multiline-static"
                    label="Szöveg"
                    multiline
                    rows={4}
                    {...register("text",{required:true})}
                />
                    <Stack direction="row" justifyContent={"space-between"}>
                            <Button variant="outlined" color="error" onClick={()=>{close()}}>Bezár</Button>
                            <Button variant="contained" type='submit'>Mentés</Button>
                    </Stack>
                </FormControl>
            </form>
        </div>
    )
}