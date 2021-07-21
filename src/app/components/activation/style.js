import { StyleSheet } from "react-native";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  sectionTitle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "stretch",
    textAlign: "center",
    marginVertical: 15
  },
  textInputTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 20
  },
  textInput: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    height: 40,
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  },
  helper: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    color: "rgba(220,20,60,0.8)"
  },
  errors: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(220,20,60,0.8)",
    alignSelf: "stretch",
    textAlign: "center"
  }
});
