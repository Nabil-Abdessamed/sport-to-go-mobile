import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { STGAvatarMessage } from "stg-ui";
import STGFonts from "./STGFonts";

const { width } = Dimensions.get("window");

class STGMessageItem extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    avatar: PropTypes.any,
    data: PropTypes.any,
    onSelect: PropTypes.func,
    t: PropTypes.func,
  };
  static defaultProps = {
    containerStyle: {},
    avatar: require("./images/user.png"),
    data: {},
    onSelect: () => {},
    t: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      layoutWidth: 48,
    };
  }

  renderPartnershipType = (type) => {
    const { t } = this.props;
    switch (type) {
      case "COACH":
        return t("common:coach");
      case "FITNESS_CLUB":
        return t("common:fitnessClub");
      case "CROSSFIT_CLUB":
        return t("common:crossfitClub");
      case "ASSOCIATION":
        return t("common:association");
      default:
        return type;
    }
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
        <View style={{ position: "relative" }}>
          <STGAvatarMessage avatar={data.avatar} />
          {data.connected === 1 && <View style={styles.connected} />}
        </View>
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
            {data.type === "PRO" && (
              <Text style={styles.text}>
                {this.renderPartnershipType(data.partnershipType)}
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
    alignItems: "center",
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
    fontWeight: "900",
    marginTop: 2,
  },
  textContainer: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  connected: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "limegreen",
    position: "absolute",
    bottom: 0,
    right: 7.5,
  },
});

export default STGMessageItem;
