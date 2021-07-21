import * as constants from "../constants";
import { PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

export function getPaymentStripeDataAction(stripeData) {
  return {
    type: constants.GET_PAYMENT_STRIPE_DATA,
    stripeData
  };
}

export function cleanStripeData() {
  return {
    type: PURGE,
    key: "root",
    storage,
    result: () => null
  };
}
