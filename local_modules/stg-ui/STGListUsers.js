import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "@config";
import STGFonts from "./STGFonts";
import { STGAvatar } from "stg-ui";

const { width } = Dimensions.get("screen");

const Item = ({ item, onPress = () => {} }) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.itemContainer}
    onPress={onPress}
  >
    <STGAvatar uri={`${BASE_URL}/upload/avatars/${item.avatar}`} />
    <View style={styles.itemInfo}>
      {item.type === "PRO" ? (
        <>
          <Text style={styles.titleOne}>{item.partnershipName}</Text>
          <Text style={styles.titleTwo}>{item.fullname}</Text>
        </>
      ) : (
        <>
          <Text style={styles.titleOne}>{item.fullname}</Text>
          {item.description !== "" && (
            <Text style={styles.titleTwo}>{item.description}</Text>
          )}
        </>
      )}
    </View>
  </TouchableOpacity>
);

export class STGListUsers extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    hide: PropTypes.func,
    title: PropTypes.string,
    navigation: PropTypes.any,
  };

  static defaultProps = {
    data: [],
    visible: false,
    hide: () => {},
    title: "",
    navigation: {},
  };

  constructor(props) {
    super(props);
  }

  onPressItem(userId) {
    this.props.hide();
    this.props.navigation.navigate("ProfileShow", {
      user: userId,
    });
  }

  render() {
    const { data, visible, hide, title } = this.props;
    return (
      <Modal
        visible={visible}
        onRequestClose={hide}
        animationType="fade"
        presentationStyle={"overFullScreen"}
        hardwareAccelerated={true}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.header}>
            <View style={styles.actions}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.btnBack} onPress={hide}>
              <FontAwesome name="close" size={30} />
            </TouchableOpacity>
          </View>
          <FlatList
            contentInsetAdjustmentBehavior="automatic"
            data={data}
            keyExtractor={(_, index) => `list-index-${index}`}
            renderItem={({ item }) => (
              <Item
                item={item}
                onPress={() =>
                  this.onPressItem(
                    item.userId !== undefined ? item.userId : item.id
                  )
                }
              />
            )}
            contentContainerStyle={{
              padding: 10,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    height: 54,
    width,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.4,
    alignItems: "center",
  },
  title: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
    paddingLeft: 10,
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  btnBack: {
    height: 54,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    height: 54,
    width,
    // paddingHorizontal: 5,
    paddingBottom: 10,
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.4,
  },
  itemAvatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 0.4,
    borderColor: "rgba(0,0,0,0.4)",
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  titleOne: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 14,
  },
  titleTwo: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
  },
});

export default STGListUsers;
