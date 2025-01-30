import { Button, Modal, Typography } from "@mui/material";
import MiniDrawer from "../Sidebar/Sidebar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { PieChart } from '@mui/x-charts/PieChart';
import { VehicleContext } from "../../contexts/VehicleProvider";
import styles from './HomePageContent.module.css'
import AddIcon from '@mui/icons-material/Add';
import AddStickyNote from "./AddStickyNote/AddStickyNote";
import { NoteContext } from "../../contexts/NoteProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import SnackbarComponent from "../Snackbar/SnackbarComponent";
import { SnackbarContext } from "../../contexts/SnackbarProvider";
export default function HomePageContent() {
  let {getOnlineUsers,getUsersLenght} = useContext(UserContext)
  let {getActiveVehicles,getInActiveVehicles} = useContext(VehicleContext)
  let {notes,deleteNote} = useContext(NoteContext)
  let {SnackbarMessage, SnackbarOpen, closeSnackbar} = useContext(SnackbarContext)
  const [addStickyNotesOpen,setAddStickyNotesOpen] = useState(false)
  function close() {
    setAddStickyNotesOpen(false)
  }
  let username = "test"
  const settings = {
    width: 200,
    height: 200,
    value: (getOnlineUsers()),
  };
    return (
      <>
      <h1 className={styles.welcometext}>Üdvözöljük {username}!</h1>
      <div className={styles.flexbox}>
        <div className={styles.onlinechart}>

        <Gauge
        valueMax={getUsersLenght()}
        {...settings}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: '#52b202',
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
      />
      <h3>Online felhasználók</h3>
      </div>
      <div className={styles.onlinechart}>
      <PieChart
      series={[
        {
          data: [{value:getActiveVehicles(), color:'lightgreen',label:'Üzemképes'},{value:getInActiveVehicles(),color:'orange',label:'Nem üzemképes'}],
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
      width={500}
      />
      <h3 className={styles.piecharttext}>Üzemképes járművek</h3>
      </div>
      <div className={styles.stickynotescontainer}>
        {notes.map((note)=>(
          <div className={styles.stickynotes} style={{backgroundImage:`url('./images/sticky.png')`}} key={note.id}>
              <DeleteIcon className={styles.delete} onClick={()=>deleteNote(note.id)} sx={{color:'gray'}}></DeleteIcon>
             <h4>{note.text}</h4>
          </div>
        ))}
      <div className={styles.stickynotes} style={{backgroundImage:`url('./images/sticky.png')`,cursor:'pointer'}} onClick={()=>setAddStickyNotesOpen(true)}>
        <AddIcon></AddIcon>
      </div>
      </div>
      </div>
      <Modal open={addStickyNotesOpen}>
        <AddStickyNote close={close}></AddStickyNote>
      </Modal>
      <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar}/>
      
      </>
    )
}