import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import STGColors from "stg-ui/STGColors";
import { STGContainer, STGButton, STGText, STGFonts } from "stg-ui";
import validator from "validator";
import { getUsersBySearchService, getConversationService } from "@services";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

export class ChatSearchScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    keyboardVisible: false,
    searchValue: "",
    data: []
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = e => {
    this.setState({
      keyboardVisible: true
    });
  };

  _keyboardDidHide = () => {
    this.setState({ keyboardVisible: false, keyboardHeight: 0 });
  };

  getUsersBySearch = () => {
    Keyboard.dismiss();
    if (!validator.isEmpty(this.state.searchValue)) {
      getUsersBySearchService(this.state.searchValue)
        .then(({ data }) => {
          this.setState({ data });
        })
        .catch(() => this.setState({ data: [] }));
    }
  };

  getConversation = async id => {
    const { data, status } = await getConversationService(id);
    if (status === 200 && data) {
      this.props.navigation.navigate("MessageScreen", {
        conversation: data,
        title: data.user.fullName || null
      });
    }
  };

  render() {
    const {
      navigation,
      screenProps: { t }
    } = this.props;
    const { data, searchValue } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
      >
        <STGContainer>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.btnGoback}
              onPress={() => {
                const onGoBack = navigation.getParam("onGoBack");
                if (onGoBack !== undefined) {
                  onGoBack();
                }
                this.props.navigation.goBack();
              }}
            >
              <Ionicons
                name="ios-arrow-back"
                size={30}
                color={STGColors.body}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.searchTextInput}
              placeholder={t("chat:inputSearch")}
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoFocus
              returnKeyType="search"
              defaultValue={searchValue}
              value={searchValue}
              onChangeText={text => this.setState({ searchValue: text })}
              blurOnSubmit={true}
              onSubmitEditing={this.getUsersBySearch}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: STGColors.body }}>
            <FlatList
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="automatic"
              data={data}
              keyExtractor={(item, index) => `search-item-${index}`}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      width: "100%"
                    }}
                    onPress={() => this.getConversation(item.id)}
                  >
                    <STGText
                      text={item.fullname}
                      size={16}
                      weight="700"
                      ellipsizeMode={"tail"}
                      numberOfLines={2}
                    />
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    marginVertical: 5,
                    height: 0.5,
                    backgroundColor: "rgba(0,0,0,0.1)"
                  }}
                />
              )}
            />
            {!validator.isEmpty(searchValue) && (
              <STGButton
                btnText={t("chat:inputSearch")}
                btnTextStyle={{
                  color: "rgba(0,0,0,0.6)",
                  fontSize: 12
                }}
                containerStyle={{
                  borderRadius: 0,
                  height: 48,
                  backgroundColor: "white"
                }}
                onPress={this.getUsersBySearch}
              ></STGButton>
            )}
          </View>
        </STGContainer>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    backgroundColor: STGColors.container,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(255,255,255,0.2)",
    borderBottomWidth: 0.5,
    paddingRight: 10
  },
  btnGoback: {
    height: 64,
    width: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  searchTextInput: {
    flex: 1,
    height: 48,
    color: "black",
    borderRadius: 16,
    backgroundColor: STGColors.body,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "flex-start"
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["common", "chat"], { withRef: true })(ChatSearchScreen));
