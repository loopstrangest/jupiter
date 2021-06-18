import { useSelector } from "react-redux";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Forecast = ({
  day,
  date,
  time,
  weatherMain,
  weatherDesc,
  icon,
  tempF,
  tempLowF,
  tempHighF,
  tempC,
  tempLowC,
  tempHighC,
  rain,
  rainChance,
  wind,
}) => {
  const { tempUnit } = useSelector((state) => state.app);

  //Create and populate weather elements for each forecast date
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
          <p>
            {weatherDesc[i].charAt(0).toUpperCase() + weatherDesc[i].slice(1)}
            <br />
            {tempUnit === "°F" ? tempF[i] + "°" : tempC[i] + "°"}
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
        {day}
        <br />
        {date}
        <br />
        {tempUnit === "°F"
          ? tempHighF + "° | " + tempLowF + "°"
          : tempHighC + "° | " + tempLowC + "°"}
        {rain > 0 ? <br /> : ""}
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
  margin-bottom: 0.25rem;
  border-bottom: 3px solid black;
  :last-child {
    border-bottom: none;
    margin-bottom: 1rem;
  }

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 96%;

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
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 24%;
  min-width: 160px;
  max-width: 200px;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-bottom: 0.5rem;

  p {
    margin-top: auto;
    margin-bottom: auto;
    word-wrap: normal;
    text-align: center;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  img {
    height: 50px;
    width: 50px;
    margin: auto;
  }
`;

export default Forecast;
