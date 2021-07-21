import React, { useState } from "react";
import { KeyboardAvoidingView, TextInput, Text, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { activateService } from "@services";
import { getToken, getUserInfo } from "@redux/actions";
import OneSignal from "react-native-onesignal";
import JwtDecode from "jwt-decode";
import { Base64 } from "js-base64";
import {
  STGContainer,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import styles from "./style";
import validator from "validator";
import { useNavigation, useRoute, StackActions } from "@react-navigation/native";

export default function Activation() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [errors, setErrors] = useState(null);

  const validateCode = (text) => {
    if (validator.isEmpty(text)) {
      return t("validation:activation");
    }
    return null;
  };

  const activate = async () => {
    const codeError = validateCode(code);
    if (codeError) {
      setCodeError(codeError);
    } else {
      setLoading(true);
      setLoadingText(t("activation:loadingText"));
      const { email, password } = params;
      const authentication = Base64.encode(`${email}:${password}`);
      const { data, status } = await activateService(authentication, code);
      setLoading(false);
      setLoadingText("");
      if (status === 200) {
        dispatch(getToken(data.token));
        const userDecoded = JwtDecode(data.token);
        dispatch(getUserInfo(userDecoded));
        OneSignal.setExternalUserId(`${userDecoded.id}`);
        OneSignal.sendTags({
          user_id: userDecoded.id,
          user_email: userDecoded.email,
          user_type: userDecoded.type,
        });
        navigation.dispatch(StackActions.replace("HomeStack"));
      }
      if (status === 404 && data.code === "USER_NOT_FOUND") {
        setErrors(t("activation:accountNotFound"));
      } else if (status === 404 && data.code === "CREDENTIALS_NOT_FOUND") {
        setErrors(t("activation:emailOrPasswordIncorrect"));
      } else if (status === 409 && data.code === "CODE_INCORRECT") {
        setErrors(t("validation:activation"));
      } else if (status === 409 && data.code === "USER_ALREADY_ENABLED") {
        setErrors(t("activation:accountAlreadyActivated"));
      } else if (status === 409 && data.code === "USER_BLOCKED") {
        setErrors(t("activation:accountBlocked"));
      } else {
        setErrors(t("activation:activationError"));
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
              <Text style={styles.sectionTitle}>{t("activation:title")}</Text>
              {errors && <Text style={styles.errors}>{errors}</Text>}
              <Text style={styles.textInputTitle}>
                {t("activation:inputTitle")}
              </Text>
              <TextInput
                defaultValue={code}
                value={code}
                placeholder={t("activation:inputPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => setCode(text)}
                keyboardType="numeric"
                style={{
                  ...styles.textInput,
                  borderBottomColor: codeError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                onFocus={() => setCodeError(null)}
              />
              {codeError && <Text style={styles.helper}>{codeError}</Text>}
            </STGScrollViewBody>
            <STGButton btnText={t("activation:activate")} onPress={activate} />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
