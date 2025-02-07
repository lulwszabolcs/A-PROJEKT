import './App.css';
import Homepage from './components/Homepage-content/Homepage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Errors from './components/Errors/Errors';
import Workers from './components/Workers/Workers';
import Vehicles from './components/Vehicles/Vehicles';
import Profile from './components/Profile/Profile';
import { UserProvider } from './contexts/UserProvider';
import { TypeProvider } from './contexts/TypeProvider';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import Support from './components/Support/Support';
import Login from './components/Login/Login';

function App() {
  return (
    <TypeProvider>
<SnackbarProvider>
        <UserProvider>
  
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="errors" element={<Errors />} />
          <Route path="workers" element={<Workers />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
</SnackbarProvider>
      </TypeProvider>
  );
}

export default App;
