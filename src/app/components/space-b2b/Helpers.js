import { setB2bItemsAction } from "@redux/actions";
import SpaceB2BService from "@services/SpaceB2BService";
import { store } from "@redux/stores";

export async function getB2bItems() {
  const { data, status } = await SpaceB2BService.getItems();
  if (status === 200) {
    store.dispatch(setB2bItemsAction(data));
  } else {
    store.dispatch(setB2bItemsAction(data));
  }
}

export async function getB2bItemsBySearch(type, description) {
  const { data, status } = await SpaceB2BService.getItemsBySearch(
    type,
    description
  );
  if (status === 200) {
    store.dispatch(setB2bItemsAction(data));
  } else {
    store.dispatch(setB2bItemsAction([]));
  }
}

export default {
  getB2bItems,
  getB2bItemsBySearch,
};
