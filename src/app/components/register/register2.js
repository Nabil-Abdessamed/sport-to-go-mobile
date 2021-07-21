import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import gStyles from "@components/styles";
import styles from "./style";
import * as validation from "@components/structure/validation";
import {
  STGContainer,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { StructureDto } from "@components/structure/structure.dto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  validatePartnershipName,
  validateSiret,
  validateAddress,
  validatePoste,
  validateCountry,
  validateCity,
} from "../structure/validation";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RegisterTwo() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [structure, setStructure] = useState({});
  const [partnershipNameError, setPartnershipNameError] = useState(null);
  const [siretError, setSiretError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [postalCodeError, setPostalCodeError] = useState(null);
  const [websiteError, setWebsiteError] = useState(null);
  const [tmpType, setTmpType] = useState("COACH");

  const _handleTextInputChange = (property, value) => {
    const s = { ...structure };
    s[property] = value;
    setStructure(s);
  };

  const next = () => {
    const partnershipNameError = validatePartnershipName(
      structure.partnershipName,
      t
    );
    const siretError = validateSiret(structure.siretNumber, t);
    const addressError = validateAddress(structure.address, t);
    const countryError = validateCountry(structure.address, t);
    const cityError = validateCity(structure.address, t);
    const postalCodeError = validatePoste(structure.postalCode, t);
    const hasErrors =
      partnershipNameError ||
      siretError ||
      countryError ||
      cityError ||
      addressError ||
      postalCodeError;
    if (hasErrors) {
      setPartnershipNameError(partnershipNameError);
      setSiretError(siretError);
      setCountryError(countryError);
      setCityError(cityError);
      setAddressError(addressError);
      setPostalCodeError(postalCodeError);
    } else {
      navigation.navigate("RegisterThree", {
        data: structure,
      });
    }
  };

  useEffect(() => {
    const user = params?.user;
    const structure = new StructureDto({ ...user });
    setStructure(structure);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
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
              placeholderTextColor={"rgba(0,0,0,0.2)"}
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
            <Text style={gStyles.textInputTitle}>
              {t("common:siretNumber")}
            </Text>
            <TextInput
              defaultValue={structure.siretNumber || ""}
              value={structure.siretNumber || ""}
              keyboardType="number-pad"
              style={{
                ...gStyles.textInput,
                borderBottomColor: siretError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("common:siretNumberPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => {
                _handleTextInputChange("siretNumber", value);
                const siretError = validation.validateSiret(value, t);
                setSiretError(siretError);
              }}
            />
            {siretError && <Text style={gStyles.helper}>{siretError}</Text>}
            {/* Country  */}
            <Text style={gStyles.textInputTitle}>{t("common:country")}</Text>
            <TextInput
              defaultValue={structure.country || ""}
              value={structure.country || ""}
              style={{
                ...gStyles.textInput,
                borderBottomColor: countryError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("common:countryPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => {
                _handleTextInputChange("country", value);
                const countryError = validation.validateCountry(value, t);
                setCountryError(countryError);
              }}
            />
            {countryError && <Text style={gStyles.helper}>{countryError}</Text>}
            {/* City  */}
            <Text style={gStyles.textInputTitle}>{t("common:city")}</Text>
            <TextInput
              defaultValue={structure.city || ""}
              value={structure.city || ""}
              style={{
                ...gStyles.textInput,
                borderBottomColor: cityError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("common:cityPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => {
                _handleTextInputChange("city", value);
                const cityError = validation.validateCity(value, t);
                setCityError(cityError);
              }}
            />
            {cityError && <Text style={gStyles.helper}>{cityError}</Text>}
            {/* Address  */}
            <Text style={gStyles.textInputTitle}>{t("common:address")}</Text>
            <TextInput
              defaultValue={structure.address || ""}
              value={structure.address || ""}
              style={{
                ...gStyles.textInput,
                borderBottomColor: addressError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("common:addressPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => {
                _handleTextInputChange("address", value);
                const addressError = validation.validateAddress(value, t);
                setAddressError(addressError);
              }}
            />
            {addressError && <Text style={gStyles.helper}>{addressError}</Text>}
            <Text style={gStyles.textInputTitle}>{t("common:postalCode")}</Text>
            <TextInput
              defaultValue={structure.postalCode || ""}
              value={structure.postalCode || ""}
              style={{
                ...gStyles.textInput,
                borderBottomColor: postalCodeError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("common:postalCodePlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => {
                _handleTextInputChange("postalCode", value);
                const postalCodeError = validation.validateAddress(value, t);
                setPostalCodeError(postalCodeError);
              }}
            />
            {postalCodeError && (
              <Text style={gStyles.helper}>{postalCodeError}</Text>
            )}
            <Text style={gStyles.textInputTitle}>{t("common:website")}</Text>
            <TextInput
              defaultValue={structure.website || ""}
              value={structure.website || ""}
              style={{
                ...gStyles.textInput,
                borderBottomColor: websiteError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("common:websitePlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => {
                _handleTextInputChange("website", value);
              }}
            />
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() => {
                setTmpType("COACH");
                _handleTextInputChange("partnershipType", "COACH");
              }}
            >
              <MaterialCommunityIcons
                name={
                  tmpType === "COACH" ? "radiobox-marked" : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    tmpType === "COACH" ? styles.partnershipTextSelected : {},
                  ]}
                >
                  {t("common:coach")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() => {
                setTmpType("FITNESS_CLUB");
                _handleTextInputChange("partnershipType", "FITNESS_CLUB");
              }}
            >
              <MaterialCommunityIcons
                name={
                  tmpType === "FITNESS_CLUB"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    tmpType === "FITNESS_CLUB"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {t("common:fitnessClub")}
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() => {
                setTmpType("CROSSFIT_CLUB");
                _handleTextInputChange("partnershipType", "CROSSFIT_CLUB");
              }}
            >
              <MaterialCommunityIcons
                name={
                  tmpType === "CROSSFIT_CLUB"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    tmpType === "CROSSFIT_CLUB"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {t("common:crossfitClub")}
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() => {
                setTmpType("ASSOCIATION");
                _handleTextInputChange("partnershipType", "ASSOCIATION");
              }}
            >
              <MaterialCommunityIcons
                name={
                  tmpType === "ASSOCIATION"
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    tmpType === "ASSOCIATION"
                      ? styles.partnershipTextSelected
                      : {},
                  ]}
                >
                  {t("common:association")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.partnershipItem}
              onPress={() => {
                setTmpType("OTHER");
                _handleTextInputChange("partnershipType", "");
              }}
            >
              <MaterialCommunityIcons
                name={
                  tmpType === "OTHER" ? "radiobox-marked" : "radiobox-blank"
                }
                size={24}
              />
              <View>
                <Text
                  style={[
                    styles.partnershipText,
                    tmpType === "OTHER" ? styles.partnershipTextSelected : {},
                  ]}
                >
                  {t("common:other")}
                </Text>
              </View>
            </TouchableOpacity>
            {tmpType === "OTHER" && (
              <>
                <Text style={gStyles.textInputTitle}>{t("common:other")}</Text>
                <TextInput
                  defaultValue={structure.partnershipType || ""}
                  value={structure.partnershipType || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: typeError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("common:otherPlaceholder")}
                  placeholderTextColor={"rgba(0,0,0,0.2)"}
                  onChangeText={(value) => {
                    _handleTextInputChange("partnershipType", value);
                  }}
                />
              </>
            )}
          </STGScrollViewBody>
          <STGButton btnText={t("common:next")} onPress={next} />
        </STGContainer>
      </STGScrollView>
    </KeyboardAvoidingView>
  );
}
