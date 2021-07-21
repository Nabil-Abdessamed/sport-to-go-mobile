import { StyleSheet, Platform } from "react-native";
import { colors } from "@constants";
import { STGColors, STGFonts } from "stg-ui";

export default StyleSheet.create({
  headerStyle2: {
    backgroundColor: STGColors.container,
  },
  headerStyle: {
    backgroundColor: STGColors.container,
    ...Platform.select({
      android: {
        elevation: 6
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: {
          height: 2,
          width: 0.5
        },
        shadowOpacity: 0.35,
        shadowRadius: 6
      }
    })
  },
  headerLeftStyle: {
    flex: 1,
    width: 48,
    alignItems: "center"
  },
  headerTitleStyle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 18,
    fontWeight: "bold"
  }
});
