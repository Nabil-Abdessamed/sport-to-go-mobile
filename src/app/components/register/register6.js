import React, {  useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { STGContainer, STGColors } from "stg-ui";
import { registerService } from "@services";
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RegisterSix() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [saved, setSaved] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    save();
  }, []);

  const save = async () => {
    setLoading(true);
    setLoadingText(t("register:loadingText"));
    const { status, data } = await registerService(params.structure);
    setLoading(false);
    setLoadingText("");
    if (status === 201) {
      setSaved("success");
      setTitle(params.structure.fullname);
    } else {
      setSaved("error");
      setTitle(t("register:registerKo"));
    }
  };

  return (
    <STGContainer loading={loading} loadingText={loadingText}>
      <View style={styles.r6Container}>
        {saved === "success" && (
          <>
            <MaterialCommunityIcons
              name="check-circle"
              size={96}
              color={STGColors.container}
            />
            <Text style={styles.r6Text1}>{`${t(
              "register:registerOk"
            )} ${title}`}</Text>
            <Text style={styles.r6Text2}>{t("register:registerMessage")}</Text>
            <View style={{ marginTop: 20 }}>
              <Button
                title={t("common:continue")}
                color={STGColors.container}
                onPress={() => navigation.navigate("Landing")}
              />
            </View>
          </>
        )}
        {saved === "error" && (
          <>
            <MaterialIcons name="error" size={96} color={STGColors.container} />
            <Text style={styles.r6Text1}>{title}</Text>
            <Text style={styles.r6Text2}>{t("register:registerError")}</Text>
            <View style={{ marginTop: 20 }}>
              <Button
                title={t("common:tryAgain")}
                color={STGColors.container}
                onPress={save}
              />
            </View>
          </>
        )}
      </View>
    </STGContainer>
  );
}
