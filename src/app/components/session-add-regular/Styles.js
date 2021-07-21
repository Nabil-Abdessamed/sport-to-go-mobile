import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    backgroundColor: "#FFF",
    fontFamily: "Roboto-Medium",
  },
  headerRight: {
    flexDirection: "row",
    paddingRight: 5,
  },
  headerRightButton: {
    padding: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRightButtonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    marginVertical: 20,
  },
  imageButtonClose: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  imageSize: {
    width,
    height: imageHeight,
  },
  card: {
    padding: 10,
  },
});

export default styles;
