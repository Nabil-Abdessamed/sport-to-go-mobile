import * as constants from "../constants";

const initialReducer = {
  token: null,
  user: null,
  onesignal: null,
  userParticular: null,
  onesignal: null,
};

export function authReducer(state = initialReducer, action) {
  switch (action.type) {
    case constants.GET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case constants.LOGOUT:
      return {
        ...state,
        ...initialReducer,
      };
    case constants.GET_USER_INFO:
      return {
        ...state,
        user: action.user,
      };
    case constants.GET_ONE_SIGNAL_DETAILS:
      return {
        ...state,
        onesignal: action.onesignal,
      };
    case constants.GET_USER_PARTICULAR:
      return {
        ...state,
        userParticular: action.userParticular,
      };
    default:
      return state;
  }
}
