import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Alert,
  Text,
  TextInput,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./style";
import gStyles from "@components/styles";
import * as validation from "./validation";
import { registerService, emailExists } from "@services";
import {
  STGContainer,
  STGButton,
  STGHeaderBack,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { UserParticular } from "@dto";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Register() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(new UserParticular());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullnameError, setFullnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  useEffect(() => {
    const type = params?.type || "PARTICULAR";
    _handleInputChange("type", type);
  }, []);

  const next = async () => {
    const fullnameError = validation.validateName(user.fullname, t);
    const emailError = validation.validateEmail(user.email, t);
    const passwordError = validation.validatePassword(user.password, t);
    const confirmPasswordError = validation.validateConfirmPassword(
      user.password,
      confirmPassword,
      t
    );
    const phoneError = validation.validatePhone(user.phone, t);
    const hasErrors =
      fullnameError ||
      emailError ||
      passwordError ||
      phoneError ||
      confirmPasswordError;
    if (hasErrors) {
      setFullnameError(fullnameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      setPhoneError(phoneError);
      setConfirmPasswordError(confirmPasswordError);
    } else {
      setLoading(true);
      setLoadingText(t("register:loadingText"));
      const checkEmailExistsResponse = await emailExists({ email: user.email });
      setLoading(false);
      setLoadingText("");
      if (checkEmailExistsResponse.status === 409) {
        setEmailError(t("register:emailAlreadyExist"));
      } else if (checkEmailExistsResponse.status === 201) {
        if (user.type === "PRO") {
          navigation.navigate("RegisterTwo", {
            user: user,
          });
        } else {
          setLoading(true);
          const registerResponse = await registerService(user);
          setLoading(false);
          if (registerResponse.status === 201) {
            Alert.alert(
              `${t("register:registerOk")} ${user.fullname}`,
              t("register:registerMessage")
            );
            navigation.goBack();
          } else {
            Alert.alert(`Oops !`, t("register:registerError"));
          }
        }
      } else {
        Alert.alert(`Oops !`, t("register:registerError"));
      }
    }
  };

  const _handleInputChange = (key, value) => {
    const u = { ...user };
    u[key] = value;
    setUser(u);
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
              {/* Section "Information personnel" */}
              <Text style={styles.textInputTitle}>{t("common:name")}</Text>
              <TextInput
                autoCapitalize="words"
                defaultValue={user.fullname}
                value={user.fullname}
                placeholder={t("common:namePlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => _handleInputChange("fullname", text)}
                style={[
                  styles.textInput,
                  fullnameError
                    ? { borderBottomColor: "rgba(220,20,60,0.8)" }
                    : null,
                ]}
                onFocus={() => setFullnameError(null)}
              />
              {fullnameError && (
                <Text style={gStyles.helper}>{fullnameError}</Text>
              )}

              {/* Section "Numéro de téléphone" */}
              <Text style={styles.textInputTitle}>
                {t("common:phoneNumber")}
              </Text>
              <TextInput
                defaultValue={user.phone}
                value={user.phone}
                placeholder={t("common:phoneNumberPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => _handleInputChange("phone", text)}
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                autoCompleteType="tel"
                style={[
                  styles.textInput,
                  phoneError
                    ? { borderBottomColor: "rgba(220,20,60,0.8)" }
                    : null,
                ]}
                onFocus={() => setPhoneError(null)}
              />
              {phoneError && <Text style={gStyles.helper}>{phoneError}</Text>}

              {/* Section "Information de compte" */}
              <Text style={styles.textInputTitle}>{t("common:email")}</Text>
              <TextInput
                autoCapitalize="none"
                defaultValue={user.email}
                value={user.email}
                placeholder={t("common:emailPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => _handleInputChange("email", text)}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCompleteType="email"
                style={[
                  styles.textInput,
                  emailError
                    ? { borderBottomColor: "rgba(220,20,60,0.8)" }
                    : null,
                ]}
                onFocus={() => setEmailError(null)}
              />
              {emailError && <Text style={gStyles.helper}>{emailError}</Text>}
              <Text style={styles.textInputTitle}>{t("common:password")}</Text>
              <TextInput
                secureTextEntry
                defaultValue={user.password}
                value={user.password}
                placeholder={t("common:passwordPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => _handleInputChange("password", text)}
                textContentType="password"
                style={[
                  styles.textInput,
                  passwordError
                    ? { borderBottomColor: "rgba(220,20,60,0.8)" }
                    : null,
                ]}
                onFocus={() => setPasswordError(null)}
              />
              {passwordError && (
                <Text style={gStyles.helper}>{passwordError}</Text>
              )}
              <Text style={styles.textInputTitle}>
                {t("common:confirmPassword")}
              </Text>
              <TextInput
                secureTextEntry
                defaultValue={confirmPassword}
                value={confirmPassword}
                placeholder={t("common:confirmPasswordPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(text) => setConfirmPassword(text)}
                textContentType="password"
                style={[
                  styles.textInput,
                  confirmPasswordError
                    ? { borderBottomColor: "rgba(220,20,60,0.8)" }
                    : null,
                ]}
                onFocus={() => setConfirmPasswordError(null)}
              />
              {confirmPasswordError && (
                <Text style={gStyles.helper}>{confirmPasswordError}</Text>
              )}
            </STGScrollViewBody>
            <STGButton
              btnText={
                user.type === "PRO" ? t("common:next") : t("common:save")
              }
              onPress={next}
            />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
