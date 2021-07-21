import { GET_NOTIFICATIONS_COUNT } from "../constants";
const initialState = {
  notificationsCount: 0
};

export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_COUNT:
      return {
        ...state,
        notificationsCount: action.notificationsCount
      };
    default:
      return state;
  }
}
