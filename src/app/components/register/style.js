import { StyleSheet, Dimensions, Platform } from "react-native";
import { STGFonts, STGColors } from "stg-ui";
const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  logo: {
    height: 132,
    width: 132,
    alignSelf: "center",
    position: "absolute",
    top: 60,
  },
  body: {
    width,
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: 48,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "white",
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 9,
    color: "white",
    alignSelf: "flex-end",
  },
  btnContainer: {
    width: width - 30,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBg: {
    width: width - 30,
    height: 60,
  },
  btnText: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
  },
  headerIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 10,
  },
  textInputTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "stretch",
    textAlign: "center",
    marginVertical: 15,
  },
  helper: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
  },
  partnership: {},
  partnershipItem: {
    flexDirection: "row",
    minHeight: 40,
    padding: 5,
    alignItems: "center",
  },
  partnershipText: {
    fontSize: 16,
    fontFamily: STGFonts.RobotoRegular,
    marginLeft: 10,
    lineHeight: 24,
    width: width - 62,
  },
  partnershipTextSelected: {
    fontFamily: STGFonts.RobotoMedium,
  },
  message: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular,
    textAlign: "center",
    marginVertical: 10,
  },
  totalToPay: {
    fontSize: 20,
    fontFamily: STGFonts.RobotoBold,
    textAlign: "center",
    marginVertical: 10,
  },
  btn: {
    backgroundColor: STGColors.container,
    height: 54,
    width: 54,
    opacity: 0.8,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadBtn: {
    position: "absolute",
    bottom: 20,
    right: 80,
  },
  nextBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  r6Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  r6Text: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 18,
    fontFamily: STGFonts.RobotoMedium,
    alignSelf: "stretch",
    textAlign: "center",
    marginTop: 20,
  },
  r6Text1: {
    fontSize: 20,
    fontFamily: STGFonts.RobotoBold,
    alignSelf: "stretch",
    textAlign: "center",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  r6Text2: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 14,
    fontFamily: STGFonts.RobotoMedium,
    alignSelf: "stretch",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  r6Text3: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 12,
    fontFamily: STGFonts.RobotoMedium,
    alignSelf: "stretch",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  or: {
    alignSelf: "center",
    fontFamily: STGFonts.RobotoBoldItalic,
    fontSize: 18,
    marginVertical: 5,
  },
});
