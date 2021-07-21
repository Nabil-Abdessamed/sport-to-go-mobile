import React, { useState, useCallback } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { STGChatMessage, STGContainer, STGSendMessage } from "stg-ui";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getMessagesByConversationService,
  sendMessageService,
  changeMessagesStatusService,
  getConversationService,
} from "@services";
import {
  getMessagesCountAction,
  getMessagesAction,
  getCurrentOpenedChatAction,
} from "@redux/actions";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import HeaderLeft from "./Header";

export default function ChatMessage() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => (
      <HeaderLeft
        conversation={conversation}
        onPressButtonBack={onPressButtonBack}
      />
    ),
  });
  const { params } = useRoute();
  // States
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // States - Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { messages } = useSelector((state) => state.chat, shallowEqual);

  const onPressButtonBack = () => {
    navigation.goBack();
  };

  const getConversation = async () => {
    const { item, from } = params;
    if (from === "conversations") {
      setConversation(item);
      getMessagesByConversation(item.id);
      dispatch(getCurrentOpenedChatAction(item));
      changeMessagesStatus(item.id);
    } else {
      setLoading(true);
      const { data, status } = await getConversationService(
        item.userId || item.id
      );
      setLoading(false);
      if (status === 200) {
        setConversation(data);
        dispatch(getCurrentOpenedChatAction(data));
        getMessagesByConversation(data.id);
        changeMessagesStatus(data.id);
      }
    }
  };

  const getMessagesByConversation = async (id) => {
    const { data, status } = await getMessagesByConversationService(id);
    if (status === 200) {
      dispatch(getMessagesAction(data));
    } else {
      dispatch(getMessagesAction([]));
    }
  };

  const onSendClick = async () => {
    const request = {
      message,
      conversation,
    };
    const { status, data } = await sendMessageService(request);
    if (status === 201) {
      setMessage("");
      getMessagesByConversation(conversation.id);
    }
  };

  const changeMessagesStatus = async (id) => {
    const { data, status } = await changeMessagesStatusService(id);
    if (status === 201) {
      dispatch(getMessagesCountAction(data));
    }
  };

  const onMessageTextChange = (message) => {
    setMessage(message);
  };

  useFocusEffect(
    useCallback(() => {
      if (params) {
        getConversation();
      }
      return () => {
        dispatch(getCurrentOpenedChatAction(null));
        dispatch(getMessagesAction([]));
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading}>
        <FlatList
          inverted
          invertStickyHeaders
          contentInsetAdjustmentBehavior="automatic"
          scrollEnabled
          data={messages}
          keyExtractor={(_, index) => `message-index-${index}`}
          renderItem={({ item }) => (
            <STGChatMessage
              text={item.message}
              isLeft={item.userId !== user.id}
            />
          )}
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 5,
          }}
        />
        <STGSendMessage
          defaultValue={message}
          onSendClick={onSendClick}
          onMessageTextChange={onMessageTextChange}
        />
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
