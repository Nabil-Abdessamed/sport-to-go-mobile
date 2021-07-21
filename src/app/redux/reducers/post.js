import * as constants from "../constants";

const initialState = {
  posts: [],
  postsSearch: [],
  postsUser: [],
  postMode: "DATA",
  mode: "GRID",
};

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_POST:
      return {
        ...state,
        posts: action.posts,
      };
    case constants.GET_POST_SEARCH:
      return {
        ...state,
        postsSearch: action.postsSearch,
      };
    case constants.GET_POST_USER:
      return {
        ...state,
        postsUser: action.postsUser,
      };
    case constants.GET_POST_MODE:
      return {
        ...state,
        postMode: action.postMode,
      };
    case constants.SET_POST_VIEW_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
}

export default {
  initialState,
  postReducer,
};
