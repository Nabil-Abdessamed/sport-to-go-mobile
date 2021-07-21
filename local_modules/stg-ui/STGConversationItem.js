import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import FastImage from "react-native-fast-image";
import STGAvatarMessage from "./STGAvatarMessage";
import STGFonts from "./STGFonts";
const { width } = Dimensions.get("window");

const Now = new Date();

class STGConversationItem extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    data: PropTypes.any,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    containerStyle: {},
    data: {},
    onSelect: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      layoutWidth: 48,
    };
  }

  _renderDate = (date) => {
    const oldDate = new Date(date);
    const oldDateYear = oldDate.getFullYear();
    const oldDateMonth = oldDate.getMonth();
    const oldDateDate = oldDate.getDate();
    const newDateYear = Now.getFullYear();
    const newDateMonth = Now.getMonth();
    const newDateDate = Now.getDate();
    if (
      oldDateYear === newDateYear &&
      oldDateMonth === newDateMonth &&
      oldDateDate === newDateDate
    ) {
      return moment(date).format("HH:mm");
    }
    if (oldDateYear === newDateYear && oldDateMonth === newDateMonth) {
      return moment(date).format("ddd, HH:mm");
    }
    if (oldDateYear === newDateYear) {
      return moment(date).format("ddd DD MMM, HH:mm");
    }
    return moment(date).format("ddd DD MMM YYYY, HH:mm");
  };
  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={{
          ...styles.container,
          ...this.props.containerStyle,
        }}
        {...this.props}
        onPress={this.props.onSelect}
      >
        {Number(data.messagesCount) > 0 && (
          <View style={styles.unreadMessageIndicator} />
        )}
        <STGAvatarMessage avatar={data.avatar} />
        {data && (
          <View style={styles.textContainer}>
            <Text
              style={{
                ...styles.text,
                ...styles.user,
              }}
            >
              {data.type === "PRO" ? data.partnershipName : data.fullname}
            </Text>
            {data.lastMessageText && (
              <Text
                style={{
                  ...styles.text,
                  ...styles.message,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.lastMessageText}
              </Text>
            )}
            {data.lastMessageDate && (
              <Text
                style={{
                  ...styles.text,
                  ...styles.time,
                }}
              >
                {this._renderDate(data.lastMessageDate)}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width,
    padding: 5,
  },
  avatar: {
    borderRadius: 48,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    height: 48,
    width: 48,
  },
  text: {
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    width: width - 64,
  },
  user: {
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    fontSize: 14,
    fontWeight: "200",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    fontWeight: "100",
    color: "rgba(0,0,0,0.6)",
    marginTop: 2,
  },
  textContainer: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  unreadMessageIndicator: {
    height: 10,
    width: 10,
    backgroundColor: "lightskyblue",
    borderRadius: 5,
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
});

export default STGConversationItem;
