import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { STGContainer, STGButton, STGColors } from "stg-ui";
import { StructureDto } from "@components/structure/structure.dto";
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { generateRegisterPdfService } from "@services";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RegisterFour() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  const [structure, setStructure] = useState({});

  const generateRegisterPdf = async () => {
    const { data, status } = await generateRegisterPdfService(structure);
    if (status === 201) {
      const s = { ...structure };
      s["contractFile"] = `${data.filename}.pdf`;
      setStructure(s);
      navigation.navigate("RegisterFive", {
        data,
        structure,
      });
    }
  };

  useEffect(() => {
    const s = new StructureDto({ ...params.data });
    setStructure(s);
  }, []);

  return (
    <STGContainer>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode={"none"}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{
          flex: 1,
          marginBottom: 20,
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.r6Container}>
          <MaterialCommunityIcons
            name="check-circle"
            size={96}
            color={STGColors.container}
          />
          <Text style={styles.r6Text1}>{t("register:paymentOk")}</Text>
          <Text style={styles.r6Text2}>{t("register:paymentMessage")}</Text>
        </View>
        <STGButton
          btnText={t("register:generateContract")}
          onPress={generateRegisterPdf}
        />
      </ScrollView>
    </STGContainer>
  );
}
