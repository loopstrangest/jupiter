import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSummarizeForecast } from "../actions/searchAction";

//components
import Search from "../components/Search";
import Location from "../components/Location";

import Forecast from "../components/Forecast";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Home = () => {
  //fetch default forecast
  const dispatch = useDispatch();
  const defaultZipCode = "10003";
  useEffect(() => {
    dispatch(fetchAndSummarizeForecast(defaultZipCode));
  }, [dispatch]);
  //get data
  const { zipcode, city, forecastAPIList, forecastByDate } = useSelector(
    (state) => state.forecast
  );
  return (
    <App>
      <h1>Jupiter</h1>
      <h3>Check the weather for your zip code</h3>
      <Search />
      <Location zip={zipcode} city={city} />
      <div>
        {forecastByDate.map((forecast) => (
          <Forecast
            date={forecast.date}
            time={forecast.time}
            weatherMain={forecast.weatherMain}
            weatherDesc={forecast.weatherDesc}
            icon={forecast.weatherIcon}
            tempLow={forecast.tempLow}
            tempHigh={forecast.tempHigh}
            rain={forecast.rain}
          />
        ))}
      </div>
    </App>
  );
};

const App = styled(motion.div)``;

export default Home;
