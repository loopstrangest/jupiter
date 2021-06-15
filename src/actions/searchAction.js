import axios from "axios";
import { forecastURL } from "../api";

//Load games by default
export const fetchAndSummarizeForecast = (zipcode) => async (dispatch) => {
  //fetch data
  const forecastAPIData = await axios.get(forecastURL(zipcode));
  var forecastByDate = [];
  var previousDate = null;
  var currentDate;
  var timeMapping = {
    "00:00:00": "12am",
    "03:00:00": "3am",
    "06:00:00": "6am",
    "09:00:00": "9am",
    "12:00:00": "12pm",
    "15:00:00": "3pm",
    "18:00:00": "6pm",
    "21:00:00": "9pm",
  };
  //analyze each returned forecast data entry (one every three hours for five days)
  forecastAPIData.data.list.forEach((forecastEntry, index) => {
    currentDate = forecastEntry.dt_txt.substring(0, 10);
    var APITime = forecastEntry.dt_txt.substring(11, 19);
    var currentTime = timeMapping[APITime];
    //If the entry is for a new date, create a new entry in the forecastByDate list
    if (index === 0 || currentDate !== previousDate) {
      var newForecast = {
        date: currentDate,
        time: [currentTime],
        temp: [Math.round(forecastEntry.main.temp)],
        weatherMain: [forecastEntry.weather[0].main],
        weatherDesc: [capitalizeText(forecastEntry.weather[0].description)],
        weatherIcon: [forecastEntry.weather[0].icon],
        tempLow: Math.round(forecastEntry.main.temp),
        tempHigh: Math.round(forecastEntry.main.temp),
        rain: "rain" in forecastEntry ? forecastEntry.rain["3h"] : 0,
        rainChance: ["💧 " + Math.round(forecastEntry.pop * 100) + "%"],
        wind: [
          degToCompass(forecastEntry.wind.deg) +
            " " +
            Math.round(forecastEntry.wind.speed) +
            " mph",
        ],
      };
      forecastByDate.push(newForecast);
    }
    //Otherwise, the entry is for the same date. Add new hourly data. Compare and update temperature and rain data.
    else {
      //update time
      forecastByDate[forecastByDate.length - 1].time.push(currentTime);
      //update weather
      forecastByDate[forecastByDate.length - 1].weatherMain.push(
        forecastEntry.weather[0].main
      );
      forecastByDate[forecastByDate.length - 1].weatherDesc.push(
        capitalizeText(forecastEntry.weather[0].description)
      );
      forecastByDate[forecastByDate.length - 1].weatherIcon.push(
        forecastEntry.weather[0].icon
      );
      //update temperature
      forecastByDate[forecastByDate.length - 1].temp.push(
        Math.round(forecastEntry.main.temp)
      );
      forecastByDate[forecastByDate.length - 1].tempLow = Math.min(
        Math.round(forecastByDate[forecastByDate.length - 1].tempLow),
        Math.round(forecastEntry.main.temp)
      );
      forecastByDate[forecastByDate.length - 1].tempHigh = Math.max(
        Math.round(forecastByDate[forecastByDate.length - 1].tempHigh),
        Math.round(forecastEntry.main.temp)
      );
      //update rain
      if ("rain" in forecastEntry) {
        forecastByDate[forecastByDate.length - 1].rain +=
          forecastEntry.rain["3h"];
      }
      forecastByDate[forecastByDate.length - 1].rainChance.push(
        "💧 " + Math.round(forecastEntry.pop * 100) + "%"
      );
      //update wind
      forecastByDate[forecastByDate.length - 1].wind.push(
        degToCompass(forecastEntry.wind.deg) +
          " " +
          Math.round(forecastEntry.wind.speed) +
          " mph"
      );
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

function degToCompass(deg) {
  var val = Math.round(deg / 22.5 + 0.5);
  var compassArr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return compassArr[val % 16];
}

function capitalizeText(text) {
  return text
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}
