import * as constants from "../constants";

const initialState = {
  usersPro: null,
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_USERS_PRO:
      return {
        ...state,
        usersPro: action.usersPro,
      };
    default:
      return state;
  }
}

export default {
  initialState,
  usersReducer,
};
