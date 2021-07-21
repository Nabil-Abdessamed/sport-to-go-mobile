import { StyleSheet } from "react-native";
import { colors } from "@constants";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  body: {
    flex: 1,
    padding: 5,
    // backgroundColor: colors.bgGray,
    backgroundColor: "ghostwhite",
  },
  btn: {
    alignSelf: "center",
    width: "100%",
    flexDirection: "row"
  },
  img: {
    width: "100%",
    height: 300
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background
  },
  modalBody: {
    flex: 1,
    backgroundColor: colors.bgGray,
    padding: 5
  },
  modalHeader: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    backgroundColor: colors.background
  },
  modalBtnClose: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0
  },
  modalHeaderTilteText: {
    color: "black",
    fontSize: 18,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "bold"
  },
  scrollViewContainer: {
    backgroundColor: "ghostwhite"
  }
});
