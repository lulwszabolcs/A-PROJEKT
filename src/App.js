import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Homepage from './components/Homepage-content/Homepage';
import Loginpage from './components/Login/Loginpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Errors from './components/Errors/Errors';
import Workers from './components/Workers/Workers';
import Vehicles from './components/Vehicles/Vehicles';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Loginpage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Homepage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="errors" element={<Errors />} />
          <Route path="workers" element={<Workers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
