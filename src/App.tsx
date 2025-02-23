/*
 * Copyright (C) Zetafence 2021-2025
 */
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
import CwePage from "./pages/CwePage";
import CpePage from "./pages/CpePage";
import PatchesPage from "./pages/PatchesPage"
import PackagesPage from "./pages/PackagesPage";
import CvssScorePage from "./pages/CvssScorePage";
import LimitErrorPage from "./pages/LimitErrorPage";
import StatsPage from "./pages/StatsPage";
import TrandPage from "./pages/Trends";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<UnProtectedRoutes />} >
                    <Route path="register" element={<UserRegistrationPage />} />
                    <Route path="/" element={<LoginPage />} />
                </Route>
                <Route element={<ProtectedRoutes />} >
                    <Route path="error" element={<LimitErrorPage />} />
                    <Route element={<MainPage />}>
                        <Route path="/cve" element={<CvePage />} />
                        <Route path="/trends" element={<TrandPage />} />
                        <Route path="/cwe" element={<CwePage />} />
                        <Route path="/cvss_score" element={<CvssScorePage />} />
                        <Route path="/cpe" element={<CpePage />} />
                        <Route path="/patches" element={<PatchesPage />} />
                        <Route path="/packages" element={<PackagesPage />} />
                        <Route path="/status" element={<StatsPage />} />

                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/*" element={<Dashboard />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App