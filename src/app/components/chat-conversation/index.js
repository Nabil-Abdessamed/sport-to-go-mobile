import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { STGContainer } from "stg-ui";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getConversationsAction } from "@redux/actions";
import { getConversationsService } from "@services";
import { useNavigation } from "@react-navigation/native";
import ConversationItem from "./Item";

export default function ChatConversation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const conversations = useSelector(
    (state) => state.chat.conversations,
    shallowEqual
  );

  const getConversations = async () => {
    const { data, status } = await getConversationsService();
    if (status === 200) {
      dispatch(getConversationsAction(data));
    } else {
      dispatch(getConversationsAction([]));
    }
  };

  const onPressItem = (item) => {
    navigation.navigate("MessageScreen", {
      item,
      from: "conversations",
    });
  };

  useEffect(() => {
    const willFocusEvent = navigation.addListener("focus", () => {
      getConversations();
    });
    return willFocusEvent;
  }, []);

  return (
    <STGContainer>
      <FlatList
        scrollEnabled
        data={conversations || []}
        keyExtractor={(_, index) => `message-index-${index}`}
        renderItem={({ item }) => (
          <ConversationItem item={item} onPressItem={() => onPressItem(item)} />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 2 }} />}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </STGContainer>
  );
}
