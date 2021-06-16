const initialState = {
  tempUnit: "°F",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_TEMP_UNIT":
      return {
        ...state,
        tempUnit: state.tempUnit == "°F" ? "°C" : "°F",
      };
    default:
      return { ...state };
  }
};

export default appReducer;
