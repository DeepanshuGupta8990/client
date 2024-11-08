import './MainPage.css';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { Outlet } from "react-router-dom";

function MainPage() {

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainPage;