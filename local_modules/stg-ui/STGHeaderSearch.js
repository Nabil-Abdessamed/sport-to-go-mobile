import React, { Component } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import styles from "./STGStyles";

export class STGHeaderSearch extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.header}>
        <View style={{ ...styles.headerContainer, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              navigation.navigate("SearchStack");
            }}
          >
            <MaterialIcons name="search" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <IconEntypo name="home" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default STGHeaderSearch;
