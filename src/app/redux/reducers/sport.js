import * as constants from "../constants";

const initialState = {
  sports: null
};

export function sportReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_SPORT:
      return {
        ...state,
        sports: action.sports
      };
    default:
      return state;
  }
}
