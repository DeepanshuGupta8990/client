import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6%;
`;

interface XNoDataFoundProps {
  message: string;
}

const XNoDataFound: React.FC<XNoDataFoundProps> = ({ message }) => {
  return (
    <DivContainer>
      <Typography style={{ padding: 20 }} className="typography">
        {message}
      </Typography>
    </DivContainer>
  );
};

export default XNoDataFound;
