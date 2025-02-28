import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #071f46;
  padding: 15px 30px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: none; /* Hide on small screens */
  }
`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: #dc2626;
  }
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block; /* Show menu button on small screens */
  }
`;

export const Sidebar = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: ${(props) => (props.open ? "0" : "-250px")};
  width: 250px;
  height: 100vh;
  background: #fff;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  z-index: 1000;
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  svg {
    color: #071f46;
    cursor: pointer;
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: baseline;
  width: 100%;

  svg {
    color: white;
  }
`;
