import { SnackbarProvider } from "../../contexts/SnackbarProvider";
import Loginpage from "./LoginPage/Loginpage";

export default function Login() {
    return (
        <>
        <SnackbarProvider>
            <Loginpage/>
        </SnackbarProvider>
        </>
    )
}