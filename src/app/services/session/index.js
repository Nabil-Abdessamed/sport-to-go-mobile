import { globalApiConfig } from "@config";

export async function getSessionsService() {
  return await globalApiConfig.get("/sessions");
}

export async function getOneSessionService(id) {
  return await globalApiConfig.get(`/sessions/${id}`);
}

export async function getSessionsPaginationService(params) {
  return await globalApiConfig.get("/sessions/pagination", { params });
}

export async function getSessionsRecurrenceMode(params) {
  return await globalApiConfig.get("/sessions/mode", { params });
}

export async function getUserSessionsService(user, params) {
  return await globalApiConfig.get(`/sessions/users/${user}`, { params });
}

export async function getSessionsBySearchService(params) {
  return await globalApiConfig.get("/sessions/filter", { params });
}

export async function saveSessionService(data) {
  return await globalApiConfig.post("/sessions", data);
}

export async function saveSessionService2(data) {
  return await globalApiConfig.post("/sessions-regular", data);
}

export async function subscribeToSessionService(id) {
  return await globalApiConfig.post(`/session-subscribe/${id}`, {});
}

export async function unSubscribeToSessionService(id) {
  return await globalApiConfig.post(`/session-subscribe/${id}/unsubscribe`, {});
}

export async function updateSessionService(data) {
  return await globalApiConfig.put(`/sessions`, data);
}

export async function deleteSessionService(id) {
  return await globalApiConfig.delete(`/sessions/${id}`);
}

export async function getSessionSubscribersService(id) {
  return await globalApiConfig.get(`/session-subscribe/${id}/users`);
}

export default {
  getSessionsService,
  getOneSessionService,
  getSessionsRecurrenceMode,
  getUserSessionsService,
  getSessionsBySearchService,
  saveSessionService,
  subscribeToSessionService,
  unSubscribeToSessionService,
  updateSessionService,
  deleteSessionService,
  getSessionSubscribersService,
  getSessionsPaginationService,
};
