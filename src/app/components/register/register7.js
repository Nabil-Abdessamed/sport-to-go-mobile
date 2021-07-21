import React, { useState, useEffect } from "react";
import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import gStyles from "@components/styles";
import {
  STGContainer,
  STGButton,
  STGScrollViewBody,
  STGScrollView,
} from "stg-ui";
import { StructureDto } from "@components/structure/structure.dto";
import { checkFreeRegistrationCodeService } from "@services";
import { useTranslation } from "react-i18next";
import { validateCode } from "./validation";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RegisterSeven() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [structure, setStructure] = useState({});

  const handleTextInputChange = (value) => {
    setCode(value.trim());
    setCodeError(validateCode(value.trim(), t));
  };

  const checkFreeRegistrationCode = async () => {
    setLoading(true);
    const { data, status } = await checkFreeRegistrationCodeService(code);
    setLoading(false);
    if (status === 500) {
      Alert.alert("Erreur serveur");
    }
    if (status === 404 || status === 409) {
      Alert.alert("Code incorrect.");
    }
    if (status === 200) {
      const s = { ...structure };
      s.freeCodeId = data.id;
      setStructure(s);
      navigation.navigate("RegisterSix", {
        structure: { ...structure, freeCodeId: data.id },
      });
    }
  };

  const validate = () => {
    const codeError = validateCode(code, t);
    setCodeError(codeError);
  };

  useEffect(() => {
    validate();
    const structure = new StructureDto({
      ...params.structure,
      registrationType: "FREE",
    });
    setStructure(structure);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading}>
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.textInputTitle}>
                {t("register:freeRegistrationCodeTitle")}
              </Text>
              <TextInput
                defaultValue={code}
                value={code}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: "rgba(0,0,0,0.2)",
                }}
                placeholder={"_ _ _ _ - _ _ _ _ - _ _ _ _ - _ _ _ _"}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) => handleTextInputChange(value)}
                maxLength={16}
                autoFocus={true}
              />
              {codeError && <Text style={gStyles.helper}>{codeError}</Text>}
            </STGScrollViewBody>
            <STGButton
              disabled={codeError !== null}
              btnText={t("common:next")}
              onPress={checkFreeRegistrationCode}
            />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
