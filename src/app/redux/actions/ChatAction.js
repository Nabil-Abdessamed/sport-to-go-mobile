import * as constants from "../constants";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function getCurrentMessagesAction(currentMessages) {
  return {
    type: constants.GET_CURRENT_MESSAGES,
    currentMessages
  };
}

export function addNewMessageAction(newMessage) {
  return {
    type: constants.ADD_NEW_MESSAGE,
    newMessage
  };
}

export function onChangeMessageTextAction(message) {
  return {
    type: constants.ON_CHANGE_MESSAGE_TEXT,
    message
  };
}

export function getMessagesAction(messages) {
  return {
    type: constants.GET_MESSAGES,
    messages
  };
}

export function getMessagesCountAction(messagesCount) {
  return {
    type: constants.GET_MESSAGES_COUNT,
    messagesCount
  };
}

export function getUsersAction(users) {
  return {
    type: constants.GET_USERS,
    users
  };
}

export function getConversationAction(conversation) {
  return {
    type: constants.GET_CONVERSATION,
    conversation
  };
}

export function getConversationsAction(conversations) {
  return {
    type: constants.GET_CONVERSATIONS,
    conversations
  };
}

export function getCurrentOpenedChatAction(currentOpenedChat) {
  return {
    type: constants.GET_CURRENT_OPENED_CHAT,
    currentOpenedChat
  }
}

export function cleanChatData() {
  return {
    type: PURGE,
    key: "root",
    storage,
    result: () => null
  };
}
