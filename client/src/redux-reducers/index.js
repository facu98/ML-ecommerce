const initialState = {
  results: [],
  filtered: [],
  categories: [],
  users: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        results: action.payload,
      };

    case "SEARCH_BY_CATEGORY":
      return {
        ...state,
        results: action.payload,
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
