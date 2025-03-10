import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BugReportIcon from "@mui/icons-material/BugReport";
import SecurityIcon from "@mui/icons-material/Security";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CategoryIcon from "@mui/icons-material/Category";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./XNavigation.css";

const XNavigation = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar collapsed={collapsed} className="sidebar-container">
      <div className="closemenu" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? (
          <ArrowRightIcon fontSize="large" />
        ) : (
          <ArrowLeftIcon fontSize="large" />
        )}
      </div>
      <Menu>
        <MenuItem
          onClick={() => navigate("/dashboard")}
          icon={<DashboardIcon />}
        >
          <b>Dashboard</b>
        </MenuItem>
        <MenuItem onClick={() => navigate("/trends")} icon={<TrendingUpIcon />}>
          <b>Trends</b>
        </MenuItem>
        <SubMenu
          label={<b>Vulnerabilities</b>}
          icon={<BugReportIcon />}
          defaultOpen
        >
          <div className="submenu">
            <MenuItem onClick={() => navigate("/cve")} className="submenu">
              CVE
            </MenuItem>
            <MenuItem onClick={() => navigate("/cwe")} className="submenu">
              CWE
            </MenuItem>
            <MenuItem onClick={() => navigate("/cpe")} className="submenu">
              CPE
            </MenuItem>
            <MenuItem onClick={() => navigate("/recent")} className="submenu">
              Recent
            </MenuItem>
            <MenuItem onClick={() => navigate("/exploited")}>
              Actively Exploited
            </MenuItem>
            <MenuItem onClick={() => navigate("/search")}>Search</MenuItem>
          </div>
        </SubMenu>
        <SubMenu
          label={<b>Severity & Risks</b>}
          icon={<SecurityIcon />}
          defaultOpen
        >
          <div className="submenu">
            <MenuItem onClick={() => navigate("/cvss_score")}>
              CVSS Scores
            </MenuItem>
            <MenuItem onClick={() => navigate("/epss")}>EPSS Scores</MenuItem>
            <MenuItem onClick={() => navigate("/cisa-kev")}>CISA KEV</MenuItem>
          </div>
        </SubMenu>
        <SubMenu
          label={<b>Vulnerable Software</b>}
          icon={<AssessmentIcon />}
          defaultOpen
        >
          <div className="submenu">
            <MenuItem onClick={() => navigate("/packages")}>Packages</MenuItem>
            <MenuItem onClick={() => navigate("/patches")}>Patches</MenuItem>
            <MenuItem onClick={() => navigate("/oss")}>OSS</MenuItem>
            <MenuItem onClick={() => navigate("/defense")}>
              Defense Available
            </MenuItem>
          </div>
        </SubMenu>
        <SubMenu
          label={<b>Threat Intel</b>}
          icon={<ErrorOutlineIcon />}
          defaultOpen
        >
          <div className="submenu">
            <MenuItem onClick={() => navigate("/advisories")}>
              Vendor Advisories
            </MenuItem>
            <MenuItem onClick={() => navigate("/exploit-poc")}>
              Exploit PoC
            </MenuItem>
            <MenuItem onClick={() => navigate("/affected-software")}>
              Affected Software, CPE
            </MenuItem>
            <MenuItem onClick={() => navigate("/attack-patterns")}>
              Attack Patterns CAPEC
            </MenuItem>
          </div>
        </SubMenu>
        <SubMenu label={<b>Standards</b>} icon={<CategoryIcon />} defaultOpen>
          <div className="submenu">
            <MenuItem onClick={() => navigate("/capec")}>CAPEC</MenuItem>
            <MenuItem onClick={() => navigate("/mitre-weakness")}>
              MITRE Weakness
            </MenuItem>
            <MenuItem onClick={() => navigate("/mitre-attack")}>
              MITRE ATT&CK
            </MenuItem>
          </div>
        </SubMenu>
        <MenuItem
          onClick={() => navigate("/vuln-catalog")}
          icon={<BugReportIcon />}
        >
          <b>Vuln Catalog</b>
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/status")}
          icon={<CheckCircleIcon />}
        >
          <b>Status</b>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default XNavigation;
