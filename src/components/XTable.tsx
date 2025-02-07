import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { handleLogout } from '../helpers/utils';
import './XTable.css';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';

const DEFAULT_ROWS_PER_PAGE = 10;
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

/*
function getTitleCase(text: String) {
    if (text) {
        const result = text.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    } else {
        return text;
    }
}

function getHeadings(data: {}[]) {
    if (!data || data.length == 0) return [];
    return Object.keys(data[0]).map((key) => {
        return getTitleCase(key);
    });
}
*/
function getHeadings2(data: {}[]): string[] {
    if (!data || data.length === 0) return [];

    function flattenKeys(obj: any, prefix = ''): string[] {
        return Object.keys(obj).flatMap((key) => {
            const newKey = prefix ? `${prefix}_${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                return flattenKeys(obj[key], newKey);
            }
            return newKey;
        });
    }
    console.log("flattened headers: ", flattenKeys(data[0]));

    return flattenKeys(data[0]);
}

interface XTableProps {
    apiUrl: string;
    uri: string;
}

const XTable: React.FC<XTableProps> = ({ apiUrl, uri }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const [data, setData] = useState([]);
    const token = window.localStorage.getItem('token');

    useEffect(
        () => {
            // API call to the server
            axios.request({
                method: "POST",
                url: apiUrl,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data: {
                    start_offset: 1,
                    end_offset: 10
                }
            }).then((res) => {
                setData(res.data[uri]);
            }).catch((err) => {
                console.log(err)
                if (err.status == 401) {
                    handleLogout();
                } else if (err.status == 429) {
                    navigate("/error");
                }
            });
        },
        []
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function flattenObject(obj: any, prefix = ''): Record<string, any> {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = prefix ? `${prefix}_${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(acc, flattenObject(obj[key], newKey));
            } else {
                acc[newKey] = obj[key];
            }
            return acc;
        }, {} as Record<string, any>);
    }

    const flattenedData = data.map(row => flattenObject(row));

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead className='table-header'>
                        <TableRow>
                            {
                                getHeadings2(data).map((title, i) => (
                                    <TableCell key={i}>{title}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(flattenedData) && flattenedData.length > 0 ? (
                            flattenedData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <TableRow key={i}>
                                        {Object.keys(row).map((key, j) => (
                                            <TableCell key={j}>{row[key]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={1} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
                component="div"
                count={Array.isArray(data) && data.length ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default XTable;