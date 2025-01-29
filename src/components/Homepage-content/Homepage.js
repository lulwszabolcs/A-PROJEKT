import { Button, Typography } from "@mui/material";
import MiniDrawer from "../Sidebar/Sidebar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useContext } from "react";
import { UserContext, UserProvider } from "../../contexts/UserProvider";
import { PieChart } from '@mui/x-charts/PieChart';
import { VehicleContext, VehicleProvider } from "../../contexts/VehicleProvider";
import HomePageContent from "./HomePageContent";

export default function Homepage() {
  return (
    <>
    <MiniDrawer>
    </MiniDrawer>
    <VehicleProvider>
      <UserProvider>
      <HomePageContent></HomePageContent>
      </UserProvider>
    </VehicleProvider>
    </>
  )
}