import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export class STGSendMessage extends Component {
  static propTypes = {
    textInputPlaceholder: PropTypes.string,
    textInputStyle: PropTypes.object,
    onSendClick: PropTypes.func,
    onMessageTextChange: PropTypes.func,
    defaultValue: PropTypes.string,
  };
  static defaultProps = {
    textInputPlaceholder: "Écrivez un message",
    textInputStyle: {},
    onSendClick: () => {},
    onMessageTextChange: () => {},
    defaultValue: "",
  };
  render() {
    return (
      <View
        style={{
          width,
          minHeight: 48,
          maxHeight: 144,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 5,
          borderTopColor: "rgba(0,0,0,0.2)",
          borderTopWidth: 0.3,
        }}
      >
        <TextInput
          defaultValue={this.props.defaultValue}
          style={{
            paddingHorizontal: 5,
            width: width - 48,
            minHeight: 48,
            maxHeight: 144,
            ...this.props.textInputStyle,
          }}
          placeholder={this.props.textInputPlaceholder}
          onChangeText={(text) => this.props.onMessageTextChange(text)}
          multiline
        />
        <TouchableOpacity
          style={{
            width: 48,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.props.onSendClick}
        >
          <MaterialIcons name="send" size={32} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default STGSendMessage;
