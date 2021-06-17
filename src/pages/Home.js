import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSummarizeForecast } from "../actions/searchAction";

//components
import Search from "../components/Search";
import Location from "../components/Location";
import TempToggle from "../components/TempToggle";
import Forecast from "../components/Forecast";
import Explainer from "../components/Explainer";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //fetch default forecast
  const dispatch = useDispatch();
  const defaultZipCode = "10003";
  useEffect(() => {
    dispatch(fetchAndSummarizeForecast(defaultZipCode));
  }, [dispatch]);

  const toggleExplainer = () => {
    dispatch({ type: "TOGGLE_EXPLAINER" });
  };

  //get data
  const { showExplainer } = useSelector((state) => state.app);
  const { zipcode, city, forecastByDate } = useSelector(
    (state) => state.forecast
  );

  //use fontawesomeicon
  const question = (
    <FontAwesomeIcon
      class="question"
      onClick={toggleExplainer}
      icon={faQuestion}
    />
  );
  return (
    <App>
      {showExplainer ? <Explainer /> : ""}
      <TempToggle />
      {question}
      <h1>Jupiter</h1>
      <h3>Check the weather forecast for your zip code</h3>
      <Search />
      <Location zip={zipcode} city={city} />
      <div>
        {forecastByDate.map((forecast) => (
          <Forecast
            key={forecast.date}
            day={forecast.day}
            date={forecast.date}
            time={forecast.time}
            weatherMain={forecast.weatherMain}
            weatherDesc={forecast.weatherDesc}
            icon={forecast.weatherIcon}
            tempF={forecast.tempF}
            tempLowF={forecast.tempLowF}
            tempHighF={forecast.tempHighF}
            tempC={forecast.tempC}
            tempLowC={forecast.tempLowC}
            tempHighC={forecast.tempHighC}
            rain={forecast.rain}
            rainChance={forecast.rainChance}
            wind={forecast.wind}
          />
        ))}
      </div>
    </App>
  );
};

const App = styled(motion.div)`
  h1,
  h3 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .question {
    height: 40px;
    position: absolute;
    right: 10px;
    top: 5px;
    color: #e1ffa1;
    cursor: pointer;
  }
  .question:hover {
    opacity: 1;
    color: #ffb6e6;
  }
  .question path {
    stroke: black;
    stroke-width: 4;
  }
`;

export default Home;
