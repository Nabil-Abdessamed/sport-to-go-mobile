import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import STGCard from "./STGCard";
import STGText from "./STGText";
import STGColors from "./STGColors";
import PropTypes from "prop-types";

export class STGModalInfo extends Component {
  static propTypes = {
    hasResponse: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    close: PropTypes.func,
    type: PropTypes.string
  };
  static defaultProps = {
    hasResponse: false,
    title: "",
    message: "",
    close: () => {},
    type: "default"
  };
  constructor(props) {
    super(props);
  }

  _renderBorderColor(type) {
    switch (type) {
      case "info":
        return STGColors.info;
      case "success":
        return STGColors.success;
      case "error":
        return STGColors.error;
      case "warning":
        return STGColors.warning;
      default:
        return STGColors.default;
    }
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.hasResponse}
        animated
        animationType="fade"
        onRequestClose={() => this.props.close()}
        {...this.props}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
            paddingHorizontal: 10
          }}
          onPressOut={() => this.props.close()}
        >
          <TouchableWithoutFeedback>
            <STGCard
              containerStyle={{
                borderRadius: 12,
                borderColor: this._renderBorderColor(this.props.type),
                borderWidth: 0.5,
                padding: 10
              }}
            >
              <STGText
                text={this.props.title}
                size={16}
                weight="700"
                textStyle={{ marginBottom: 10 }}
              />
              <STGText text={this.props.message} />
            </STGCard>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default STGModalInfo;
