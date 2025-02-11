import {useNavigate} from "react-router-dom";
import './Header.css';
import logo from '../assets/vfeed.png'; 

function Header() {
  const navigate = useNavigate();
  const user = window.localStorage.getItem('user')

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('google');
    navigate("/");
  }

  return (
    <div className="dashboard-header">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="logout-container">
          <div className="div-padding-right">
            Welcome <span className="logout-span" onClick={() => navigate("/settings")}>{user}</span>
          </div>
          <span className="logout-span" onClick={handleLogout}>Logout</span>
        </div>
      </header>
    </div>
  );
}

export default Header;