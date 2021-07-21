import * as Constants from "../constants";

export function setB2bItemsAction(items) {
  return {
    type: Constants.GET_B2B_ITEMS,
    items,
  };
}
