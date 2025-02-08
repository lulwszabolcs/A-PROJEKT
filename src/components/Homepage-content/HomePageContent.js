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
import axios from "axios";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AirIcon from '@mui/icons-material/Air';
import Alert from '@mui/material/Alert';
import AcUnitIcon from '@mui/icons-material/AcUnit';
export default function HomePageContent() {
  let { getOnlineUsers, getUsersLenght } = useContext(UserContext);
  let { getActiveVehicles, getInActiveVehicles } = useContext(VehicleContext);
  let { notes, deleteNote } = useContext(NoteContext);
  let { SnackbarMessage, SnackbarOpen, closeSnackbar, SnackbarSuccess } = useContext(SnackbarContext);

  const [addStickyNotesOpen, setAddStickyNotesOpen] = useState(false);
  const [notePositions, setNotePositions] = useState({});

  const [draggingNote, setDraggingNote] = useState(null);
  const [relativeCoords, setRelativeCoords] = useState({ x: 0, y: 0 });
  const [weatherData,setWeatherData] = useState({
    rain:null,
    temperature:null,
    visibility:null,
    wind_speed:null,
    snowfall:null
  });

  const [weatherAlertVisible,setWeatherAlertVisible] = useState(false)
  const [weatherAlertMessage,setWeatherAlertMessage] = useState("")

  const handleDragStart = useCallback((e, noteId) => {
        if (!notePositions[noteId]) {
          setNotePositions((prev) => ({
            ...prev,
            [noteId]: { x: 250, y: 775 },
          }));
        }
        setDraggingNote(noteId);
        setRelativeCoords({
          x: e.clientX - (notePositions[noteId]?.x || 250),
          y: e.clientY - (notePositions[noteId]?.y || 775),
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

  function formatDate(date){
    var d = new Date(date),
    dformat = d.getHours()
    return dformat
  }
  
  async function getWeather() {
      let hour = formatDate(new Date)
      const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=47.9839&longitude=21.6923&hourly=temperature_2m,rain,snowfall,visibility,wind_speed_120m&timezone=auto&forecast_days=1");
      const weatherData = {
        rain:response.data.hourly.rain[hour],
        temperature:response.data.hourly.temperature_2m[hour],
        visibility:response.data.hourly.visibility[hour]/1000,
        wind_speed:response.data.hourly.wind_speed_120m[hour],
        snowfall:response.data.hourly.snowfall[hour]
      }
      setWeatherData(weatherData)
      console.log(response.data)
  }

  function displayWeatherAlert() {
    if (weatherData.temperature != null && weatherData.temperature < 2) {
      setWeatherAlertMessage("Veszélyesen alacsony hőmérséklet! Fokozottan ügyeljenek biztonságukra!")
      setWeatherAlertVisible(true);
    } else if (weatherData.visibility != null && weatherData.visibility < 10) {
      setWeatherAlertMessage("Veszélyesen alacsony látótávolság! Fokozottan ügyeljenek biztonságukra!")
      setWeatherAlertVisible(true);
    } else if (weatherData.rain != null && weatherData.rain > 1) {
      setWeatherAlertMessage("Veszélyesen sok csapadék! Fokozottan ügyeljenek biztonságukra!")
      setWeatherAlertVisible(true);
    } else if (weatherData.wind_speed != null && weatherData.wind_speed > 10) {
      setWeatherAlertMessage("Veszélyesen erős szélsebesség! Fokozottan ügyeljenek biztonságukra!")
      setWeatherAlertVisible(true);
    } else {
      setWeatherAlertVisible(false)
    }
  }

  useEffect(()=>{
    getWeather()
  },[])

  useEffect(()=>{
    if (weatherData) {
      displayWeatherAlert();    
    }
  },[weatherData])
  return (
    <>
      <h1 className={styles.welcometext}>Üdvözöljük {username}!</h1>
      {weatherAlertVisible && (
          <div className={styles.alertcontainer}>
            <Alert variant="filled" severity="warning" style={{ width: '50vw' }}>
              {weatherAlertMessage}
            </Alert>
          </div>
      )}

      <div className={styles.weathercontainer}>
        <div className={styles.tempcontainer}>
          <WaterDropIcon></WaterDropIcon> 
          <p>{weatherData.rain} mm</p>
        </div>
        <div className={styles.tempcontainer}>
          <ThermostatIcon sx={{color:'red'}}/> 
          <p>{weatherData.temperature} °C</p>
        </div>
        <div className={styles.tempcontainer}>
          <VisibilityIcon sx={{color:'orange'}}/>
          <p>{weatherData.visibility} km</p>
        </div>
        <div className={styles.tempcontainer}>
          <AirIcon sx={{color:'gray'}}/>
          <p>{weatherData.wind_speed} km/h</p>
        </div>
        <div className={styles.tempcontainer}>
          <AcUnitIcon sx={{color:'#4DA8DA'}}/>
          <p>{weatherData.snowfall} cm</p>
        </div>
        </div>
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
        <div className={styles.vehiclechart}>
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
            const position = notePositions[note.id] || { x: 250 + (index * 250), y: 775 };
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