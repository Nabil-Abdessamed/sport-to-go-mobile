import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts } from "stg-ui";

const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  logo: {
    height: 132,
    width: 132,
    marginTop: 80,
    alignSelf: "center"
  },
  btnGroup: {
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    width: 275,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  btnBg: {
    width: 275,
    height: 60
  },
  btnText: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "bold"
  },
  btnTextSize1: {
    fontSize: 14
  },
  btnTextSize2: {
    fontSize: 9
  },
  btnSocialGroup: {
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  socialText: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    textAlign: "center"
  },
  socialBtn: {
    width: 50,
    height: 50
  },
  imgBottom: {
    width: 275,
    maxHeight: 150,
    alignSelf: "center"
  }
});
