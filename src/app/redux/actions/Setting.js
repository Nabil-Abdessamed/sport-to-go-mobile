import * as constants from "../constants";

export function getSoundState(sound) {
  return {
    type: constants.GET_SOUND_STATE,
    sound
  };
}
export function getVibrationState(vibration) {
  return {
    type: constants.GET_VIBRATION_STATE,
    vibration
  };
}
export function getCurrentLanguage(language) {
  return {
    type: constants.GET_CURRENT_LANGUAGE,
    language
  };
}
