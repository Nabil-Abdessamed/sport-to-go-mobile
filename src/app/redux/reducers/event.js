import * as constants from "../constants";

const initialState = {
  events: [],
  eventsSearch: [],
  event: null,
  eventMode: "DATA",
};

export function eventReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case constants.GET_EVENTS_SEARCH:
      return {
        ...state,
        eventsSearch: action.eventsSearch,
      };
    case constants.SET_EVENT_MODE:
      return {
        ...state,
        eventMode: action.eventMode,
      };
    case constants.GET_EVENT:
      return {
        ...state,
        event: action.event,
      };
    default:
      return state;
  }
}

export default {
  initialState,
  eventReducer,
};
