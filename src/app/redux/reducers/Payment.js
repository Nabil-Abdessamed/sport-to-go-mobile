import * as constants from "../constants";

const initialState = {
  stripeData: null
};

export function paymentStripeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_PAYMENT_STRIPE_DATA:
      return {
        ...state,
        stripeData: action.stripeData
      };
    default:
      return state;
  }
}