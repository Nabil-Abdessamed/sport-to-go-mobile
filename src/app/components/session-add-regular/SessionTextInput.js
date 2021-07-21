import React from "react";
import { TextInput, Text } from "react-native";
import gStyles from "@components/styles";

export default function SessionTextInput({
  value = "",
  setValue = () => {},
  title = "",
  placeholder = "",
  placeholderColor = "rgba(0,0,0,0.2)",
  error = null,
  helper = null,
  textInputStyle = {},
  multiline = false,
  ...args
}) {
  return (
    <>
      {title && <Text style={gStyles.textInputTitle}>{title}</Text>}
      <TextInput
        defaultValue={value}
        value={value}
        style={{
          ...gStyles.textInput,
          borderBottomColor: error ? "rgba(220,20,60,0.8)" : "rgba(0,0,0,0.2)",
          ...textInputStyle,
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={(value) => setValue(value)}
        multiline={multiline}
        // keyboardType={"decimal-pad"}
        {...args}
      />
      {helper && <Text style={gStyles.helperText}>{helper}</Text>}
      {error && <Text style={gStyles.helper}>{error}</Text>}
    </>
  );
}
