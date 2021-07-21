import React, { Component, useState } from "react";
import {
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
} from "react-native";
import { updateUserPasswordService } from "@services";
import { Base64 } from "js-base64";
import gStyles from "@components/styles";
import {
  validateOldPassword,
  validateNewPassword,
  validateConfirmNewPassword,
} from "./validation";
import { getToken } from "@redux/actions";
import {
  STGContainer,
  STGHeaderBack,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HeaderRight from "../profile/HeaderRight";

export default function ChangePassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => <HeaderRight save={save} title={t("common:save")} />,
  });
  // States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const save = async () => {
    const oldPasswordError = validateOldPassword(oldPassword, t);
    const newPasswordError = validateNewPassword(newPassword, t);
    const confirmNewPasswordError = validateConfirmNewPassword(
      confirmNewPassword,
      newPassword,
      t
    );
    const hasErrors =
      oldPasswordError || newPasswordError || confirmNewPasswordError || null;
    if (hasErrors !== null) {
      setOldPasswordError(oldPasswordError);
      setNewPasswordError(newPasswordError);
      setConfirmNewPasswordError(confirmNewPasswordError);
    } else {
      const oldP = Base64.encode(oldPassword);
      const newP = Base64.encode(newPassword);
      const passwordData = {
        oldPassword: oldP,
        newPassword: newP,
      };
      setLoading(true);
      setLoadingText(t("mySpace:editProfile.loadingText"));
      const { data, status } = await updateUserPasswordService(passwordData);
      setLoading(false);
      setLoadingText("");
      if (status === 200) {
        dispatch(getToken(data.token));
        if (Platform.OS === "ios") {
          Alert.alert(
            t("mySpace:changePassword.success"),
            t("mySpace:changePassword.successMessage")
          );
        } else {
          ToastAndroid.show(
            t("mySpace:changePassword.successMessage"),
            ToastAndroid.LONG
          );
        }
        navigation.goBack();
      } else {
        if (status === 409) {
          if (Platform.OS === "ios") {
            Alert.alert(
              t("mySpace:changePassword.error"),
              t("mySpace:changePassword.errorMessage1")
            );
          } else {
            ToastAndroid.show(
              t("mySpace:changePassword.errorMessage1"),
              ToastAndroid.LONG
            );
          }
        } else {
          if (Platform.OS === "ios") {
            Alert.alert(
              t("mySpace:changePassword.error"),
              t("mySpace:changePassword.errorMessage2")
            );
          } else {
            ToastAndroid.show(
              t("mySpace:changePassword.errorMessage2"),
              ToastAndroid.LONG
            );
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading} loadingText={loadingText}>
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.textInputTitle}>
                {t("mySpace:changePassword.oldPassword")}
              </Text>
              <TextInput
                textContentType={"password"}
                secureTextEntry={true}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: oldPasswordError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("mySpace:changePassword.oldPasswordPlaceholder")}
                onChangeText={(value) => setOldPassword(value)}
              />
              {oldPasswordError && (
                <Text style={gStyles.helper}>{oldPasswordError}</Text>
              )}
              <Text style={gStyles.textInputTitle}>
                {t("mySpace:changePassword.newPassword")}
              </Text>
              <TextInput
                textContentType={"newPassword"}
                secureTextEntry={true}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: newPasswordError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("mySpace:changePassword.newPasswordPlaceholder")}
                onChangeText={(value) => setNewPassword(value)}
              />
              {newPasswordError && (
                <Text style={gStyles.helper}>{newPasswordError}</Text>
              )}
              <Text style={gStyles.textInputTitle}>
                {t("mySpace:changePassword.confirmNewPassword")}
              </Text>
              <TextInput
                textContentType={"newPassword"}
                secureTextEntry={true}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: confirmNewPasswordError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t(
                  "mySpace:changePassword.confirmNewPasswordPlaceholder"
                )}
                onChangeText={(value) => setConfirmNewPassword(value)}
              />
              {confirmNewPasswordError && (
                <Text style={gStyles.helper}>{confirmNewPasswordError}</Text>
              )}
            </STGScrollViewBody>
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
