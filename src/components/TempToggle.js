import { useDispatch, useSelector } from "react-redux";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const TempToggle = () => {
  const dispatch = useDispatch();
  const { tempUnit } = useSelector((state) => state.app);

  function toggleTemp() {
    dispatch({ type: "TOGGLE_TEMP_UNIT" });
  }

  return (
    <StyledTempToggle>
      <p>{tempUnit}</p>
      <label class="switch">
        <input type="checkbox" onChange={toggleTemp}></input>
        <span class="slider round"></span>
      </label>
    </StyledTempToggle>
  );
};

const StyledTempToggle = styled(motion.div)`
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  flex-direction: row;
  margin: auto;

  p {
    width: 20px;
    margin: auto;
    margin-right: 0.55rem;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    cursor: pointer;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e1ffa1;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 5px;
    bottom: 4px;
    background-color: black;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #ffb6e6;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  .slider.round {
    border-radius: 28px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export default TempToggle;
