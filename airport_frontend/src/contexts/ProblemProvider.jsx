import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { SnackbarContext } from "./SnackbarProvider";

const ProblemContext = createContext()

const ProblemProvider = ({children}) => {

    let {token} = useContext(UserContext)
    let {displaySnackbar} = useContext(SnackbarContext)
    const [problems,setProblems] = useState([])

    async function getProblems() {
        try {
            const response = await axios.get("/api/problem",{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            setProblems([...response.data])
        } catch (error) {
            displaySnackbar("Hiba a problémák lekérdezésekor!",false)
        }
    }

    async function deleteSelectedProblem(id) {
        try {
            const response = await axios.delete(`/api/problem/${id}`,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            let deleted = problems.filter((x)=>x.problemId !== response.data.problemId)
            setProblems(deleted)
            displaySnackbar("Hiba sikeresen törölve!",true)
        } catch (error) {
            displaySnackbar("Hiba a probléma törlésekor!",false)
        } 
    }
    async function closeSelectedProblem(id) {
        try {
            const response = await axios.patch(`/api/problem/${id}`,{
                "key":"STATUS",
                "value":"CLOSED"
            },{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                } 
            })
            let modified = problems.find((x)=>x.problemId === response.data.problemId)
            modified.status = "CLOSED"
            setProblems([...problems])
            displaySnackbar("Hiba sikeresen lezárva!",true)
        } catch (error) {
            displaySnackbar("Hiba a probléma lezárásakor!",false)
        }
    }

    async function editSelectedProblem(id,data) {
        try {
            const response = await axios.put(`/api/problem/${id}`,data,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            let modified = problems.find((x)=>x.problemId === response.data.problemId)
            modified = response.data
            setProblems([...problems])
            displaySnackbar("Hiba sikeresen szerkesztve!",true)
        } catch (error) {
            displaySnackbar("Hiba a probléma szerkesztésekor!",false)
        } finally {
            getProblems()
        }
    }
    async function addNewProblem(data) {
        try {
            const response = await axios.post(`/api/problem`,data,{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ""
                }
            })
            setProblems([response.data,...problems])
        } catch (error) {
            displaySnackbar("Hiba a probléma hozzáadásakor!",false)
        } finally {
            getProblems()
        }
    }
    const problemColorPicker = (problemType) => {
        let color = "";
        switch (problemType) {
          case "Berendezés meghibásodása":
          case "Kommunikációs hiba":
          case "Navigációs hiba":
          case "Légi forgalomirányítási hiba":
          case "Rendszerhiba":
            color = "purple";
            break;
    
          case "Üzemanyag szivárgás":
          case "Üzemanyag ellátási probléma":
          case "Üzemanyag teherautó késés":
            color = "#f08737";
            break;
    
          case "Áramszünet":
          case "Világítási hiba":
          case "Biztonsági rendszer hiba":
          case "Rádió meghibásodás":
            color = "#d1ce0f";
            break;
    
          case "Kifutópálya akadály":
          case "Kifutó pálya repedés":
          case "Madárütközés":
          case "Kifutó pálya túlfutás":
          case "Járműhiba":
            color = "gray";
            break;
    
          case "Időjárási zavar":
          case "Jégtelenítési probléma":
          case "Hóeltakarítási probléma":
            color = "blue";
            break;
    
          case "Elveszett poggyász":
          case "Vámdelay":
          case "Check-in hiba":
          case "Beszállási késés":
          case "Poggyászátvilágítási hiba":
            color = "brown";
            break;
    
          case "Tűzriadó":
          case "Mellékhelyiség meghibásodás":
          case "Elveszett gyermek":
          case "Fűtési hiba":
          case "Hűtési hiba":
          case "Illetéktelen személy":
          case "Vészkijárat probléma":
            color = "red";
            break;
    
          case "Jegykezelési hiba":
          case "Orvosi vészhelyzet":
          case "Parkolóhely hiány":
          case "Rakomány biztonsági rés":
            color = "#ff14b5";
            break;
          default:
            color = "#0fe6fa";
            break;
          }
          return color;
      }

    useEffect(()=>{
        if (token) {
            getProblems()
        }
    },[token])
    
    return <ProblemContext.Provider value={{problems,deleteSelectedProblem,closeSelectedProblem,problemColorPicker,editSelectedProblem,addNewProblem}}>
        {children}
    </ProblemContext.Provider>
}

export {ProblemContext,ProblemProvider}