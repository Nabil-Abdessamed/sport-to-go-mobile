import * as constants from "../constants";

const initialState = {
  messages: [],
  users: [],
  currentMessages: [],
  newMessage: null,
  messagesCount: 0,
  conversation: {
    id: null,
    userOne: null,
    userTwo: null,
    messages: [],
    createdAt: null,
    updatedAt: null,
  },
  conversations: [],
  currentOpenedChat: null,
};

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ON_CHANGE_MESSAGE_TEXT:
      return {
        ...state,
        message: action.message,
      };
    case constants.GET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case constants.GET_CURRENT_MESSAGES:
      return {
        ...state,
        currentMessages: action.currentMessages,
      };
    case constants.ADD_NEW_MESSAGE:
      return {
        ...state,
        currentMessages: [action.newMessage, ...state.currentMessages],
      };
    case constants.GET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case constants.GET_MESSAGES_COUNT:
      return { ...state, messagesCount: action.messagesCount };
    case constants.GET_CONVERSATION:
      return { ...state, conversation: action.conversation };
    case constants.GET_CONVERSATIONS:
      return { ...state, conversations: action.conversations };
    case constants.GET_CURRENT_OPENED_CHAT:
      return {
        ...state,
        currentOpenedChat: action.currentOpenedChat,
      };
    default:
      return state;
  }
}

export default {
  initialState,
  chatReducer,
};
