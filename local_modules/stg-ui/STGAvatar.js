import React, { Component } from "react";
import { View, Platform, Image } from "react-native";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class STGAvatar extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    size: PropTypes.number,
  };
  static defaultProps = {
    uri: undefined,
    size: 48,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      imageContainer: {
        width: this.props.size + 2,
        height: this.props.size + 2,
        borderRadius: this.props.size / 2,
        borderColor: "rgba(0,0,0,0.5)",
        borderWidth: 0.5,
        backgroundColor: "#fff",
        ...Platform.select({
          android: {
            elevation: 6,
          },
          ios: {
            shadowColor: "rgba(0,0,0,0.8)",
            shadowOffset: {
              height: 3,
              width: 1,
            },
            shadowOpacity: 0.35,
            shadowRadius: 4,
          },
        }),
        justifyContent: "center",
        alignItems: "center",
      },
      image: {
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.size / 2,
      },
    };
    return (
      <View style={styles.imageContainer}>
        {this.props.uri ? (
          <Image
            source={{
              uri: this.props.uri,
            }}
            resizeMode={"cover"}
            style={styles.image}
            borderRadius={this.props.size / 2}
          />
        ) : (
          <View
            style={{
              ...styles.image,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons size={40} color="black" name="person" />
          </View>
        )}
      </View>
    );
  }
}

export default STGAvatar;
