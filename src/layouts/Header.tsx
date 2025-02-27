import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/vfeed.png";
import {
  HeaderContainer,
  Logo,
  LogoutButton,
  UserContainer,
  UserName,
  MenuButton,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "../styled/header";

function Header() {
  const navigate = useNavigate();
  const userEmail = window.localStorage.getItem("user") || "";
  const username = userEmail.split("@")[0];
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("google");
    navigate("/");
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={logo} alt="Logo" />

        <MenuButton onClick={() => setSidebarOpen(true)}>
          <MenuIcon fontSize="large" />
        </MenuButton>

        <UserContainer>
          <UserName onClick={() => navigate("/settings")}>
            Welcome, {username}
          </UserName>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserContainer>
      </HeaderContainer>

      <Sidebar open={isSidebarOpen}>
        <SidebarHeader>
          <CloseIcon fontSize="large" onClick={() => setSidebarOpen(false)} />
        </SidebarHeader>
        <SidebarContent>
          <UserName onClick={() => navigate("/settings")}>
            Welcome, {username}
          </UserName>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

export default Header;
