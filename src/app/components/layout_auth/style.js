import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@constants";
const { height, width } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  womanImage: {
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },
  mapImage: {
    height,
    width,
    position: "absolute",
    top: -80,
    right: -width / 3,
  },
  title: {
    height: 200,
    position: "absolute",
    top: 40,
    left: 10,
  },
});
