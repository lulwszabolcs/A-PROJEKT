import {getPopoverUtilityClass, Modal} from "@mui/material";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useCallback, useContext, useEffect, useState } from "react";
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
import { BarChart } from '@mui/x-charts/BarChart';
import { TypeContext } from "../../contexts/TypeProvider";

export default function HomePageContent() {
  let { getOnlineUsers, getUsersLenght } = useContext(UserContext);
  let { getActiveVehicles, getInActiveVehicles } = useContext(VehicleContext);
  let { notes, deleteNote } = useContext(NoteContext);
  let { SnackbarMessage, SnackbarOpen, closeSnackbar, SnackbarSuccess } = useContext(SnackbarContext);
  let {getProblemTypeDescriptions,problemTypeDescriptions,getProblemNumberSeries,problemTypeSeries,setProblemTypeDescriptions,setProblemTypeSeries} = useContext(TypeContext)
  const [addStickyNotesOpen, setAddStickyNotesOpen] = useState(false);
  const [notePositions, setNotePositions] = useState({});

  const [draggingNote, setDraggingNote] = useState(null);
  const [relativeCoords, setRelativeCoords] = useState({ x: 0, y: 0 });

  const handleDragStart = useCallback((e, noteId) => {
    if (!notePositions[noteId]) {
      setNotePositions((prev) => ({
        ...prev,
        [noteId]: { x: 250, y: 1280 },
      }));
    }
    setDraggingNote(noteId);
    setRelativeCoords({
      x: e.clientX - (notePositions[noteId]?.x || 250),
      y: e.clientY - (notePositions[noteId]?.y || 1280),
    });
  }, [notePositions]);

  const handleDrag = useCallback((e) => {
    if (draggingNote !== null) {
      setNotePositions((prevPositions) => ({
        ...prevPositions,
        [draggingNote]: {
          x: e.clientX - relativeCoords.x,
          y: e.clientY - relativeCoords.y,
        },
      }));
    }
  }, [draggingNote, relativeCoords]);

  const handleDragEnd = useCallback(() => {
    setDraggingNote(null);
  }, []);

  function close() {
    setAddStickyNotesOpen(false);
  }

  let username = "test";
  const settings = {
    width: 200,
    height: 200,
    value: getOnlineUsers(),
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
              [`& .${gaugeClasses.valueText}`]: { fontSize: 40 },
              [`& .${gaugeClasses.valueArc}`]: { fill: '#52b202' },
              [`& .${gaugeClasses.referenceArc}`]: { fill: theme.palette.text.disabled },
            })}
          />
          <h3>Online felhasználók</h3>
        </div>
        <div className={styles.onlinechart}>
          <PieChart
            series={[
              {
                data: [
                  { value: getActiveVehicles(), color: 'lightgreen', label: 'Üzemképes' },
                  { value: getInActiveVehicles(), color: 'orange', label: 'Nem üzemképes' },
                ],
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
          {notes.map((note,index) => {
            const position = notePositions[note.id] || { x: 250 + (index * 250), y: 1280 };
            return (
              <div
                key={note.id}
                className={styles.stickynotes}
                onPointerDown={(e) => handleDragStart(e, note.id)}
                onPointerMove={handleDrag}
                onPointerUp={handleDragEnd}
                onPointerLeave={handleDragEnd}
                style={{
                  cursor: 'pointer',
                  backgroundImage: `url('./images/sticky.png')`,
                  position: 'absolute',
                  left: position.x + 'px',
                  top: position.y + 'px',
                }}
              >
                <DeleteIcon
                  className={styles.delete}
                  onClick={() => deleteNote(note.id)}
                  sx={{ color: 'gray' }}
                />
                <h4>{note.text}</h4>
              </div>
            );
          })}
          <div
            className={styles.stickynotes}
            style={{ backgroundImage: `url('./images/sticky.png')`, cursor: 'pointer'}}
            onClick={() => setAddStickyNotesOpen(true)}
          >
            <AddIcon />
          </div>
        </div>
      </div>
      <Modal open={addStickyNotesOpen}>
        <AddStickyNote close={close} />
      </Modal>
      <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar} success={SnackbarSuccess} />
    </>
  );
}