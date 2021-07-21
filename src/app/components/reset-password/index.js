import React, { useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import gStyles from "@components/styles";
import {
  STGContainer,
  STGHeaderBack,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { validateCode } from "./validation";
import {
  checkEmailAndCodeResetPasswordService,
  resetPasswordService,
} from "@services";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Base64 } from "js-base64";

const CHECK = "CHECK";
const RESET = "RESET";

export default function ResetPassword({ route, navigation }) {
  const { t } = useTranslation();
  // States
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(CHECK);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const next = async () => {
    const codeError = validateCode(codeInput, t);
    if (codeError !== null) {
      setCodeError(codeError);
    } else {
      setLoading(false);
      setLoadingText(t("resetPassword:loadingTextCheck"));
      setCodeError(null);
      setError(null);
      const email = route.params.email;
      if (!email) {
        navigation.goBack();
      } else {
        const { data, status } = await checkEmailAndCodeResetPasswordService({
          email,
          code: codeInput,
        });
        if (status === 200) {
          setLoading(false);
          setLoadingText("");
          setMode(RESET);
        } else {
          switch (status) {
            case 404:
              setError(t("resetPassword:errorUserNotFound"));
              break;
            case 409:
              if (data.code === "REQUEST_EXPIRED") {
                setError(t("resetPassword:errorRequestExpired"));
              }
              if (data.code === "CODE_NOT_MATCH") {
                setError(t("resetPassword:errorCodeNotMatch"));
              }
              break;
            default:
              setError(t("resetPassword:errorCheckCode"));
          }
        }
      }
    }
  };

  const save = async () => {
    const passwordError = validateCode(password, t);
    if (passwordError !== null) {
      setPasswordError(passwordError);
    } else {
      setLoading(true);
      setLoadingText(t("resetPassword:loadingTextSave"));
      setPasswordError(null);
      setError(null);
      const email = route.params.email;
      const hash = Base64.encode(`${email}:${password}`);
      const { status } = await resetPasswordService(hash);
      setLoading(false);
      setLoadingText("");
      if (status === 200) {
        Alert.alert(
          t("resetPassword:success"),
          t("resetPassword:successMessage")
        );
        navigation.navigate("Landing");
      } else {
        switch (status) {
          case 404:
            setError(t("resetPassword:errorUserNotFound"));
            break;
          case 409:
            setError(t("resetPassword:errorRequestExpired"));
            break;
          default:
            setError(t("resetPassword:errorCheckCode"));
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
        <STGHeaderBack
          navigation={navigation}
          title={t("resetPassword:headerTitle")}
        />
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.sectionTitle}>
                {t("resetPassword:title")}
              </Text>
              {error && <Text style={gStyles.errors}>{error}</Text>}

              {mode === CHECK ? (
                <>
                  <Text style={gStyles.textInputTitle}>
                    {t("resetPassword:inputTitle")}
                  </Text>
                  <TextInput
                    defaultValue={codeInput}
                    value={codeInput}
                    placeholder={t("resetPassword:inputPlaceholder")}
                    placeholderTextColor={"rgba(0,0,0,0.2)"}
                    onChangeText={(text) => setCodeInput(text)}
                    keyboardType="number-pad"
                    style={{
                      ...gStyles.textInput,
                      borderBottomColor: codeError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                    }}
                    onFocus={() => setCodeError(null)}
                  />
                  {codeError && <Text style={gStyles.helper}>{codeError}</Text>}
                </>
              ) : (
                <>
                  <Text style={gStyles.textInputTitle}>
                    {t("resetPassword:newPassword")}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      defaultValue={password}
                      value={password}
                      placeholder={t("resetPassword:newPassword")}
                      placeholderTextColor={"rgba(0,0,0,0.2)"}
                      onChangeText={(text) => setPassword(text)}
                      secureTextEntry={showPassword ? false : true}
                      textContentType="newPassword"
                      style={{
                        ...gStyles.textInput,
                        borderBottomColor: passwordError
                          ? "rgba(220,20,60,0.8)"
                          : "rgba(0,0,0,0.2)",
                        width: "100%",
                        paddingRight: 48,
                      }}
                      onFocus={() => setPasswordError(null)}
                    />
                    <TouchableOpacity
                      style={{
                        width: 48,
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        right: 0,
                      }}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? "ios-eye-off" : "ios-eye"}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                  {passwordError && (
                    <Text style={gStyles.helper}>{passwordError}</Text>
                  )}
                </>
              )}
            </STGScrollViewBody>
            <STGButton
              btnText={mode === CHECK ? t("common:next") : t("common:save")}
              onPress={mode === CHECK ? next : save}
            />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
