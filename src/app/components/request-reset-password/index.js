import React, { Component, useState } from "react";
import {
  KeyboardAvoidingView,
  Alert,
  TextInput,
  Text,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { sendEmailForgotPasswordService } from "@services";
import {
  STGContainer,
  STGButton,
  STGHeaderBack,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import gStyles from "@components/styles";
import validator from "validator";
import { useNavigation } from "@react-navigation/native";

export default function RequestResetPassword({ navigation }) {
  const { t } = useTranslation();
  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [errors, setErrors] = useState(null);

  const validateEmailForgotPassword = (text) => {
    if (!validator.isEmail(text)) {
      return `Veuillez entrer un email valide.`;
    }
    return null;
  };

  const sendEmailForgotPassword = async () => {
    const emailError = validateEmailForgotPassword(email);
    if (emailError !== null) {
      setEmailError(emailError);
    } else {
      setLoading(true);
      setLoadingText(t("forgotPassword:loadingText"));
      const { data, status } = await sendEmailForgotPasswordService(email);
      setLoading(false);
      setLoadingText("");
      if (status === 200) {
        navigation.navigate("ResetPassword", { email });
      } else {
        switch (status) {
          case 404:
          case 409:
            navigation.navigate("ResetPassword", { email });
            break;
          default:
            setErrors(t("resetPassword:error"));
            break;
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
          title={t("forgotPassword:headerTitle")}
        />
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.sectionTitle}>
                {t("forgotPassword:title")}
              </Text>
              {errors && <Text style={gStyles.errors}>{errors}</Text>}
              <Text style={gStyles.textInputTitle}>{t("common:email")}</Text>
              <TextInput
                defaultValue={email}
                value={email}
                placeholder={t("common:emailPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => setEmail(text)}
                textContentType="emailAddress"
                keyboardType="email-address"
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: emailError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                onFocus={() => setEmailError(null)}
              />
              {emailError && <Text style={gStyles.helper}>{emailError}</Text>}
            </STGScrollViewBody>
            <STGButton
              onPress={sendEmailForgotPassword}
              btnText={t("common:send")}
            />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
