import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import STGFonts from "./STGFonts";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  conainer: {
    justifyContent: "flex-end",
    padding: 5,
  },
  body: {
    minHeight: 48,
    backgroundColor: "white",
    borderRadius: 10,
  },
  cancelButtonContainer: {
    height: 48,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 10,
  },
  item: {
    height: 60,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.3,
    borderRadius: 10,
  },
  itemTitle: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16,
    alignSelf: "stretch",
    padding: 5,
    textAlignVertical: "center",
  },
  itemSeparator: { height: 1, backgroundColor: "rgba(0,0,0,0.2)" },
  itemIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16,
  },
  actionsTitleContainer: {
    backgroundColor: "white",
    minHeight: 48,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
  },
  actionsTitle: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16,
  },
  modalStyle: {
    margin: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

const DefaultItem = ({ item }) => (
  <TouchableOpacity onPress={item.onPress} style={styles.item}>
    <View style={styles.itemIcon}>{item.icon ? item.icon : null}</View>
    <Text style={styles.itemTitle}>{item.title}</Text>
  </TouchableOpacity>
);

const ItemSeparatorComponent = ({}) => <View style={styles.itemSeparator} />;

export class STGActionSheet extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.hide}
        style={[styles.conainer, styles.modalStyle]}
        swipeDirection={["up", "down"]}
        onSwipeComplete={this.props.hide}
        {...this.props}
      >
        <SafeAreaView style={styles.conainer}>
          <View style={styles.body}>
            {this.props.actionsTitle !== "" && (
              <View style={styles.actionsTitleContainer}>
                <Text style={styles.actionsTitle}>
                  {this.props.actionsTitle}
                </Text>
              </View>
            )}
            <FlatList
              data={this.props.items}
              keyExtractor={(_, key) => `item-${key}`}
              renderItem={({ item }) => <DefaultItem item={item} />}
              ItemSeparatorComponent={() => <ItemSeparatorComponent />}
            />
          </View>
          <TouchableOpacity
            style={styles.cancelButtonContainer}
            onPress={this.props.hide}
          >
            <Text style={styles.cancelButtonText}>
              {this.props.cancelButtonText}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }
}

STGActionSheet.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
      icon: PropTypes.element,
    })
  ),
  hide: PropTypes.func,
  cancelButtonText: PropTypes.string,
  actionsTitle: PropTypes.string,
};

STGActionSheet.defaultProps = {
  isVisible: false,
  items: [],
  hide: () => {},
  cancelButtonText: "Cancel",
  actionsTitle: "",
};

export default STGActionSheet;
