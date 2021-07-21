import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function LoadingScreen({ loading }) {
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "absolute",
          top: 0,
          left: 0,
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    </TouchableWithoutFeedback>
  );
}
