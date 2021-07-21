import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "../session-add-regular/Styles";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function HeaderRight({
  onPurchaseButtonPress = () => {},
  disableButton = false,
  t = () => {},
}) {
  return (
    <View style={Styles.headerRight}>
      <TouchableOpacity
        style={Styles.headerRightButton}
        onPress={onPurchaseButtonPress}
        disabled={disableButton}
      >
        <Text style={Styles.headerRightButtonText}>
          {t("session:payment.purchase")}
        </Text>
        <FontAwesome5Icon
          name="dollar-sign"
          size={18}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}
