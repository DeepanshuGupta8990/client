import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Paper, Box, TextField, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { debounce } from 'lodash';
import { handleLogout } from '../helpers/utils';

interface XTableProps {
    apiUrl: string;
    uri: string;
}

const XTable: React.FC<XTableProps> = ({ apiUrl, uri }) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<any[]>([]);
    const [filteredRows, setFilteredRows] = useState<any[]>([]);
    const [, setSearchQuery] = useState<string>('');
    const [page,] = useState<number>(0);
    const [rowsPerPage,] = useState<number>(10);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
    const token = window.localStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, [paginationModel.page, paginationModel.pageSize]); // API fetches data whenever page or pageSize changes

    const fetchData = () => {
        axios.request({
            method: "POST",
            url: apiUrl,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: {
                start_offset: page * rowsPerPage + 1,
                end_offset: (page + 1) * rowsPerPage
            }
        }).then((res) => {
            if (res.data[uri]) {
                const flattenedData = res.data[uri].map((row: any, index: number) => ({
                    id: index + page * rowsPerPage, // Ensure unique IDs per page
                    ...flattenObject(row)
                }));
                setRows(flattenedData);
                setFilteredRows(flattenedData);
            }
        }).catch((err) => {
            if (err.response?.status === 401) {
                handleLogout();
            } else if (err.response?.status === 429) {
                navigate("/error");
            }
        });
    };

    const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = prefix ? `${prefix}_${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(acc, flattenObject(obj[key], newKey));
            } else {
                acc[newKey] = obj[key];
            }
            return acc;
        }, {} as Record<string, any>);
    };

    const getColumns = (): GridColDef[] => {
        if (!rows.length) return [];
        return Object.keys(rows[0]).map((key) => {
            // Exclude 'id' and 'checkboxSelection' from the columns
            if (key === 'id') return null;
            return {
                field: key,
                headerName: key.toUpperCase(),
                width: 150
            };
        }).filter(col => col !== null); // Filter out null values (id column)
    };


    const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredRows(rows.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        ));
    }, 300);

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        console.log("handlePaginationModelChange", model);
        setPaginationModel(model);
    };

    return (
        // TBD reconsider Grid component
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search..."
                        onChange={handleSearch}
                        InputProps={{ endAdornment: <SearchIcon /> }}
                    />
                </Grid>
            </Grid>
            <Paper sx={{ marginTop: 2, height: 500, width: '100%' }}>
                <DataGrid
                    rows={filteredRows}
                    columns={getColumns()}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    disableRowSelectionOnClick
                    paginationMode="client"
                    onPaginationModelChange={handlePaginationModelChange}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    );
};

export default XTable;