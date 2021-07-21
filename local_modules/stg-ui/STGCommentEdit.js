import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";
import STGFonts from "./STGFonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5
  },
  header: {
    height: 48,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 0.5
  },
  headerButtonBack: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  headerTitle: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 18
  },
  footer: {
    height: 48,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "rgba(0,0,0,0.5)",
    borderTopWidth: 0.5
  },
  saveButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 1,
    padding: 5
  },
  textInput: {
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "ghostwhite",
    borderRadius: 24,
    lineHeight: 24,
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 18
  },
  saveButtonText: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18
  }
});

class STGCommentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        hideModalContentWhileAnimating={true}
        coverScreen={true}
        onBackdropPress={this.props.hide}
        onBackButtonPress={this.props.hide}
        swipeDirection={["up", "down"]}
        onSwipeComplete={this.props.hide}
        propagateSwipe={true}
        style={{ flex: 1 }}
        {...this.props}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.headerButtonBack}
                  onPress={this.props.hide}
                >
                  <Ionicons name="ios-arrow-back" size={28} />
                </TouchableOpacity>
                {this.props.title !== "" && (
                  <Text style={styles.headerTitle}>{this.props.title}</Text>
                )}
              </View>
              <View style={styles.body}>
                <TextInput
                  autoFocus
                  multiline
                  style={styles.textInput}
                  defaultValue={this.props.comment}
                  value={this.props.comment}
                  placeholder={this.props.placeholder}
                  onChangeText={this.props.onChangeText}
                />
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.props.onPressSaveButton}
                  disabled={this.props.comment === ""}
                >
                  <Text
                    style={[
                      styles.saveButtonText,
                      this.props.comment === ""
                        ? { color: "rgba(0,0,0,0.4)" }
                        : null
                    ]}
                  >
                    {this.props.saveButtonTitle}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

STGCommentEdit.propTypes = {
  comment: PropTypes.string,
  onChangeText: PropTypes.func,
  onPressSaveButton: PropTypes.func,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  saveButtonTitle: PropTypes.string
};

STGCommentEdit.defaultProps = {
  comment: "",
  onChangeText: () => {},
  onPressSaveButton: () => {},
  title: "",
  placeholder: "",
  saveButtonTitle: "Save"
};

export default STGCommentEdit;
