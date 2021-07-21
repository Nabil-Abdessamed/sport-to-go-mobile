import * as constants from "../constants";

export function setEventsAction(events) {
  return {
    type: constants.GET_EVENTS,
    events,
  };
}

export function setEventsSearchAction(eventsSearch) {
  return {
    type: constants.GET_EVENTS_SEARCH,
    eventsSearch,
  };
}

export function setEventModeAction(eventMode) {
  return {
    type: constants.SET_EVENT_MODE,
    eventMode,
  };
}

export function setEventAction(event) {
  return {
    type: constants.GET_EVENT,
    event,
  };
}
