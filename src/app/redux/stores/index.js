import {
  authReducer,
  eventReducer,
  sessionReducer,
  postReducer,
  paymentStripeReducer,
  chatReducer,
  usersReducer,
  settingReducer,
  b2bReducer,
} from "@redux/reducers";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export const persistConfig = {
  key: "root",
  storage,
  timeout: null,
  keyPrefix: "",
  debug: false,
  serialize: true,
  whitelist: ["auth"],
  blacklist: ["input"],
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    event: eventReducer,
    session: sessionReducer,
    post: postReducer,
    stripe: paymentStripeReducer,
    chat: chatReducer,
    users: usersReducer,
    setting: settingReducer,
    b2b: b2bReducer,
  })
);

export const logger = createLogger({});

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk /* logger  */)
);

export const persistor = persistStore(store);
