import React, { Fragment, useEffect } from "react";
import { StatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@redux/stores";
import AppContainer from "@routes";
import { getMessagesByConversationService } from "@services";
import OneSignal from "react-native-onesignal";
import {
  setOneSignalDetails,
  getMessagesCountAction,
  getMessagesAction,
} from "@redux/actions";
import { STGContainer, STGColors } from "stg-ui";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef, navigate } from "./RootNavigation";

export default function App() {
  useEffect(() => {
    OneSignal.init("bb8125c3-1bbe-416d-ba44-ec1bc2ad9e70", {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);
    return () => {
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    };
  }, []);

  const getMessagesByConversation = (conversationId) => {
    getMessagesByConversationService(conversationId).then(({ data }) => {
      store.dispatch(getMessagesAction(data));
    });
  };

  const onReceived = (notification) => {
    const additionalData = notification.payload.additionalData;
    store.dispatch(getMessagesCountAction(additionalData.counter));
    const { currentOpenedChat } = store.getState().chat;
    if (
      currentOpenedChat &&
      currentOpenedChat.id === additionalData.conversationId
    ) {
      getMessagesByConversation(additionalData.conversationId);
    }
  };

  const onOpened = (openResult) => {
    const additionalData = openResult.notification.payload.additionalData;
    const { currentOpenedChat } = store.getState().chat;
    if (
      currentOpenedChat &&
      currentOpenedChat.id !== additionalData.conversationId
    ) {
      getMessagesByConversation(additionalData.conversationId);
    } else {
      navigate("MessageScreen", {
        item: additionalData,
        from: "App",
      });
    }
  };

  const onIds = (device) => {
    store.dispatch(setOneSignalDetails(device));
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Fragment>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={STGColors.container}
            animated
            showHideTransition="fade"
          />
          <STGContainer>
            <NavigationContainer ref={navigationRef}>
              <AppContainer />
            </NavigationContainer>
          </STGContainer>
        </Fragment>
      </PersistGate>
    </Provider>
  );
}
