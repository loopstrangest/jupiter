import { combineReducers } from "redux";
import forecastReducer from "./forecastReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  forecast: forecastReducer,
  app: appReducer,
});

export default rootReducer;
