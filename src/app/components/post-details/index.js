import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  STGContainer,
  STGColors,
  STGImageZoom,
  STGAvatar,
  STGHeaderBack,
  STGActionSheet,
  STGVideo,
  STGBody,
  STGCommentEdit,
} from "stg-ui";
import pStyles from "../post/style";
import commonStyles from "../styles";
import pdStyles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BASE_URL } from "@config";
import {
  getPostCommentsService,
  addPostCommentService,
  updatePostCommentService,
  removePostCommentService,
  likePostService,
  getPostService,
  deletePostService,
} from "@services";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useSelector, shallowEqual } from "react-redux";
import _ from "lodash";
import PostHelpers from "../post/Helpers";

const CommentItem = ({ item, onLongPressComment, onPressUser }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", marginTop: 5 }}
    onLongPress={onLongPressComment}
  >
    <TouchableOpacity style={{ padding: 5 }} onPress={onPressUser}>
      <STGAvatar
        uri={`${BASE_URL}/upload/avatars/${item.user.avatar || ""}`}
        size={40}
      />
    </TouchableOpacity>
    <View style={pdStyles.commentTextContainer}>
      <TouchableOpacity style={{ padding: 5 }} onPress={onPressUser}>
        <Text style={pdStyles.commentUser}>{item.user.fullname}</Text>
      </TouchableOpacity>
      <Text style={pdStyles.commentText}>{item.comment}</Text>
    </View>
  </TouchableOpacity>
);

export default function PostDetails() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [commentOptionsVisible, setCommentOptionsVisible] = useState(false);
  const [commentEditVisible, setCommentEditVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const commentRef = useRef();
  const [hasOptions, setHasOptions] = useState(false);
  const filetype = (post && post.image && post.filetype.substr(0, 5)) || null;

  const getPostComments = async (id) => {
    const { status, data } = await getPostCommentsService(id);
    if (status === 200) {
      setComments(data);
    } else {
      setComments([]);
    }
  };

  const postComment = async () => {
    if (comment !== "") {
      const response = await addPostCommentService(post.id, { comment });
      if (response.status === 201) {
        Keyboard.dismiss();
        setComment("");
        getPostComments(post.id);
      }
    }
  };

  const updateComment = async () => {
    if (selectedComment.comment !== "") {
      const response = await updatePostCommentService({
        id: selectedComment.id,
        comment: selectedComment.comment,
      });
      handleCommentEditVisible();
      if (response.status < 300) {
        Keyboard.dismiss();
        getPostComments(post.id);
      }
    }
  };

  const removeComment = async () => {
    if (selectedComment) {
      const response = await removePostCommentService(selectedComment.id);
      handleCommentOptionsVisible();
      if (response.status < 300) {
        Keyboard.dismiss();
        getPostComments(post.id);
      }
    }
  };

  const likePost = async () => {
    const { status, data } = await likePostService(post.id);
    if (_.inRange(status, 200, 300)) {
      setPost(data);
    }
  };

  const getPost = async () => {
    setLoading(true);
    const { data, status } = await getPostService(params.post.id);
    setLoading(false);
    if (status === 200) {
      setPost(data);
      setHasOptions(Number(data.owner) === 1);
      getPostComments(data.id);
    } else {
      setPost({});
      setComments([]);
    }
  };

  const deletePost = async () => {
    setLoading(true);
    setLoadingText(t("post:delete.loadingText"));
    const { status } = await deletePostService(post.id);
    setLoading(false);
    setLoadingText("");
    if (_.inRange(status, 200, 300)) {
      PostHelpers.getPostsData();
      navigation.goBack();
      Alert.alert(t("post:delete.success"), t("post:delete.successMessage"), [
        {
          text: t("common:ok"),
        },
      ]);
    } else {
      Alert.alert(t("post:delete.error"), t("post:delete.errorMessage"), [
        {
          text: t("common:ok"),
        },
      ]);
    }
  };

  const showOptions = () => {
    setOptionsVisible(true);
  };

  const hideOptions = () => {
    setOptionsVisible(false);
  };

  const onPressEdit = () => {
    hideOptions();
    navigation.navigate("PostEdit", {
      post,
    });
  };

  const onPressDelete = () => {
    Alert.alert(t("post:delete.confirmTitle"), t("post:delete.confirmText"), [
      {
        text: t("common:yes"),
        style: "destructive",
        onPress: () => {
          hideOptions();
          deletePost();
        },
      },
      {
        text: t("common:no"),
      },
    ]);
  };

  const onLongPressComment = (comment) => {
    if (user.id === comment.user.id) {
      setSelectedComment(comment);
      setCommentOptionsVisible(true);
    }
  };

  const _renderComments = () =>
    comments.map((item, key) => (
      <CommentItem
        item={item}
        key={`comment-index-${key}`}
        onLongPressComment={() => onLongPressComment(item)}
        onPressUser={() => onPressUser(item.user.id)}
      />
    ));

  const onVideoBackPress = () => {
    navigation.goBack();
  };

  const onVideoFullscreenEnter = () => {
    setFullscreen(true);
  };

  const onVideoFullscreenExit = () => {
    setFullscreen(false);
  };

  const onPressLikes = () => {
    navigation.navigate("LikesUsers", { postId: post.id });
  };

  const handleCommentOptionsVisible = () => {
    setCommentOptionsVisible(!commentOptionsVisible);
  };

  const handleCommentEditVisible = () => {
    setCommentEditVisible(!commentEditVisible);
  };

  const handleCommentChangeText = (text) => {
    const sc = _.clone(selectedComment);
    sc.comment = text;
    setSelectedComment(sc);
  };

  const onPressEditComment = () => {
    if (selectedComment) {
      setCommentOptionsVisible(false);
      setTimeout(() => {
        handleCommentEditVisible();
      }, 500);
    }
  };

  const onPressUser = (userId) => {
    +userId === +user.id
      ? navigation.navigate("MySpace")
      : navigation.navigate("ProfileShow", {
          user: userId,
        });
  };

  useFocusEffect(
    useCallback(() => {
      getPost();
    }, [])
  );

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
              hasOptions={hasOptions}
              onPressShowOptions={showOptions}
            />
          )}
          <STGBody loading={loading} loadingText={loadingText}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: fullscreen ? 0 : 30,
              }}
            >
              {!fullscreen && (
                <TouchableOpacity
                  style={pStyles.userCard}
                  onPress={() => onPressUser(post.userId)}
                >
                  <STGAvatar
                    uri={`${BASE_URL}/upload/avatars/${post.userAvatar || ""}`}
                  />
                  <View>
                    <Text style={pdStyles.userFullname}>
                      {post.partnershipName || post.userFullname}
                    </Text>
                    <Text style={pdStyles.userPartnershipType}>
                      {post.partnershipType}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {!fullscreen && (
                <Text style={pStyles.postItemArticle}>{post.article}</Text>
              )}
              {post.image && filetype === "image" && (
                <STGImageZoom uri={`${BASE_URL}/upload/posts/${post.image}`} />
              )}
              {post.image && filetype === "video" && (
                <STGVideo
                  source={{ uri: `${BASE_URL}/upload/posts/${post.image}` }}
                  fullscreen={fullscreen}
                  disableFullscreen={false}
                  disableBack={false}
                  onVideoBackPress={onVideoBackPress}
                  onVideoFullscreenEnter={onVideoFullscreenEnter}
                  onVideoFullscreenExit={onVideoFullscreenExit}
                />
              )}
              {!fullscreen && (
                <>
                  <TouchableOpacity
                    style={pStyles.postCheckActionGroup}
                    onPress={onPressLikes}
                  >
                    <View style={pStyles.postCheckAction}>
                      <Text style={pStyles.postCheckActionText}>
                        {Number(post.likesCount) > 0 ? post.likesCount : ""}
                      </Text>
                      <AntDesign
                        name={Number(post.liked) > 0 ? "heart" : "hearto"}
                        size={12}
                        color={STGColors.container}
                      />
                    </View>
                    <View style={pStyles.postCheckAction}>
                      <Text style={pStyles.postCheckActionText}>
                        {Number(post.commentsCount) > 0
                          ? post.commentsCount
                          : ""}
                      </Text>
                      <MaterialCommunityIcons
                        name={
                          Number(post.commentsCount) > 0
                            ? "comment"
                            : "comment-outline"
                        }
                        size={12}
                        color={STGColors.container}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={pdStyles.actionInfoContainer}>
                    <TouchableOpacity
                      style={pStyles.postItemActionBtn}
                      onPress={() => likePost()}
                    >
                      <AntDesign
                        name={Number(post.liked) > 0 ? "heart" : "hearto"}
                        size={20}
                        color={STGColors.container}
                      />
                      <Text style={pStyles.postItemActionBtnText}>
                        {t("post:like")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={pStyles.postItemActionBtn}
                      onPress={() => commentRef.current.focus()}
                    >
                      <MaterialCommunityIcons
                        name="comment-outline"
                        size={20}
                        color={STGColors.container}
                      />
                      <Text style={pStyles.postItemActionBtnText}>
                        {t("post:comment")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {_renderComments()}
                </>
              )}
            </ScrollView>
            {!fullscreen && (
              <View style={commonStyles.postCommentContainer}>
                <TextInput
                  ref={commentRef}
                  defaultValue={comment}
                  value={comment}
                  style={commonStyles.postCommentInput}
                  placeholder={t("post:details.commentPlaceholder")}
                  multiline={true}
                  onChangeText={(text) => setComment(text)}
                />
                <TouchableOpacity
                  style={commonStyles.postCommentBtnContainer}
                  onPress={postComment}
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
        </STGContainer>
      </KeyboardAvoidingView>
      <STGActionSheet
        isVisible={commentOptionsVisible}
        hide={handleCommentOptionsVisible}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("b2b:editComment"),
            onPress: onPressEditComment,
            icon: <FontAwesome5 name="edit" size={24} />,
          },
          {
            title: t("b2b:deleteComment"),
            onPress: removeComment,
            icon: <FontAwesome5 name="trash-alt" size={24} />,
          },
        ]}
      />
      {selectedComment && (
        <STGCommentEdit
          isVisible={commentEditVisible}
          hide={handleCommentEditVisible}
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
            icon: <FontAwesome5 name="edit" size={20} />,
          },
          {
            title: t("b2b:delete"),
            onPress: onPressDelete,
            icon: <FontAwesome5 name="trash-alt" size={20} />,
          },
        ]}
      />
    </>
  );
}
