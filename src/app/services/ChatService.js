import { globalApiConfig } from "@config";

export async function getUsersService() {
  return await globalApiConfig.get("/users/chat");
}

export async function getConversationsService() {
  return await globalApiConfig.get("/conversations");
}

export async function getConversationMessagesService(id) {
  return await globalApiConfig.get(`/conversations/${id}`);
}

export async function getMessagesByConversationService(id) {
  return await globalApiConfig.get(`/messages/${id}/conversation`);
}

export async function sendMessageService(data) {
  return await globalApiConfig.post(`/messages`, data);
}

export async function getConversationService(userTwoId) {
  return await globalApiConfig.get(`/conversations/${userTwoId}`);
}

export async function changeMessagesStatusService(conversationId) {
  return await globalApiConfig.post(`/messages/${conversationId}/changestatus`);
}

export async function getMessagesCounterService() {
  return await globalApiConfig.get("/messages/counter/unreadmessages");
}
