import { store } from "@redux/stores";
import SessionService from "@services/session";
import {
  setSessionsAction,
  setSessionsWithRecurrenceAction,
  setSessionsWithoutRecurrenceAction,
  setSessionsSearchAction,
  setSessionsUserAction,
  setSessionDataModeAction,
} from "@redux/actions";
import Constants from "./Constants";

const getSessionsPagination = async (page = 0, size = 20) => {
  const { data, status } = await SessionService.getSessionsPaginationService({
    page,
    size,
  });
  store.dispatch(setSessionDataModeAction(Constants.SessionAllData));
  if (status === 200) {
    store.dispatch(setSessionsAction(data));
  } else {
    store.dispatch(setSessionsAction(null));
  }
};

const getUserSessions = async (user, page = 0, size = 20) => {
  const { data, status } = await SessionService.getUserSessionsService(user, {
    page,
    size,
  });
  store.dispatch(setSessionDataModeAction(Constants.UserSessions));
  if (status === 200) {
    store.dispatch(setSessionsUserAction(data));
  } else {
    store.dispatch(setSessionsUserAction(null));
  }
};

const getSessionsBySearch = async (filter, page = 0, size = 20) => {
  for (const f in filter) {
    if (filter[f] === null || filter[f] === undefined || filter[f] === "") {
      delete filter[f];
    }
  }
  if (filter) {
    const { data, status } = await SessionService.getSessionsBySearchService({
      ...filter,
      page,
      size,
    });
    store.dispatch(setSessionDataModeAction(Constants.SessionSearch));
    if (status === 200) {
      store.dispatch(setSessionsSearchAction(data));
    } else {
      store.dispatch(setSessionsSearch(null));
    }
  }
};

const getSessionsWithRecurrence = async (params) => {
  setSessionDataMode(Constants.SessionWithRecurrence);
  const { data, status } = await SessionService.getSessionsRecurrenceMode({
    ...params,
    mode: 1,
  });
  store.dispatch(setSessionDataModeAction(Constants.SessionWithRecurrence));
  if (status === 200) {
    store.dispatch(setSessionsWithRecurrenceAction(data));
  } else {
    store.dispatch(setSessionsWithRecurrenceAction(null));
  }
};

const getSessionsWithoutRecurrence = async (params) => {
  setSessionDataMode(Constants.SessionWithoutRecurrence);
  const { data, status } = await SessionService.getSessionsRecurrenceMode({
    ...params,
    mode: 0,
  });
  store.dispatch(setSessionDataModeAction(Constants.SessionWithoutRecurrence));
  if (status === 200) {
    store.dispatch(setSessionsWithoutRecurrenceAction(data));
  } else {
    store.dispatch(setSessionsWithoutRecurrenceAction(null));
  }
};

export default {
  getSessionsPagination,
  getUserSessions,
  getSessionsBySearch,
  getSessionsWithRecurrence,
  getSessionsWithoutRecurrence,
};
