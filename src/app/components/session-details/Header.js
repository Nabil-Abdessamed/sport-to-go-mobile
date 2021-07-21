import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { STGColors, STGFonts } from "stg-ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      navigation,
      back,
      showSubscribers,
      subscribersNumber,
      edit,
      remove,
      showActions
    } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={back}>
          <Ionicons name="ios-arrow-back" size={30} color="#000000" />
        </TouchableOpacity>
        <View style={styles.actions}>
          {showActions && (
            <>
              <TouchableOpacity style={styles.btn} onPress={remove}>
                <FontAwesome5 name="trash-alt" size={24} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={edit}>
                <MaterialIcons name="edit" size={30} color="#000000" />
              </TouchableOpacity>
              {Number(subscribersNumber) > 0 && (
                <TouchableOpacity style={styles.btn} onPress={showSubscribers}>
                  <FontAwesome5 name="users" size={24} color="#000000" />
                  <View style={styles.subscribers}>
                    <Text style={styles.subscribersText}>{`${
                      Number(subscribersNumber) > 99 ? "+99" : subscribersNumber
                    }`}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: STGColors.container,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btn: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  actions: {
    flexDirection: "row",
    height: 48,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  subscribers: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 2,
    right: 2,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  subscribersText: {
    color: "white",
    fontSize: 9,
    fontFamily: STGFonts.RobotoRegular
  }
});

export default Header;
