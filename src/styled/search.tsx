import styled from "@emotion/styled";
import { Box, Button, TableCell, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: left;
  margin: 16px 0px 20px 0px;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 25px;

    .MuiOutlinedInput-root {
      border-radius: 25px;
      padding: 6px 10px;

      &:hover {
        background-color: #e0e0e0;
      }

      .MuiOutlinedInput-notchedOutline {
        border-color: #1976d2;
      }

      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #1565c0;
        border-width: 2px;
      }
      input {
        padding: 5px 14px !important;
      }
    }
  }
`;

export const SearchIcon = styled(Search)`
  color: #1976d2;
  cursor: pointer;
`;

export const BoxContainer = styled(Box)`
  display: flex;
  gap: 6px;
  margin-top: 10px;
  margin-left: auto;
  @media screen and (max-width: 1200px) {
    margin-top: 16px;
    margin-left: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 500px;
    flex-wrap: wrap;
  }
`;

export const StyledTableCell = styled(TableCell)`
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  &:hover {
    overflow: visible;
  }
`;

export const FilterButton = styled(Button)`
  padding: 4px 10px;
  font-size: 12px;
  border: 1px dashed rgb(209, 213, 219);
  color: rgb(75, 84, 99);
  background-color: rgb(255, 255, 255);
  text-transform: capitalize;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  &:hover {
    background-color: rgb(228, 227, 227);
    border: 1px dashed rgb(228, 227, 227);
  }
`;
