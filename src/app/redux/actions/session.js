import * as constants from "../constants";

export function setSessionsAction(sessions) {
  return {
    type: constants.GET_SESSIONS,
    sessions,
  };
}

export function setSessionsWithRecurrenceAction(sessionsWithRecurrence) {
  return {
    type: constants.GET_SESSIONS_WITH_RECURRENCE,
    sessionsWithRecurrence,
  };
}

export function setSessionsWithoutRecurrenceAction(sessionsWithoutRecurrence) {
  return {
    type: constants.GET_SESSIONS_WITHOUT_RECURRENCE,
    sessionsWithoutRecurrence,
  };
}

export function setSessionsSearchAction(sessionsSearch) {
  return {
    type: constants.GET_SESSIONS_SEARCH,
    sessionsSearch,
  };
}

export function setSessionsUserAction(sessionsUser) {
  return {
    type: constants.GET_SESSIONS_USER,
    sessionsUser,
  };
}

export function setSessionDataModeAction(sessionDataMode) {
  return {
    type: constants.SET_SESSION_MODE,
    sessionDataMode,
  };
}

export function setCreateSession(session) {
  return {
    type: constants.GET_SESSION,
    session,
  };
}

export function setSessionsRegular(sessionsRegular) {
  return {
    type: constants.SET_SESSIONS_REGULAR,
    sessionsRegular,
  };
}

export function setSessionsRegularFilter(sessionsRegularFilter) {
  return {
    type: constants.SET_SESSIONS_REGULAR_FILTER,
    sessionsRegularFilter,
  };
}

export function setSessionsUnique(sessionsUnique) {
  return {
    type: constants.SET_SESSIONS_UNIQUE,
    sessionsUnique,
  };
}
