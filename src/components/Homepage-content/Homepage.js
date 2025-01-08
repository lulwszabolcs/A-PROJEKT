import { Button, Typography } from "@mui/material";
import MiniDrawer from "../Sidebar/Sidebar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './Homepage.css'
export default function Homepage() {
  let username = "test"
    return (
      // diagramok, számok, dátum stb 
      <>
      <MiniDrawer></MiniDrawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <h1 className="welcometext">Üdvözöljük {username}!</h1>
      </Box>
      </>
    )
}