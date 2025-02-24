import { ImageProvider } from "../../contexts/ImageProvider";
import { WorkerProvider } from "../../contexts/WorkerProvider";
import MiniDrawer from "../Sidebar/Sidebar";
import ProfileCard from "./ProfileCard/ProfileCard";

export default function Profile() {
    return (
        <>
        <MiniDrawer></MiniDrawer>
        <ImageProvider>
        <ProfileCard></ProfileCard>
        </ImageProvider>
        </>
    )
}