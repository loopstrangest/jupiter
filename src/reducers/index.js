import { combineReducers } from "redux";
import forecastReducer from "./forecastReducer";

const rootReducer = combineReducers({
  forecast: forecastReducer,
});

export default rootReducer;
