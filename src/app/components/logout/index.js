import React, { useCallback } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logoutAction } from "@redux/actions";
import { logoutService } from "@services";
import OneSignal from "react-native-onesignal";
import {
  useNavigation,
  useFocusEffect,
  CommonActions,
} from "@react-navigation/native";
import { STGContainer } from "stg-ui";

export default function Logout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.canGoBack(false);

  const redirectToAuth = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: "AuthStack",
        },
      ],
    });
    navigation.dispatch(resetAction);
  };

  const logout = async () => {
    const { data, status } = await logoutService();
    if (status === 200 && data === true) {
      OneSignal.removeExternalUserId();
      OneSignal.deleteTag("user_id");
      OneSignal.deleteTag("user_email");
      OneSignal.deleteTag("user_type");
      OneSignal.setSubscription(false);
      setTimeout(() => {
        dispatch(logoutAction());
        redirectToAuth();
      }, 1000);
    } else {
      Alert.alert(
        t("login:logout"),
        t("login:disconnectionError"),
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("HomeStack"),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      logout();
    }, [])
  );

  return <STGContainer loading={true} />;
}
