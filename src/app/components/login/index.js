import React, { useState, useRef } from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./style";
import gStyles from "@components/styles";
import * as authService from "@services/auth";
import { Base64 } from "js-base64";
import { getToken, getUserInfo } from "@redux/actions";
import { validateEmail, validatePassword } from "./validation";
import OneSignal from "react-native-onesignal";
import JwtDecode from "jwt-decode";
import {
  STGContainer,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { useNavigation, StackActions } from "@react-navigation/native";

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const authenticate = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const hasErrors = emailError || passwordError;
    if (hasErrors) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setLoading(false);
      setLoadingText("");
      setErrors(null);
    } else {
      setEmailError(null);
      setPasswordError(null);
      setLoading(true);
      setLoadingText(t("login:loadingText"));
      setErrors(null);
      const authData = Base64.encode(`${email}:${password}`);
      const { data, status } = await authService.authenticate(authData);
      setLoading(false);
      setLoadingText("");
      if (status === 200) {
        dispatch(getToken(data.token));
        const userDecoded = JwtDecode(data.token);
        dispatch(getUserInfo(userDecoded));
        OneSignal.setSubscription(true);
        OneSignal.setExternalUserId(`${userDecoded.id}`);
        OneSignal.sendTags({
          user_id: userDecoded.id,
          user_email: userDecoded.email,
          user_type: userDecoded.type,
        });
        setEmail("");
        setPassword("");
        navigation.dispatch(StackActions.replace("HomeStack"));
      } else if (status === 404) {
        setErrors(t("login:emailOrPasswordIncorrect"));
      } else if (status === 401) {
        navigation.navigate("Activation", {
          email,
          password,
        });
      } else {
        setErrors(t("login:connectionError"));
      }
    }
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmitEditingEmail = () => {
    passwordRef.current.focus();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading} loadingText={loadingText}>
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.sectionTitle}>{t("login:title")}</Text>
              {errors && <Text style={gStyles.errors}>{errors}</Text>}
              <Text style={gStyles.textInputTitle}>{t("common:email")}</Text>
              <TextInput
                ref={emailRef}
                defaultValue={email}
                value={email}
                placeholder={t("common:emailPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => setEmail(text)}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: emailError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                onFocus={() => setEmailError(null)}
                returnKeyType="next"
                onSubmitEditing={onSubmitEditingEmail}
              />
              {emailError && <Text style={gStyles.helper}>{emailError}</Text>}
              <Text style={gStyles.textInputTitle}>{t("common:password")}</Text>
              <TextInput
                ref={passwordRef}
                secureTextEntry
                defaultValue={password}
                value={password}
                placeholder={t("common:passwordPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => setPassword(text)}
                textContentType="password"
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: passwordError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                onFocus={() => setPasswordError(null)}
                returnKeyType="done"
                onSubmitEditing={authenticate}
              />
              {passwordError && (
                <Text style={gStyles.helper}>{passwordError}</Text>
              )}
              <TouchableOpacity
                style={styles.forgotPasswordBtn}
                onPress={() => navigation.navigate("RequestResetPassword")}
              >
                <Text style={styles.forgotPasswordText}>
                  {t("login:forgotPassword")}
                </Text>
              </TouchableOpacity>
            </STGScrollViewBody>
            <STGButton btnText={t("login:connect")} onPress={authenticate} />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
