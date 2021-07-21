import * as Constants from "../constants";

const initialState = {
  items: [],
};

export function b2bReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.GET_B2B_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
}

export default {
  initialState,
  b2bReducer,
};
