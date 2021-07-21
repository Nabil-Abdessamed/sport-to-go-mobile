import { StyleSheet, Dimensions, Platform } from "react-native";
import { STGColors, STGFonts } from "stg-ui";
const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  header: {
    backgroundColor: STGColors.container,
    height: 54,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowOpacity: 0.35,
        shadowColor: "rgba(0,0,0,0.6)",
        shadowOffset: {
          width: 3,
          height: 1
        },
        shadowRadius: 2
      }
    })
  },
  headerBtnBack: {
    height: 54,
    width: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  headerBtnDone: {
    flexDirection: "row",
    height: 54,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  headerBtnDoneText: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14
  }
});
