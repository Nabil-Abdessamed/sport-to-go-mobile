import { StyleSheet, Platform } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";

export default StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 5,
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
          height: 0.5,
          width: 0.5
        },
        shadowOpacity: 0.2,
        shadowRadius: 2
      }
    })
  },
  structureName: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16
  },
  userName: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14
  },
  userAvatar: { width: 40, height: 40, borderRadius: 20 },
  header: {
    flexDirection: "row",
    backgroundColor: STGColors.container,
    height: 48,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  headerBtn: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  headerSearchTextInput: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16
  },
  follow: {
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    position: "absolute",
    right: 0,
    backgroundColor: STGColors.container
  },
  followed: {
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "ghostwhite"
  },
  followText: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: STGFonts.RobotoRegular
  },
  followedText: {
    color: "rgba(0,0,0,0.8)",
  }
});
