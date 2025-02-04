import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import CottageIcon from '@mui/icons-material/Cottage';
import SecurityIcon from '@mui/icons-material/Security';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import './XNavigation.css';

const XNavigation = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar collapsed={collapsed}>
      <div className="closemenu" onClick={() => setCollapsed(!collapsed)}>
        {/* changing menu collapse icon on click */}
        {collapsed ? (
          <ArrowRightIcon />
        ) : (
          <ArrowLeftIcon />
        )}
      </div>
      <Menu>
        <MenuItem onClick={() => navigate('/dashboard')} icon={<CottageIcon />}>
          Home
        </MenuItem>
        <SubMenu label="Vulnerability" defaultOpen={true} icon={<SecurityIcon />}>
          <MenuItem onClick={() => navigate('/cve')} icon={<AddModeratorIcon />}>
            CVE
          </MenuItem>
          <MenuItem onClick={() => navigate('/cwe')} icon={<AddModeratorIcon />}>
            CWE
          </MenuItem>
          <MenuItem onClick={() => navigate('/cpe')} icon={<LocalPoliceIcon />}>
            CPE
          </MenuItem>
          <MenuItem onClick={() => navigate('/patches')} icon={<RemoveModeratorIcon />}>
            Patches
          </MenuItem>
          <MenuItem onClick={() => navigate('/packages')} icon={<RemoveModeratorIcon />}>
            Packages
          </MenuItem>
        </SubMenu>
        {/* <MenuItem onClick={() => navigate('/settings')} icon={<SettingsApplicationsIcon />}>
          Settings
        </MenuItem> */}
      </Menu>
    </Sidebar>
  );
};

export default XNavigation;