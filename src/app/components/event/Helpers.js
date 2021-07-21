import EventService from "@services/EventService";
import {
  setEventsAction,
  setEventAction,
  setEventsSearchAction,
  setEventModeAction,
} from "@redux/actions";
import { store } from "@redux/stores";

export async function getEvents() {
  const response = await EventService.getEventsService();
  store.dispatch(setEventModeAction("DATA"));
  if (response.status === 200) {
    store.dispatch(setEventsAction(response.data));
  } else {
    store.dispatch(setEventsAction([]));
  }
}

export async function getEventsBySearch(filter) {
  const response = await EventService.getEventsBySearchService(filter);
  store.dispatch(setEventModeAction("SEARCH"));
  if (response.status === 200) {
    store.dispatch(setEventsSearchAction(response.data));
  } else {
    store.dispatch(setEventsSearchAction(null));
  }
}

export async function getEvent(id) {
  const response = await EventService.getEventService(id);
  if (response.status === 200) {
    store.dispatch(setEventAction(response.data));
  } else {
    store.dispatch(setEventAction(null));
  }
}

export default {
  getEvents,
  getEvent,
  getEventsBySearch,
};
