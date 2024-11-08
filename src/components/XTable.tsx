import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

function getTitleCase(text: String) {
    if(text) {
        const result = text.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    } else {
        return text;
    }
}

function getHeadings(data: {}[]) {
    if(!data || data.length == 0) return [];
    return Object.keys(data[0]).map((key) => {
        return getTitleCase(key);
    });
}

interface XTableProps {
    apiUrl: string;
}

const XTable: React.FC<XTableProps> = ({apiUrl}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [data, setData ] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(
    () => {
      // API call to the server
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      }).catch((err) => {
        console.log(err)
        if(err.status == 401) {
          handleLogout();
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

  const getRenderValue = (value: any, idx: number) => {
    // if(idx == 2) {
    //     const date = new Date(value); 
    //     // Using toLocaleDateString() for basic formatting
    //     // return date.toLocaleDateString(); 

    //     const formattedDate = new Intl.DateTimeFormat('en-US', { 
    //         year: 'numeric', 
    //         month: 'long', 
    //         day: 'numeric' 
    //       }).format(date);
    //     return formattedDate;  

    // } else {
    //     return value;
    // }
    return value;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead className='table-header'>
            <TableRow>
                {
                    getHeadings(data).map((title, i) => (
                        <TableCell key={i}>{title}</TableCell>
                    ))
                }
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i}>
                    {
                        Object.values(row).map((value: any, j) => (
                            <TableCell key={j}>{getRenderValue(value, j)}</TableCell>
                        ))
                    }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default XTable;