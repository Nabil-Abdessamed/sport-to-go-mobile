import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { STGContainer } from "stg-ui";
import HeaderRight from "./HeaderRight";

const initialProps = {
  children: {},
  navigation: {},
  onSaveButtonPress: () => {},
  onMapButtonPress: () => {},
  onImageButtonPress: () => {},
  isImage: false,
  isMap: false,
  disableButton: false,
};

export default function EditFormContainer(props = initialProps) {
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderRight
        onSaveButtonPress={props.onSaveButtonPress}
        onMapButtonPress={props.onMapButtonPress}
        onImageButtonPress={props.onImageButtonPress}
        isImage={props.isImage}
        isMap={props.isMap}
        disableButton={props.disableButton}
      />
    ),
  });
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer>{props.children}</STGContainer>
    </KeyboardAvoidingView>
  );
}
