import * as constants from "../constants";

export function getSportsAction(sports) {
  return {
    type: constants.GET_SPORT,
    sports
  };
}