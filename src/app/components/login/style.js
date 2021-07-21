import { StyleSheet, Dimensions } from "react-native";
import { STGFonts } from "stg-ui";
const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  logo: {
    height: 132,
    width: 132,
    alignSelf: "center",
    position: "absolute",
    top: 60
  },
  textInputcontainer: {
    width,
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
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
  textInputTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 20
  },
  btnContainer: {
    width: width - 30,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  btnBg: {
    width: width - 30,
    height: 60
  },
  btnText: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "bold",
    fontSize: 18
  },
  forgotPasswordBtn: {
    alignItems: "stretch",
    marginVertical: 20
  },
  forgotPasswordText: {
    fontFamily: STGFonts.RobotoLight,
    fontSize: 14,
    textAlign: "center"
  },
  header: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center"
  },
  headerIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionTitle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "stretch",
    textAlign: "center",
    marginVertical: 15
  },
  errors: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(220,20,60,0.8)",
    alignSelf: "stretch",
    textAlign: "center"
  },
  helper: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    color: "rgba(220,20,60,0.8)"
  }
});
