//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Location = ({ zip, city }) => {
  return (
    <StyledLocation>
      <p>
        Forecast for zip code {zip}, city of {city}:
      </p>
    </StyledLocation>
  );
};

const StyledLocation = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  p {
    margin: auto;
    text-align: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

export default Location;
