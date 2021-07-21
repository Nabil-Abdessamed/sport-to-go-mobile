import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import { STGCard } from "stg-ui";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";

const Item = ({ item, avatar }) => (
  <STGCard
    containerStyle={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }}
  >
    <FastImage
      source={{ uri: avatar }}
      style={{
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: "grey",
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.2)"
      }}
      resizeMode="cover"
    />
    <View>
      <Text>Akram Jabeur</Text>
      <Text>Mon message</Text>
    </View>
  </STGCard>
);

export class STGMessageFlash extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    showMessage: PropTypes.bool.isRequired,
    handleShowMessage: PropTypes.func.isRequired,
    avatar: PropTypes.string,
    duration: PropTypes.number
  };
  static defaultProps = {
    message: [],
    showMessage: false,
    handleShowMessage: () => {},
    avatar: `${BASE_URL}/default/user.png`,
    duration: 0
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.duration) {
    }
  }
  render() {
    return (
      <Modal
        visible={this.props.showMessage}
        animated
        animationType="fade"
        transparent
        onRequestClose={this.props.handleShowMessage}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPressOut={this.props.handleShowMessage}
        >
          <TouchableWithoutFeedback>
            <FlatList
              inverted
              invertStickyHeaders
              data={this.props.messages}
              keyExtractor={(item, index) => `message-recieved-${index}`}
              renderItem={({ item, index }) => (
                <Item item={item} avatar={this.props.avatar} />
              )}
            />
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default STGMessageFlash;
