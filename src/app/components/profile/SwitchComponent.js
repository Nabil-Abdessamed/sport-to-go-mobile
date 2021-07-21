import React from "react";
import { View, Text, Switch } from "react-native";
import styles from "./style";

export default function SwitchComponent({
  fieldName,
  fieldValue,
  title = "",
  onFieldVisibleValueChange = () => {},
}) {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{title}</Text>
      <Switch
        value={fieldValue}
        onValueChange={(value) => onFieldVisibleValueChange(fieldName, value)}
        style={styles.switch}
      />
    </View>
  );
}
