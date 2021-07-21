import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { STGAvatar, STGFonts } from "stg-ui";
import { BASE_URL } from "@config";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  avatarContainer: {
    padding: 5,
  },
  commentConatiner: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "ghostwhite",
    borderRadius: 10,
    flex: 1,
  },
  partnershipName: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 14,
  },
  comment: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    marginTop: 10,
  },
});

export default function CommentItem({
  item,
  showCommentOptions = () => {},
  onPressCommentUser = () => {},
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={showCommentOptions}
      activeOpacity={1}
    >
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={onPressCommentUser}
      >
        <STGAvatar
          uri={`${BASE_URL}/upload/avatars/${item.avatar}`}
          size={40}
        />
      </TouchableOpacity>
      <View style={styles.commentConatiner}>
        <TouchableOpacity onPress={onPressCommentUser}>
          <Text style={styles.partnershipName}>{item.partnershipName}</Text>
        </TouchableOpacity>
        <Text style={styles.comment}>{item.comment}</Text>
      </View>
    </TouchableOpacity>
  );
}
