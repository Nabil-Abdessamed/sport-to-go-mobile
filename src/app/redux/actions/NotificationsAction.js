import { GET_NOTIFICATIONS_COUNT } from "../constants";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function getNotificationsCountAction(notificationsCount) {
  return {
    type: GET_NOTIFICATIONS_COUNT,
    notificationsCount
  };
}

export function cleanNotificationData() {
  return {
    type: PURGE,
    key: "root",
    storage,
    result: () => null
  };
}
