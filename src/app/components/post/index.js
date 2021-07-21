import React, { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  setPostsAction,
  setPostModeAction,
  setPostsUserAction,
} from "@redux/actions";
import {
  getPostsService,
  likePostService,
  getUserPostsService,
  followUserService,
  unfollowUserService,
  deletePostService,
} from "@services";
import { STGContainer, STGBody, STGActionSheet } from "stg-ui";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import _ from "lodash";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import PostList from "./PostList";
import PostHeaderRight from "./PostHeader";
import PostHelpers from "./Helpers";

export default function Post() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <PostHeaderRight
        navigation={navigation}
        handleChangeMode={handleChangeViewMode}
        mode={mode}
        onPressButtonSearch={onPressButtonSearch}
      />
    ),
  });
  const { params } = useRoute();
  const dispatch = useDispatch();
  // Props from Redux
  const { posts, postsSearch, postsUser, postMode } = useSelector(
    (state) => state.post,
    shallowEqual
  );
  // States
  const [mode, setMode] = useState("GRID");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const likePost = async (item) => {
    const { status } = await likePostService(item.id);
    if (_.inRange(status, 200, 300)) {
      onRefresh();
    }
  };

  const getPosts = () => {
    if (params && params.mode === "USER_POST") {
      getUserPosts(params.user);
    } else {
      getPostsData();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (postMode === "USER") {
      await PostHelpers.getUserPostsData(params.user);
    } else {
      await PostHelpers.getPostsData();
    }
    setRefreshing(false);
  };

  const getPostsData = async () => {
    setLoading(true);
    setLoadingText(t("post:loadingText"));
    const { status, data } = await getPostsService();
    setLoading(false);
    setLoadingText("");
    dispatch(setPostModeAction("DATA"));
    if (status === 200) {
      dispatch(setPostsAction(data));
    } else {
      dispatch(setPostsAction([]));
    }
  };

  const getUserPosts = async (user) => {
    setLoading(true);
    setLoadingText(t("post:loadingText"));
    const { status, data } = await getUserPostsService(user.id);
    setLoading(false);
    setLoadingText("");
    dispatch(setPostModeAction("USER"));
    if (status) {
      dispatch(setPostsUserAction(data));
    } else {
      dispatch(setPostsUserAction([]));
    }
  };

  const handleChangeViewMode = () => {
    setMode(mode === "LIST" ? "GRID" : "LIST");
  };

  const follow = async (id) => {
    const { status } = await followUserService(id);
    if (_.inRange(status, 200, 300)) {
      onRefresh();
    } else {
      Alert.alert("Oops !", t("proSpace:followError"));
    }
  };

  const unfollow = async (id) => {
    const { status } = await unfollowUserService(id);
    if (_.inRange(status, 200, 300)) {
      onRefresh();
    } else {
      Alert.alert("Oops !", t("proSpace:followError"));
    }
  };

  const onPressEdit = (selectedItem) => {
    setSelectedItem(selectedItem);
    setActionsVisible(false);
    navigation.navigate("PostEdit", {
      post: selectedItem,
    });
  };

  const deletePost = async (item) => {
    const response = await deletePostService(item.id);
    if (response.status === 200) {
      onRefresh();
    } else {
      Alert.alert(t("post:delete.error"), t("post:delete.errorMessage"), [
        {
          text: t("common:ok"),
        },
      ]);
    }
  };

  const showItemActions = (selectedItem) => {
    setSelectedItem(selectedItem);
    setActionsVisible(true);
  };

  const hideItemActions = () => {
    setSelectedItem(null);
    setActionsVisible(false);
  };

  const onPressDelete = (item) => {
    Alert.alert(
      t("post:delete.confirmTitle"),
      t("post:delete.confirmText"),
      [
        {
          text: t("common:yes"),
          style: "destructive",
          onPress: () => {
            hideItemActions();
            deletePost(item);
          },
        },
        {
          text: t("common:no"),
        },
      ],
      { cancelable: false }
    );
  };

  const onPressButtonSearch = () => {
    navigation.navigate("PostSearch");
  };

  useFocusEffect(
    useCallback(() => {
      if (params && params.mode === "USER_POST") {
        getUserPosts(params.user);
      } else {
        getPosts();
      }
      return () => {
        dispatch(setPostModeAction("DATA"));
      };
    }, [])
  );

  return (
    <>
      <STGContainer loading={loading} loadingText={loadingText}>
        <STGBody>
          <PostList
            mode={mode}
            posts={
              postMode === "DATA"
                ? posts
                : postMode === "SEARCH"
                ? postsSearch
                : postMode === "USER"
                ? postsUser
                : [] || []
            }
            navigation={navigation}
            likePost={likePost}
            follow={follow}
            unfollow={unfollow}
            t={t}
            showItemActions={showItemActions}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        </STGBody>
      </STGContainer>
      <STGActionSheet
        isVisible={actionsVisible}
        hide={hideItemActions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("b2b:edit"),
            onPress: () => onPressEdit(selectedItem),
            icon: <FontAwesome5 name="edit" size={20} />,
          },
          {
            title: t("b2b:delete"),
            onPress: () => onPressDelete(selectedItem),
            icon: <FontAwesome5 name="trash-alt" size={20} />,
          },
        ]}
      />
    </>
  );
}
