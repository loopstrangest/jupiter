import axios from "axios";
import { forecastURL } from "../api";

//Load games by default
export const fetchAndSummarizeForecast = (zipcode) => async (dispatch) => {
  //fetch data
  try {
    const forecastAPIData = await axios.get(forecastURL(zipcode));
  } catch (err) {
    return;
  }
  const forecastAPIData = await axios.get(forecastURL(zipcode));
  var forecastByDate = [];
  var previousDate = null;
  var currentDate;
  //analyze each returned forecast data entry (one every three hours for five days)
  forecastAPIData.data.list.forEach((forecastEntry, index) => {
    currentDate = forecastEntry.dt_txt.substring(0, 10);
    //If the entry is for a new date, create a new entry in the forecastByDate list
    if (index == 0 || currentDate != previousDate) {
      var newForecast = {
        date: currentDate,
        time: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
        weatherMain: [forecastEntry.weather[0].main],
        weatherDesc: [forecastEntry.weather[0].description],
        weatherIcon: [forecastEntry.weather[0].icon],
        tempLow: forecastEntry.main.temp,
        tempHigh: forecastEntry.main.temp,
        rain: "rain" in forecastEntry ? forecastEntry.rain["3h"] : undefined,
      };
      forecastByDate.push(newForecast);
    }
    //Otherwise, the entry is for the same date. Add new hourly data. Compare and update temperature and rain data.
    else {
      //update weather
      forecastByDate[forecastByDate.length - 1].weatherMain.push(
        forecastEntry.weather[0].main
      );
      forecastByDate[forecastByDate.length - 1].weatherDesc.push(
        forecastEntry.weather[0].description
      );
      forecastByDate[forecastByDate.length - 1].weatherIcon.push(
        forecastEntry.weather[0].icon
      );
      //update temperature
      forecastByDate[forecastByDate.length - 1].tempLow = Math.min(
        forecastByDate[forecastByDate.length - 1].tempLow,
        forecastEntry.main.temp
      );
      forecastByDate[forecastByDate.length - 1].tempHigh = Math.max(
        forecastByDate[forecastByDate.length - 1].tempHigh,
        forecastEntry.main.temp
      );
      //update rain
      if (!"rain" in forecastByDate[forecastByDate.length - 1]) {
        forecastByDate[forecastByDate.length - 1].rain =
          "rain" in forecastEntry ? forecastEntry.rain["3h"] : undefined;
      }
    }
    previousDate = currentDate;
  });

  dispatch({
    type: "FETCH_FORECAST",
    payload: {
      zipcode: zipcode,
      city: forecastAPIData.data.city.name,
      forecastAPIList: forecastAPIData.data.list,
      forecastByDate: forecastByDate,
    },
  });
};
