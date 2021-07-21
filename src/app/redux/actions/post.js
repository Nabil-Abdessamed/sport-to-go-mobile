import * as constants from "../constants";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function setPostsAction(posts) {
  return {
    type: constants.GET_POST,
    posts,
  };
}

export function setPostsSearchAction(postsSearch) {
  return {
    type: constants.GET_POST_SEARCH,
    postsSearch,
  };
}

export function setPostsUserAction(postsUser) {
  return {
    type: constants.GET_POST_USER,
    postsUser,
  };
}

export function setPostModeAction(postMode) {
  return {
    type: constants.GET_POST_MODE,
    postMode,
  };
}

export function setPostViewMode(mode) {
  return {
    type: constants.SET_POST_VIEW_MODE,
    mode,
  };
}

export function cleanPosts() {
  return {
    type: PURGE,
    key: "root",
    storage,
    result: () => null,
  };
}
