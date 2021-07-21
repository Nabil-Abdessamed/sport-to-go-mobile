import * as constants from "../constants";
import { PURGE } from "redux-persist";

const initialState = {
  email: null,
  password: null,
  confirmPassword: null,
  firstname: null,
  lastname: null
};

export function inputReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_EMAIL_INPUT:
      return {
        ...state,
        email: action.email
      };
    case constants.GET_PASSWORD_INPUT:
      return {
        ...state,
        password: action.password
      };
    case constants.GET_CONFIRM_PASSWORD_INPUT:
      return {
        ...state,
        confirmPassword: action.confirmPassword
      };
    case constants.GET_FIRSTNAME_INPUT:
      return {
        ...state,
        firstname: action.firstname
      };
    case constants.GET_LASTNAME_INPUT:
      return {
        ...state,
        lastname: action.lastname
      };
    case constants.GET_ACTIVATION_CODE_INPUT:
      return {
        ...state,
        code: action.code
      };
    case PURGE: {
      return initialState;
    }
    default:
      return state;
  }
}
