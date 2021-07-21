import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import gStyles from "../styles";
import _ from "lodash";
import JwtDecode from "jwt-decode";
import { updateUserProfileService } from "@services";
import { StructureUpdateDto } from "./structure.update.dto";
import { getToken, getUserInfo } from "@redux/actions";
import * as validation from "./validation";
import { STGContainer, STGScrollView, STGScrollViewBody } from "stg-ui";
import { useNavigation } from "@react-navigation/native";
import HeaderRight from "../profile/HeaderRight";

export default function Structure() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => <HeaderRight save={save} title={t("common:save")} />,
  });
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [structure, setStructure] = useState({});
  const [partnershipNameError, setPartnershipNameError] = useState(null);
  const [siretError, setSiretError] = useState(null);
  const [websiteError, setWebsiteError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    const s = new StructureUpdateDto({ ...user });
    setStructure(s);
  }, []);

  const _handleTextInputChange = (property, value) => {
    const s = _.clone(structure);
    s[property] = value;
    setStructure(s);
  };

  const save = async () => {
    const partnershipNameError = validation.validatePartnershipName(
      structure.partnershipName,
      t
    );
    if (partnershipNameError) {
      setPartnershipNameError(partnershipNameError);
    } else {
      setLoading(true);
      setLoadingText(t("mySpace:editProfile.loadingText"));
      const { data, status } = await updateUserProfileService(structure);
      setLoading(false);
      setLoadingText("");
      if (_.inRange(status, 200, 300)) {
        const user = JwtDecode(data.token);
        dispatch(getToken(data.token));
        dispatch(getUserInfo(user));
        setStructure(new StructureUpdateDto({ ...user }));
        if (Platform.OS === "ios") {
          Alert.alert(
            t("mySpace:editProfile.success"),
            t("mySpace:editProfile.successMessage")
          );
        }
        if (Platform.OS === "android") {
          ToastAndroid.show(
            t("mySpace:editProfile.successMessage"),
            ToastAndroid.LONG
          );
        }
      } else {
        Alert.alert(
          t("mySpace:editProfile.error"),
          t("mySpace:editProfile.errorMessage"),
          [{ text: t("common:cancel") }, { text: t("common:tryAgain") }],
          { cancelable: false }
        );
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
                {t("common:partnershipName")}
              </Text>
              <TextInput
                defaultValue={structure.partnershipName || ""}
                value={structure.partnershipName || ""}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: partnershipNameError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("common:partnershipNamePlaceholder")}
                onChangeText={(value) => {
                  _handleTextInputChange("partnershipName", value);
                  const partnershipNameError = validation.validatePartnershipName(
                    value,
                    t
                  );
                  setPartnershipNameError(partnershipNameError);
                }}
              />
              {partnershipNameError && (
                <Text style={gStyles.helper}>{partnershipNameError}</Text>
              )}
              {structure.siretNumber !== "" && (
                <>
                  <Text style={gStyles.textInputTitle}>
                    {t("common:siretNumber")}
                  </Text>
                  <TextInput
                    editable={false}
                    defaultValue={structure.siretNumber || ""}
                    value={structure.siretNumber || ""}
                    keyboardType="number-pad"
                    style={{
                      ...gStyles.textInput,
                      borderBottomColor: siretError
                        ? "rgba(220,20,60,0.6)"
                        : "rgba(0,0,0,0.2)",
                    }}
                    placeholder={t("common:siretNumberPlaceholder")}
                    onChangeText={(value) => {
                      _handleTextInputChange("siretNumber", value);
                      const siretError = validation.validateSiret(value, t);
                      setSiretError(siretError);
                    }}
                  />
                  {siretError && (
                    <Text style={gStyles.helper}>{siretError}</Text>
                  )}
                </>
              )}
              <Text style={gStyles.textInputTitle}>{t("common:website")}</Text>
              <TextInput
                defaultValue={structure.website || ""}
                value={structure.website || ""}
                multiline
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: websiteError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("common:websitePlaceholder")}
                onChangeText={(value) => {
                  _handleTextInputChange("website", value);
                  const websiteError = validation.validateWebsite(value, t);
                  setWebsiteError(websiteError);
                }}
              />
              {websiteError && (
                <Text style={gStyles.helper}>{websiteError}</Text>
              )}
            </STGScrollViewBody>
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
