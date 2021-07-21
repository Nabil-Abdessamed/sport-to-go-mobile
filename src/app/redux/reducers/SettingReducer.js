import * as constants from "../constants";

const initialState = {
  sound: true,
  vibration: true,
  language: "fr"
};

export function settingReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_SOUND_STATE:
      return {
        ...state,
        sound: action.sound
      };
    case constants.GET_VIBRATION_STATE:
      return {
        ...state,
        vibration: action.vibration
      };
    case constants.GET_CURRENT_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
}
