import './App.css';
import Homepage from './components/Homepage-content/Homepage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Errors from './components/Errors/Errors';
import Workers from './components/Workers/Workers';
import Vehicles from './components/Vehicles/Vehicles';
import Profile from './components/Profile/Profile';
import { UserProvider, UserContext } from './contexts/UserProvider';
import { TypeProvider } from './contexts/TypeProvider';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import Support from './components/Support/Support';
import Login from './components/Login/Login';
import { VehicleProvider } from './contexts/VehicleProvider';
import { useContext } from 'react';
import { ImageProvider } from './contexts/ImageProvider';
import { WorkerProvider } from './contexts/WorkerProvider';

// Védett útvonal komponens
function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <VehicleProvider>{children}</VehicleProvider>;
}

function App() {
  return (
    <SnackbarProvider>
      <UserProvider>
        <TypeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />                
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="home"
                  element={
                    <ProtectedRoute>
                      <Homepage />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="vehicles"
                  element={
                    <ProtectedRoute>
                      <Vehicles />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="errors"
                  element={
                    <ProtectedRoute>
                      <Errors />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="workers"
                  element={
                    <ProtectedRoute>
                      <Workers />
                    </ProtectedRoute>
                  }
                  />
                <Route
                  path="support"
                  element={
                    <ProtectedRoute>
                      <Support />
                    </ProtectedRoute>
                  }
                  />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TypeProvider>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;