import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import ProtectedRoutes from './ProtectedRoutes';
import UnProtectedRoutes from './UnProtectedRoutes';
import LoginPage from "./pages/LoginPage"
import UserRegistrationPage from "./pages/UserRegistrationPage"
import MainPage from "./pages/MainPage"
import Dashboard from './pages/Dashboard';
import SettingsPage from "./pages/SettingsPage";
import CvePage from "./pages/CvePage";
import CpePage from "./pages/CpePage";
import PatchesPage from "./pages/PatchesPage";
import PackagesPage from "./pages/PackagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnProtectedRoutes />} >
          <Route path="register" element={<UserRegistrationPage />} />
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoutes />} >
          <Route element={<MainPage />}>
            <Route path="/cve" element={<CvePage />} />
            <Route path="/cpe" element={<CpePage />} />
            <Route path="/patches" element={<PatchesPage />} />
            <Route path="/packages" element={<PackagesPage />} />

            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/*" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
