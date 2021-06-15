//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Forecast = ({
  date,
  time,
  weatherMain,
  weatherDesc,
  icon,
  temp,
  tempLow,
  tempHigh,
  rain,
  rainChance,
  wind,
}) => {
  const getWeather = (time, weatherMain, weatherDesc, icon) => {
    const weather = [];
    weatherMain.forEach((entry, i) => {
      var iconURL = "http://openweathermap.org/img/wn/" + icon[i] + "@2x.png";
      weather.push(
        <StyledWeather key={`weather-${i}`}>
          <p>
            <strong>{time[i]}</strong>
            <br />
          </p>
          <img src={iconURL} alt={weatherDesc}></img>
          <br />
          <p>
            {weatherDesc[i].charAt(0).toUpperCase() + weatherDesc[i].slice(1)}
            <br />
            {temp[i]}°
            <br />
            {rainChance[i]}
            <br />
            {wind[i]}
          </p>
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
        {tempHigh}° | {tempLow}°{rain > 0 ? <br /> : ""}
        {rain > 0 ? "💧 Rain Expected 💧" : ""}
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
    margin-bottom: 0.5rem;
  }

  .weatherDisplay {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
`;

const StyledWeather = styled(motion.div)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 25%;
  min-width: 150px;
  margin-bottom: 0.5rem;

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
