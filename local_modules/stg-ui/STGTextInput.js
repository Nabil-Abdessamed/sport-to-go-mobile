import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import STGFonts from "./STGFonts";

export default class STGTextInput extends Component {
  static propType = {
    containterStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func,
    textErrorColor: PropTypes.string,
    textErrorStyle: PropTypes.object,
    textError: PropTypes.string,
    hasError: PropTypes.bool,
    alignError: PropTypes.string,
    showTextErrorTimer: PropTypes.number,
    errors: PropTypes.array,
    textInputProps: PropTypes.object
  };

  static defaultProps = {
    containterStyle: {},
    textInputStyle: {},
    placeholder: "",
    placeholderTextColor: "rgba(0,0,0,0.5)",
    onChangeText: () => {},
    textErrorColor: "crimson",
    textErrorStyle: {},
    textError: "",
    hasError: false,
    alignError: "flex-start",
    showTextErrorTimer: 3000,
    errors: [],
    textInputProps: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      showTextError: false,
      isBlurred: false,
      textError: "",
      hasError: false
    };

    this.validate = this.validate.bind(this);
  }

  validate() {
    const BreakException = {};
    try {
      this.props.errors.forEach(item => {
        if (item.validate) {
          this.setState({ hasError: true, textError: item.message });
          throw BreakException;
        }
        if (this.state.hasError) {
          this.setState({ hasError: false, textError: "" });
        }
      });
    } catch (e) {
      if (e !== BreakException) return e;
    }
  }

  render() {
    const styles = {
      container: {
        justifyContent: "center",
        marginVertical: 5
      },
      textInput: {
        height: 48,
        width: "100%",
        backgroundColor: "white",
        borderColor:
          this.state.isBlurred && this.state.hasError && this.props.hasError
            ? "crimson"
            : this.state.isBlurred &&
              !this.state.hasError &&
              this.props.hasError
            ? "limegreen"
            : "rgba(0,0,0,0.2)",
        borderWidth: 0.5,
        borderRadius: 5,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 25
      },
      textErrorStyle: {
        color: this.props.textErrorColor,
        fontFamily: STGFonts.RobotoRegular,
        fontSize: 12,
        fontWeight: "500",
        marginTop: 5,
        alignSelf: this.props.alignError,
        position: "absolute",
        right: 34
      },
      icon: {
        position: "absolute",
        right: 5
      }
    };
    return (
      <View style={{ ...styles.container, ...this.props.containterStyle }}>
        <TextInput
          returnKeyType={"done"}
          style={{ ...styles.textInput, ...this.props.textInputStyle }}
          placeholder={this.props.placeholder}
          placeholderTextColor={
            this.state.isBlurred && this.state.hasError && this.props.hasError
              ? "crimson"
              : this.state.isBlurred &&
                !this.state.hasError &&
                this.props.hasError
              ? "limegreen"
              : "rgba(0,0,0,0.2)"
          }
          onChangeText={this.props.onChangeText}
          onBlur={() => {
            this.setState({ isBlurred: true });
            this.validate();
          }}
          {...this.props}
        />
        {this.state.isBlurred && this.state.hasError && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              this.setState(
                { showTextError: !this.state.showTextError },
                () => {
                  if (this.props.showTextErrorTimer !== 0) {
                    setTimeout(
                      () =>
                        this.setState({
                          showTextError: false
                        }),
                      this.props.showTextErrorTimer
                    );
                  }
                }
              )
            }
          >
            <MaterialIcons
              name="error"
              color={this.props.textErrorColor}
              size={24}
            />
          </TouchableOpacity>
        )}
        {this.state.isBlurred &&
          !this.state.hasError &&
          this.props.hasError && (
            <MaterialIcons
              name="check"
              color={"limegreen"}
              size={24}
              style={styles.icon}
            />
          )}
        {this.state.showTextError && (
          <Text
            style={{ ...styles.textErrorStyle, ...this.props.textErrorStyle }}
          >
            {this.state.textError}
          </Text>
        )}
      </View>
    );
  }
}
