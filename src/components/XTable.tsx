import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { debounce } from "lodash";
import { handleLogout } from "../helpers/utils";
import XNoDataFound from "./XNoDataFound";
import {
  BoxContainer,
  SearchContainer,
  SearchIcon,
  StyledTableCell,
  StyledTextField,
} from "../styled/search";
import XCustomTooltip from "./XCustomTooltip";

interface XTableProps {
  apiUrl: string;
  uri: string;
}

const XTable: React.FC<XTableProps> = ({ apiUrl, uri }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = useMemo(() => window.localStorage.getItem("token"), []);

  const fetchData = useCallback(
    async (start_date?: string, end_date?: string) => {
      if (!token) {
        handleLogout();
        return;
      }

      try {
        const response = await axios.post(
          apiUrl,
          { start_offset: 1, end_offset: 50, start_date, end_date },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.[uri]) {
          const flattenedData = response.data[uri].map((row: any) =>
            flattenObject(row)
          );
          setRows(flattenedData);
          setFilteredRows(flattenedData);
        } else {
          setRows([]);
          setFilteredRows([]);
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          handleLogout();
        } else if (error.response?.status === 429) {
          navigate("/error");
        } else {
          console.error("API Error:", error);
        }
      }
    },
    [apiUrl, uri, token, navigate, handleLogout]
  );

  const flattenObject = (
    obj: Record<string, any>,
    prefix = ""
  ): Record<string, any> =>
    Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const newKey = prefix ? `${prefix}_${key}` : key;
        if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          Object.assign(acc, flattenObject(value, newKey));
        } else {
          acc[newKey] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback(
    debounce((query: string) => {
      setFilteredRows(
        rows.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(query.toLowerCase())
          )
        )
      );
    }, 300),
    [rows]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const handleFilter = (type: string) => {
    let start_date: Date | null = null;
    let end_date = new Date();

    switch (type) {
      case "Today":
        start_date = new Date();
        break;
      case "Yesterday":
        start_date = new Date();
        start_date.setDate(end_date.getDate() - 1);
        end_date = new Date(start_date);
        break;
      case "7 Days":
        start_date = new Date();
        start_date.setDate(end_date.getDate() - 7);
        break;
      case "30 Days":
        start_date = new Date();
        start_date.setDate(end_date.getDate() - 30);
        break;
      case "This Month":
        start_date = new Date(end_date.getFullYear(), end_date.getMonth(), 1);
        break;
      case "Last Month":
        start_date = new Date(
          end_date.getFullYear(),
          end_date.getMonth() - 1,
          1
        );
        end_date = new Date(end_date.getFullYear(), end_date.getMonth(), 0);
        break;
      case "Last Year":
        start_date = new Date(end_date.getFullYear() - 1, 0, 1);
        end_date = new Date(end_date.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }

    fetchData(
      start_date ? formatDate(start_date) : undefined,
      formatDate(end_date)
    );
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <SearchContainer>
        <Grid item xs={12} sm={8} md={6}>
          <StyledTextField
            variant="outlined"
            placeholder="Search..."
            onChange={handleChange}
            className="typography"
            value={searchQuery}
            InputProps={{ endAdornment: <SearchIcon /> }}
          />
        </Grid>

        <BoxContainer>
          {[
            "Today",
            "Yesterday",
            "7 Days",
            "30 Days",
            "This Month",
            "Last Month",
            "Last Year",
          ].map((filter) => (
            <Button
              style={{ padding: "4px 10px", fontSize: "12px" }}
              key={filter}
              variant="contained"
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </BoxContainer>
      </SearchContainer>

      <TableContainer
        component={Paper}
        sx={{ marginTop: 2, overflowX: "auto" }}
      >
        {rows.length > 0 ? (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                {rows.length > 0 &&
                  Object.keys(rows[0])
                    .slice(0, 3)
                    .map((key) => (
                      <TableCell key={key} sx={{ fontWeight: "bold" }}>
                        {key}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <XNoDataFound message="No Data Found" />
        )}
      </TableContainer>
    </Box>
  );
};

const Row: React.FC<{ row: any }> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const keys = Object.keys(row);
  const primaryKeys = keys.slice(0, 3);
  const additionalKeys = keys.slice(3);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {primaryKeys.map((key) => (
          <TableCell key={key} sx={{ whiteSpace: "nowrap" }}>
            {row[key]}
          </TableCell>
        ))}
      </TableRow>
      {additionalKeys.length > 0 && (
        <TableRow>
          <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {additionalKeys.map((key) => (
                        <TableCell
                          sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                        >
                          {key}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {additionalKeys.map((key) => (
                        <StyledTableCell key={key}>
                          <XCustomTooltip text={String(row[key]) || "N/A"}>
                            <span>{String(row[key]) || "N/A"}</span>
                          </XCustomTooltip>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default XTable;
