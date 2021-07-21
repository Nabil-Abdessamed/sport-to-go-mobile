import { StyleSheet, Dimensions } from "react-native";
import STGColors from "./STGColors";
import STGFonts from "./STGFonts";
const { height, width } = Dimensions.get("screen");

export default StyleSheet.create({
  header: {
    backgroundColor: STGColors.container,
  },
  headerContainer: {
    flexDirection: "row",
    width,
    height: 48,
    backgroundColor: STGColors.container,
    alignItems: "center",
    alignSelf: "stretch",
  },
  headerBtn: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { width: width - 48, color: "rgba(0,0,0,0.8)" },
  headerActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  dateContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  },
  dateEditBtnText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
    alignSelf: "stretch",
    paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  dateModalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  dateModalOut: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dateModalBody: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 10,
  },
  dateModalSave: {
    alignSelf: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  dateModalSaveText: {
    color: "#000",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
  },
  dateModalCancel: {
    marginTop: 10,
    height: 48,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  dateModalCancelText: {
    color: "#000",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
  },
  textInputTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 20,
  },
  helper: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    color: "rgba(220,20,60,0.8)",
  },
});
