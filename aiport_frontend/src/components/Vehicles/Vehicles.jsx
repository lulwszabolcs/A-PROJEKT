import { ImageProvider } from "../../contexts/ImageProvider"
import { SnackbarProvider } from "../../contexts/SnackbarProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
export default function Vehicles() {
    return (
        <>
        <MiniDrawer></MiniDrawer>
            <SnackbarProvider>
                        <ImageProvider>
                    <VehicleList></VehicleList>
                        </ImageProvider>
            </SnackbarProvider>
        </>
    )
}
