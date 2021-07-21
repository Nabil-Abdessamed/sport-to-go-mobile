import * as constants from "../constants";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function getEmailInput(email) {
  return {
    type: constants.GET_EMAIL_INPUT,
    email
  };
}

export function getPasswordInput(password) {
  return {
    type: constants.GET_PASSWORD_INPUT,
    password
  };
}

export function getConfirmPasswordInput(confirmPassword) {
  return {
    type: constants.GET_CONFIRM_PASSWORD_INPUT,
    confirmPassword
  };
}

export function getFirstnameInput(firstname) {
  return {
    type: constants.GET_FIRSTNAME_INPUT,
    firstname
  };
}

export function getLastnameInput(lastname) {
  return {
    type: constants.GET_LASTNAME_INPUT,
    lastname
  };
}

export function getActivationCodeInput(code) {
  return {
    type: constants.GET_ACTIVATION_CODE_INPUT,
    code
  };
}

export function cleanAllInput() {
  return {
    type: PURGE,
    key: "root",
    storage,
    result: () => null
  };
}
