import React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@constants";

export const Loading = ({ children, loading = false, style = {} }) => (
  <View
    style={[
      {
        flex: 1,
        backgroundColor: colors.background,
        ...style
      },
      loading ? { justifyContent: "center", alignItems: "center" } : {}
    ]}
  >
    {loading ? (
      <ActivityIndicator color="black" size={"large"} animating />
    ) : (
      children
    )}
  </View>
);
