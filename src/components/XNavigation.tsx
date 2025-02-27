import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BugReportIcon from '@mui/icons-material/BugReport';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './XNavigation.css';

const XNavigation = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sidebar collapsed={collapsed} className='sidebar-container'>
            <div className="closemenu" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <ArrowRightIcon fontSize='large' /> : <ArrowLeftIcon fontSize='large' />}
            </div>
            <Menu>
                <MenuItem onClick={() => navigate('/dashboard')} icon={<DashboardIcon />}>
                    <b>Dashboard</b>
                </MenuItem>
                <MenuItem onClick={() => navigate('/trends')} icon={<TrendingUpIcon />}>
                    <b>Trends</b>
                </MenuItem>
                <SubMenu label={<b>Vulnerabilities</b>} icon={<BugReportIcon />} defaultOpen>
                    <MenuItem className='submenu-item' onClick={() => navigate('/cve')}>CVE</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/cwe')}>CWE</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/cpe')}>CPE</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/recent')}>Recent</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/exploited')}>Actively Exploited</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/search')}>Search</MenuItem>
                </SubMenu>
                <SubMenu label={<b>Severity & Risks</b>} icon={<SecurityIcon />} defaultOpen>
                    <MenuItem className='submenu-item' onClick={() => navigate('/cvss')}>CVSS Scores</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/epss')}>EPSS Scores</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/cisa-kev')}>CISA KEV</MenuItem>
                </SubMenu>
                <SubMenu label={<b>Vulnerable Software</b>} icon={<AssessmentIcon />} defaultOpen>
                    <MenuItem className='submenu-item' onClick={() => navigate('/packages')}>Packages</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/patches')}>Patches</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/oss')}>OSS</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/defense')}>Defense Available</MenuItem>
                </SubMenu>
                <SubMenu label={<b>Threat Intel</b>} icon={<ErrorOutlineIcon />} defaultOpen>
                    <MenuItem className='submenu-item' onClick={() => navigate('/advisories')}>Vendor Advisories</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/exploit-poc')}>Exploit PoC</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/affected-software')}>Affected Software, CPE</MenuItem>
                    <MenuItem className='submenu-item' onClick={() => navigate('/attack-patterns')}>Attack Patterns CAPEC</MenuItem>
                </SubMenu>
                <SubMenu label={<b>Standards</b>} icon={<CategoryIcon />} defaultOpen>
                    <MenuItem onClick={() => navigate('/capec')}>CAPEC</MenuItem>
                    <MenuItem onClick={() => navigate('/mitre-weakness')}>MITRE Weakness</MenuItem>
                    <MenuItem onClick={() => navigate('/mitre-attack')}>MITRE ATT&CK</MenuItem>
                </SubMenu>
                <MenuItem onClick={() => navigate('/vuln-catalog')} icon={<BugReportIcon />}>
                    <b>Vuln Catalog</b>
                </MenuItem>
                <MenuItem onClick={() => navigate('/status')} icon={<CheckCircleIcon />}>
                    <b>Status</b>
                </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default XNavigation;