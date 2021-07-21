import { GET_TOKEN, GET_USER_INFO, GET_ONE_SIGNAL_DETAILS, GET_USER_PARTICULAR, LOGOUT } from "../constants";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function getToken(token) {
  return {
    type: GET_TOKEN,
    token
  };
}

export function getUserInfo(user) {
  return {
    type: GET_USER_INFO,
    user
  };
}

export function setOneSignalDetails(onesignal) {
  return {
    type: GET_ONE_SIGNAL_DETAILS,
    onesignal
  };
}

export function getUserParticularRegister(userParticular) {
  return {
    type: GET_USER_PARTICULAR,
    userParticular
  }
}

export function logoutAction() {
  return {
    type: LOGOUT,
  }
}

export function getLogout() {
  return {
    type: PURGE,
    key: "root",
    storage,
    result: () => null
  };
}
