import { ImageProvider } from "../../contexts/ImageProvider"
import { SnackbarProvider } from "../../contexts/SnackbarProvider"
import MiniDrawer from "../Sidebar/Sidebar"
import VehicleList from "./VehicleList/VehicleList"
export default function Vehicles() {
    return (
        // profile tab: letoltes gomb megcsinalasa
        // chat: ne legyen buta, tudja folytatni a beszelgetest
        // reszponzivitas, atiras vite-re?
        // tesztek irasa
        // add-edit-torol lekorlatozasa

        // holnap : code szepites befejezes, providerekben mindenhol try catch, remove felesleges dolgok, catch agban snackbarok
        //          chat ne legyen buta
        //          vite elkezdes
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
