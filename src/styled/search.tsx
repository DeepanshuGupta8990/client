import styled from "@emotion/styled";
import { Box, TableCell, TextField } from "@mui/material";
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

export const TimeFilter = styled(Box)`
  display: flex;
  border: 1px solid #1565c0;
  border-radius: 5px;
  margin-top: 20px;
  @media screen and (max-width: 1290px) {
    margin: 0px 0px 0px 20px;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
    max-width: 400px;
    flex-wrap: wrap;
  }
`;

export const FilterButton = styled(Box)`
  display: flex;
  cursor: pointer;
  padding: 5px;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #1565c0;
  &:last-child {
    border-right: 0px;
  }

  &:hover {
    background: #1565c0;
    color: #fff;
  }
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
