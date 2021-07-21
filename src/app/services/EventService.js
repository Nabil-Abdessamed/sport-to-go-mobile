import { globalApiConfig } from "@config";

export async function getEventsService() {
  return await globalApiConfig.get("/events");
}

export async function getEventsBySearchService(data) {
  return await globalApiConfig.get("/events/filter", {
    params: data,
  });
}

export async function getEventByIdService(id) {
  return await globalApiConfig.get(`events/${id}`);
}

export async function saveEventService(data) {
  return await globalApiConfig.post("/events", data);
}

export async function updateEventService(data) {
  return await globalApiConfig.put("/events/", data);
}

export async function deleteEventSerivce(data) {
  return await globalApiConfig.delete("/events/" + data);
}

export async function uploadFile(data) {
  return await globalApiConfig.post("/events/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function subscribeToEventService(id) {
  return await globalApiConfig.post(`/event-subscribe/${id}`, {});
}

export async function unsubscribeToEventService(id) {
  return await globalApiConfig.post(`/event-subscribe/${id}/unsubscribe`, {});
}

export async function getEventParticipantsService(id) {
  return await globalApiConfig.get(`/event-subscribe/${id}/participants`);
}

export default {
  getEventsService,
  getEventsBySearchService,
  saveEventService,
  updateEventService,
  deleteEventSerivce,
  uploadFile,
  subscribeToEventService,
  unsubscribeToEventService,
  getEventByIdService,
  getEventParticipantsService,
};
