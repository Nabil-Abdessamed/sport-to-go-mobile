import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  STGContainer,
  STGBody,
  STGAvatar,
  STGHeaderBack,
  STGActionSheet,
  STGCommentEdit,
  STGImage,
} from "stg-ui";
import { BASE_URL } from "@config";
import Styles from "./Styles";
import commonStyles from "../styles";
import SpaceB2BService from "@services/SpaceB2BService";
import * as Animatable from "react-native-animatable";
import CommentItem from "./CommentItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Constants from "./Constants";
import STGVideo from "stg-ui/STGVideo";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Details() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentOptionsVisible, setCommentOptionsVisible] = useState(false);
  const [commentEditVisible, setCommentEditVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const filetype =
    (item && item.filetype && item.filetype.substr(0, 5)) || null;

  const getComments = async () => {
    const i = params.item;
    if (i) {
      const response = await SpaceB2BService.getItemComments(i.id);
      if (response.status === 200) {
        setComments(response.data);
      } else {
        setComments([]);
      }
    }
  };

  const saveComment = async () => {
    if (comment !== "") {
      const response = await SpaceB2BService.saveComment({
        comment,
        b2bId: item.id,
      });
      Keyboard.dismiss();
      if (response.status === 201) {
        setComment("");
        getComments();
      }
      if (response.status === 404) {
        Alert.alert("404", "Comment error saving");
      }
      if (response.status === 500) {
        Alert.alert("500", "Comment error saving");
      }
    }
  };

  const updateComment = async () => {
    if (selectedComment.comment !== "") {
      hideCommentEdit();
      const response = await SpaceB2BService.updateComment({
        id: selectedComment.id,
        comment: selectedComment.comment,
      });
      if (response.status === 200) {
        getComments();
      }
      if (response.status === 404) {
        Alert.alert("404", "Comment error saving");
      }
      if (response.status === 500) {
        Alert.alert("500", "Comment error saving");
      }
    }
  };

  const deleteComment = async () => {
    hideCommentOptions();
    if (selectedComment.comment !== "") {
      const response = await SpaceB2BService.deleteComment(selectedComment.id);
      if (response.status === 200) {
        getComments();
      }
    }
  };

  const onPressCommentUser = (userId) => {
    +userId === +user.id
    ? navigation.navigate("MySpace")
    : navigation.navigate("ProfileShow", {
        user: userId,
      });
  }

  const _renderComments = () => {
    const commentItems = comments.map((item, key) => (
      <CommentItem
        item={item}
        key={`b2b-comment-key-${key}`}
        showCommentOptions={() => showCommentOptions(item)}
        onPressCommentUser={() => onPressCommentUser(item.userId)}
      />
    ));
    return commentItems;
  };

  const hideCommentOptions = () => {
    setCommentOptionsVisible(false);
    setSelectedComment(null);
  };

  const showCommentOptions = (selectedComment) => {
    if (user.id === +selectedComment.userId) {
      setCommentOptionsVisible(true);
      setSelectedComment(selectedComment);
    }
  };

  const onPressEditComment = () => {
    if (selectedComment) {
      setCommentOptionsVisible(false);
      setTimeout(() => {
        showCommentEdit();
      }, 500);
    }
  };

  const onPressDeleteComment = () => {
    if (selectedComment) {
      deleteComment();
    }
  };

  const showCommentEdit = () => {
    setCommentEditVisible(true);
  };

  const hideCommentEdit = () => {
    setCommentEditVisible(false);
  };

  const handleCommentChangeText = (text) => {
    const sc = { ...selectedComment };
    sc.comment = text;
    setSelectedComment(sc);
  };

  const showOptions = () => {
    setOptionsVisible(true);
  };

  const hideOptions = () => {
    setOptionsVisible(false);
  };

  const onPressEdit = () => {
    if (item) {
      setOptionsVisible(false);
      navigation.navigate("SpaceB2BCreate", {
        mode: Constants.MODE_EDIT,
        item,
      });
    }
  };

  const deleteItem = async () => {
    setOptionsVisible(false);
    const response = await SpaceB2BService.remove(item.id);
    if (response.status === 200) {
      navigation.goBack();
    }
    if (response.status === 404) {
      Alert.alert("Error Not found", "B2B not found");
    }
    if (response.status === 500) {
      Alert.alert("Error Server", "Server Error");
    }
  };

  const onPressDelete = () => {
    Alert.alert(
      t("b2b:deleteTitle"),
      t("b2b:deleteMessage"),
      [
        {
          text: t("common:yes"),
          onPress: deleteItem,
          style: "destructive",
        },
        {
          text: t("common:no"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const onPressUser = () => {
    const owner = item.userId === user.id ? true : false;
    if (owner) {
      navigation.navigate("MySpace");
    } else {
      navigation.navigate("ProfileShow", {
        user: item.userId,
      });
    }
  };

  const onVideoBackPress = () => {
    navigation.goBack();
  };

  const onVideoFullscreenEnter = () => {
    setFullscreen(true);
  };

  const onVideoFullscreenExit = () => {
    setFullscreen(false);
  };

  useEffect(() => {
    setItem(params.item);
    getComments();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
      >
        <STGContainer>
          {!fullscreen && (
            <STGHeaderBack
              navigation={navigation}
              hasOptions={item && Number(item.owner) === 1}
              onPressShowOptions={showOptions}
            />
          )}
          {item && (
            <STGBody>
              <ScrollView
                contentContainerStyle={{
                  paddingVertical: fullscreen ? 0 : 20,
                }}
              >
                {!fullscreen && (
                  <>
                    <TouchableOpacity
                      style={Styles.header}
                      onPress={onPressUser}
                    >
                      <STGAvatar
                        uri={`${BASE_URL}/upload/avatars/${item.avatar}`}
                      />
                      <View style={Styles.userInfo}>
                        <Text style={Styles.userTitleOne}>
                          {item.partnershipName}
                        </Text>
                        <Text style={Styles.userTitleTwo}>
                          {item.partnershipType}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {item.description !== "" && (
                      <Animatable.Text style={Styles.text}>
                        {item.description}
                      </Animatable.Text>
                    )}
                  </>
                )}
                <View style={{ marginVertical: fullscreen ? 0 : 10 }}>
                  {filetype === "image" && (
                    <STGImage
                      zoom={true}
                      data={{
                        uri: `${BASE_URL}/upload/b2b/${item.file}`,
                        width: item.fileWidth,
                        height: item.fileHeight,
                        isVertical: item.fileIsVertical,
                      }}
                    />
                  )}
                  {filetype === "video" && (
                    <STGVideo
                      source={{ uri: `${BASE_URL}/upload/b2b/${item.file}` }}
                      fullscreen={fullscreen}
                      disableFullscreen={false}
                      disableBack={false}
                      onVideoBackPress={onVideoBackPress}
                      onVideoFullscreenEnter={onVideoFullscreenEnter}
                      onVideoFullscreenExit={onVideoFullscreenExit}
                    />
                  )}
                </View>
                {!fullscreen && (
                  <>
                    <Text style={Styles.comments}>{t("common:comments")}</Text>
                    {_renderComments()}
                  </>
                )}
              </ScrollView>
              {!fullscreen && !commentEditVisible && (
                <View style={commonStyles.postCommentContainer}>
                  <TextInput
                    defaultValue={comment}
                    value={comment}
                    style={commonStyles.postCommentInput}
                    placeholder={t("post:details.commentPlaceholder")}
                    multiline={true}
                    onChangeText={(text) => setComment(text)}
                  />
                  <TouchableOpacity
                    style={commonStyles.postCommentBtnContainer}
                    onPress={saveComment}
                  >
                    <MaterialCommunityIcons
                      name="send"
                      color="dodgerblue"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </STGBody>
          )}
        </STGContainer>
      </KeyboardAvoidingView>
      <STGActionSheet
        isVisible={commentOptionsVisible}
        hide={hideCommentOptions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("b2b:editComment"),
            onPress: onPressEditComment,
            icon: <FontAwesome5 name="edit" size={24} />,
          },
          {
            title: t("b2b:deleteComment"),
            onPress: onPressDeleteComment,
            icon: <FontAwesome5 name="trash-alt" size={24} />,
          },
        ]}
      />
      {selectedComment && (
        <STGCommentEdit
          isVisible={commentEditVisible}
          hide={hideCommentEdit}
          title={t("common:edit")}
          placeholder={t("common:commentPlaceholder")}
          saveButtonTitle={t("common:save")}
          comment={selectedComment.comment || ""}
          onChangeText={handleCommentChangeText}
          onPressSaveButton={updateComment}
        />
      )}
      <STGActionSheet
        isVisible={optionsVisible}
        hide={hideOptions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("b2b:edit"),
            onPress: onPressEdit,
            icon: <FontAwesome5 name="edit" size={28} />,
          },
          {
            title: t("b2b:delete"),
            onPress: onPressDelete,
            icon: <FontAwesome5 name="trash-alt" size={28} />,
          },
        ]}
      />
    </>
  );
}
