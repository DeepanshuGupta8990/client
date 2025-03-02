import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6%;
`;

const NoDataFound = () => {
  return (
    <DivContainer>
      <Typography style={{ padding: 20 }} className="typography">
        No Data Found
      </Typography>
    </DivContainer>
  );
};

export default NoDataFound;
