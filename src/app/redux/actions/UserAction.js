import * as constants from "../constants";

export function getUsersProAction(usersPro) {
  return {
    type: constants.GET_USERS_PRO,
    usersPro
  };
}
