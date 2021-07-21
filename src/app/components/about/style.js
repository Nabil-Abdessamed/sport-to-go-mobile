import { StyleSheet } from "react-native";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  bigTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 24,
    alignSelf: "stretch",
    textAlign: "center",
    marginVertical: 10,
  },
  simpleTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
    alignSelf: "stretch",
    marginTop: 10,
  },
  text: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    alignSelf: "stretch",
    marginTop: 10,
    lineHeight: 22,
    textAlign: "justify",
  },
  secondText: {
    paddingLeft: 20,
  },
  bold: {
    fontFamily: STGFonts.RobotoBold,
  },
  slogan: {
    fontFamily: STGFonts.RobotoMediumItalic,
  },
  italicTitle: {
    fontFamily: STGFonts.RobotoBoldItalic,
  },
  link: {
    fontFamily: STGFonts.RobotoLightItalic,
    marginTop: 10,
  },
});
