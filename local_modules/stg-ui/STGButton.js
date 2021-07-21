import React, { Component } from "react";
import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import STGFonts from "./STGFonts";
import STGColors from "./STGColors";

class STGButton extends Component {
  static propTypes = {
    btnText: PropTypes.string,
    btnIcon: PropTypes.any,
    containerStyle: PropTypes.object,
    btnTextStyle: PropTypes.object,
    isRequesting: PropTypes.bool,
    requestingText: PropTypes.string,
  };

  static defaultProps = {
    btnText: "",
    btnIcon: null,
    containerStyle: {},
    btnTextStyle: {},
    isRequesting: false,
    requestingText: "",
  };

  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      containerStyle: {
        height: 48,
        width: "100%",
        backgroundColor: STGColors.container,
        borderColor: "rgba(255,255,255,0.5)",
        borderWidth: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        opacity: this.props.disabled ? 0.5 : 1,
        borderRadius: 6,
      },
      btnTextStyle: {
        // flex: 1,
        color: "#000",
        fontSize: 16,
        fontFamily: STGFonts.RobotoMedium,
        textAlign: "center",
        paddingHorizontal: 10,
      },
      btnPadding: {
        paddingHorizontal: 5,
        marginVertical: 20,
      },
    };
    return (
      <View style={styles.btnPadding}>
        <TouchableOpacity
          style={{ ...styles.containerStyle, ...this.props.containerStyle }}
          {...this.props}
          activeOpacity={0.8}
        >
          {this.props.isRequesting && (
            <ActivityIndicator size="small" color="#000" />
          )}
          {this.props.btnIcon}
          <Text style={{ ...styles.btnTextStyle, ...this.props.btnTextStyle }}>
            {this.props.isRequesting
              ? this.props.requestingText
              : this.props.btnText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default STGButton;
