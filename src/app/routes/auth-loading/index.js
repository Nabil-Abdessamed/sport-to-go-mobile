import React, { useEffect } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styles from "./style";
import { getMessagesCountAction } from "@redux/actions";
import { getMessagesCounterService } from "@services";
import { useNavigation, StackActions } from "@react-navigation/native";

export default function AuthLoading() {
  const auth = useSelector((state) => state.auth, shallowEqual);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  _bootstrapAsync = async () => {
    const { token } = auth;
    if (token) {
      getMessagesCounterService().then(({ data }) => {
        dispatch(getMessagesCountAction(data));
      });
      navigation.dispatch(StackActions.replace("HomeStack"));
    } else {
      navigation.dispatch(StackActions.replace("AuthStack"));
    }
  };

  useEffect(() => {
    const willFocus = navigation.addListener("focus", () => {
      _bootstrapAsync();
    });
    return willFocus;
  }, [navigation]);

  useEffect(() => {
    const { token } = auth;
    if (token) {
      getMessagesCounterService().then(({ data }) => {
        dispatch(getMessagesCountAction(data));
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size={"large"} />
      <StatusBar barStyle="default" />
    </View>
  );
}
