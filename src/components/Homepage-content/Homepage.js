import MiniDrawer from "../Sidebar/Sidebar";
import HomePageContent from "./HomePageContent";
import { NoteProvider } from "../../contexts/NoteProvider";

export default function Homepage() {
  return (
    <>
    <MiniDrawer>
    </MiniDrawer>
      <NoteProvider>
      <HomePageContent></HomePageContent>
      </NoteProvider>
    </>
  )
}