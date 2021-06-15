//api docs: https://openweathermap.org/api/hourly-forecast
const api_key = process.env.REACT_APP_API_KEY;

//api call
const forecast_url_base = `https://api.openweathermap.org/data/2.5/forecast?zip=`;
const api_key_param = `&appid=${api_key}`;
const units_param = `&units=imperial`;

export const forecastURL = (zip_code) =>
  `${forecast_url_base}${zip_code}${units_param}${api_key_param}`;
