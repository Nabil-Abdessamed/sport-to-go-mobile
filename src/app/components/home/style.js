import { StyleSheet } from "react-native";
import { colors } from "@constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    justifyContent: "center",
    alignItems: "center"
  },
  btnIcon: {
    height: 60,
    width: 60
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "Impact",
    marginTop: 5
  }
});
