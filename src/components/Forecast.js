//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Forecast = ({
  date,
  time,
  weatherMain,
  weatherDesc,
  icon,
  tempLow,
  tempHigh,
  rain,
}) => {
  const getWeather = (time, weatherMain, weatherDesc, icon) => {
    const weather = [];
    weatherMain.forEach((entry, i) => {
      var iconURL = "http://openweathermap.org/img/wn/" + icon[i] + "@2x.png";
      weather.push(
        <StyledWeather>
          <p>
            {time[i]}
            <br />
            {weatherDesc[i].charAt(0).toUpperCase() + weatherDesc[i].slice(1)}
          </p>
          <img src={iconURL}></img>
        </StyledWeather>
      );
    });
    return weather;
  };

  return (
    <StyledForecast>
      <h3>
        {date}
        <br />
        {Math.round(tempHigh)}° | {Math.round(tempLow)}°
      </h3>
      <div className="weatherDisplay">
        {getWeather(time, weatherMain, weatherDesc, icon)}
      </div>
    </StyledForecast>
  );
};

const StyledForecast = styled(motion.div)`
  align-items: center;
  margin: auto;
  border: 1px solid black;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  h3 {
    text-align: center;
    margin: auto;
  }

  .weatherDisplay {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const StyledWeather = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  vertical-align: center;
  width: 25%;

  p {
    margin-top: auto;
    margin-bottom: auto;
    word-wrap: normal;
    text-align: center;
  }

  img {
    height: 50px;
    width: 50px;
    margin: auto;
  }
`;

export default Forecast;
