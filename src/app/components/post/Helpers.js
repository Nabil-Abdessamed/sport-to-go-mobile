import {
  setPostsAction,
  setPostsSearchAction,
  setPostModeAction,
} from "@redux/actions";
import { store } from "@redux/stores";
import {
  getPostsService,
  getPostsBySearchService,
  getUserPostsService,
} from "@services";

async function getPostsData() {
  const { status, data } = await getPostsService();
  store.dispatch(setPostModeAction("DATA"));
  if (status === 200) {
    store.dispatch(setPostsAction(data));
  } else {
    store.dispatch(setPostsAction([]));
  }
}

async function getPostsBySearch(filter) {
  const { status, data } = await getPostsBySearchService(filter);
  store.dispatch(setPostModeAction("SEARCH"));
  if (status === 200) {
    store.dispatch(setPostsSearchAction(data));
  } else {
    store.dispatch(setPostsSearchAction([]));
  }
}

async function getUserPostsData(user) {
  const { status, data } = await getUserPostsService(user);
  if (status === 200) {
    store.dispatch(setPostsAction(data));
  } else {
    store.dispatch(setPostsAction([]));
  }
}

export default {
  getPostsData,
  getPostsBySearch,
  getUserPostsData,
};
