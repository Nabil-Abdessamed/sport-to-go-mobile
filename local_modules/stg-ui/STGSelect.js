import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import STGFonts from "./STGFonts";

const { width, height } = Dimensions.get("window");

class STGSelect extends Component {
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
    data: PropTypes.array.isRequired,
    defaultText: PropTypes.string,
    selected: PropTypes.object,
    onSelect: PropTypes.func.isRequired
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
    data: [],
    defaultText: "Select item",
    selected: null,
    onSelect: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      visible: false,
      containerLayout: null,
      dataBodyLayout: null,
      bodyPos: 58
    };
  }

  render() {
    const styles = {
      container: {
        justifyContent: "center"
      },
      selectInput: {
        height: 48,
        width: "100%",
        borderColor: this.state.hasError ? "crimson" : "rgba(0,0,0,0.2)",
        borderWidth: 0.5,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white"
      },
      selectText: {
        color: "black",
        fontFamily: STGFonts.RobotoRegular,
        fontWeight: "500",
        fontSize: 16,
        textAlignVertical: "center"
      },
      selectOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width,
        height
      },
      dataContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      dataBody: {
        width: width - 20,
        backgroundColor: "white",
        ...Platform.select({
          ios: {
            shadowColor: "black",
            shadowOpacity: 0.35,
            shadowRadius: 10,
            shadowOffset: {
              height: 2,
              width: 0.5
            }
          },
          android: {
            elevation: 6
          }
        })
      },
      item: {
        height: 48,
        width: "100%",
        justifyContent: "center",
        marginLeft: 10
      }
    };
    return (
      <View>
        <TouchableOpacity
          style={{ ...styles.selectInput }}
          onPress={({ nativeEvent }) => {
            const max = nativeEvent.pageY + 48 + 48;
            const dataLength =
              this.props.data.length < 6 ? this.props.data.length * 48 : 6 * 48;
            const bodyPos =
              max > height
                ? nativeEvent.pageY - 58 - dataLength
                : nativeEvent.pageY - nativeEvent.locationY;
            this.setState({ visible: true, bodyPos });
          }}
        >
          <Text style={{ ...styles.selectText }}>
            {(this.props.selected && this.props.selected.name) ||
              this.props.defaultText}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={32} />
        </TouchableOpacity>
        <Modal
          visible={this.state.visible}
          transparent
          animated
          animationType={"fade"}
          onRequestClose={() => this.setState({ visible: false })}
        >
          <SafeAreaView style={{ ...styles.dataContainer }}>
            <TouchableOpacity
              style={{ ...styles.selectOverlay }}
              activeOpacity={1}
              onPressOut={() => {
                this.setState({ visible: false });
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    ...styles.dataBody,
                    // position: "absolute",
                    // top: this.state.bodyPos,
                    // maxHeight: 48 * 6
                  }}
                >
                  <FlatList
                    contentInsetAdjustmentBehavior="automatic"
                    scrollEnabled={true}
                    data={this.props.data}
                    keyExtractor={(item, index) => `select-${index}`}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{ ...styles.item }}
                        onPress={() => {
                          this.props.onSelect(item.value);
                          this.setState({ visible: false });
                        }}
                      >
                        <Text
                          style={{
                            fontWeight:
                              this.props.selected &&
                              this.props.selected.value === item.value
                                ? "bold"
                                : "300",
                            color: "black",
                            fontFamily: STGFonts.RobotoRegular,
                            fontSize: 14,
                            textAlignVertical: "center"
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

export default STGSelect;
