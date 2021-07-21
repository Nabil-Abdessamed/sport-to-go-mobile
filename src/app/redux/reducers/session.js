import * as constants from "../constants";
import SessionConstants from "../../components/session/Constants";

const payload = {
  currentPage: 0,
  itemsPerPage: 20,
  totalPages: 0,
  totalItems: 0,
  itemsCount: 0,
  items: [],
};

const SessionsDto = {
  page: 0,
  size: 20,
  itemsCount: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
};

const initialState = {
  sessions: payload,
  sessionsWithRecurrence: payload,
  sessionsWithoutRecurrence: payload,
  sessionsSearch: payload,
  sessionsUser: payload,
  session: null,
  sessionDataMode: SessionConstants.SessionAllData,
  sessionsRegular: SessionsDto,
  sessionsRegularFilter: null,
  sessionsUnique: SessionsDto,
};

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_SESSIONS:
      return {
        ...state,
        sessions: action.sessions,
      };
    case constants.GET_SESSIONS_WITH_RECURRENCE:
      return {
        ...state,
        sessionsWithRecurrence: action.sessionsWithRecurrence,
      };
    case constants.GET_SESSIONS_WITHOUT_RECURRENCE:
      return {
        ...state,
        sessionsWithoutRecurrence: action.sessionsWithoutRecurrence,
      };
    case constants.GET_SESSIONS_SEARCH:
      return {
        ...state,
        sessionsSearch: action.sessionsSearch,
      };
    case constants.GET_SESSIONS_USER:
      return {
        ...state,
        sessionsUser: action.sessionsUser,
      };
    case constants.SET_SESSION_MODE:
      return {
        ...state,
        sessionDataMode: action.sessionDataMode,
      };
    case constants.GET_SESSION:
      return {
        ...state,
        session: action.session,
      };
    case constants.SET_SESSIONS_REGULAR:
      return { ...state, sessionsRegular: action.sessionsRegular };
    case constants.SET_SESSIONS_UNIQUE:
      return { ...state, sessionsUnique: action.sessionsUnique };
    case constants.SET_SESSIONS_REGULAR_FILTER:
      return { ...state, sessionsRegularFilter: action.sessionsRegularFilter };
    default:
      return state;
  }
}

export default {
  initialState,
  sessionReducer,
};
