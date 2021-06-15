const initialState = {
  zipcode: "[loading]",
  city: "[loading]",
  forecastAPIList: [],
  forecastByDate: [],
};

const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_FORECAST":
      return {
        ...state,
        zipcode: action.payload.zipcode,
        city: action.payload.city,
        forecastAPIList: action.payload.forecastAPIList,
        forecastByDate: action.payload.forecastByDate,
      };
    default:
      return { ...state };
  }
};

export default forecastReducer;
