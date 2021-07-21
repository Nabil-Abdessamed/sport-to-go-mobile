import React, { useState } from "react";
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Picker,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  STGContainer,
  STGBody,
  STGButton,
  STGScrollViewBody,
  STGScrollView,
} from "stg-ui";
import gStyles from "../styles";
import { B2BType } from "./B2BType";
import { useNavigation, StackActions } from "@react-navigation/native";
import HeaderStyle from "@components/styles/HeaderStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import B2bHelpers from "./Helpers";

const HeaderLeft = ({ onPress }) => (
  <TouchableOpacity style={HeaderStyle.headerBtnBack} onPress={onPress}>
    <Ionicons name="ios-arrow-back" size={30} color="#000" />
  </TouchableOpacity>
);

export default function B2BSearch() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => <HeaderLeft onPress={navigation.goBack} />,
  });
  // States
  const [search, setSearch] = useState("");
  const [type, setType] = useState(B2BType.AD);

  const done = () => {
    B2bHelpers.getB2bItemsBySearch(type, search);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGScrollView>
        <STGContainer>
          <STGBody>
            <STGScrollViewBody>
              <Text style={gStyles.textInputTitle}>{t("b2b:type")}</Text>
              <Picker
                selectedValue={type}
                onValueChange={(type) => setType(type)}
                mode="dropdown"
              >
                <Picker.Item
                  label={t("b2b:equipment")}
                  value={B2BType.EQUIPMENT}
                />
                <Picker.Item label={t("b2b:ad")} value={B2BType.AD} />
                <Picker.Item label={t("b2b:sale")} value={B2BType.SALE} />
              </Picker>
              <Text style={gStyles.textInputTitle}>{t("b2b:search")}</Text>
              <TextInput
                defaultValue={search}
                value={search}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: "rgba(0,0,0,0.2)",
                }}
                placeholder={t("common:searchPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={setSearch}
              />
            </STGScrollViewBody>
            <STGButton btnText={t("common:done")} onPress={done} />
          </STGBody>
        </STGContainer>
      </STGScrollView>
    </KeyboardAvoidingView>
  );
}
