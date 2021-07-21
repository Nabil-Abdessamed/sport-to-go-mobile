import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";
const { width } = Dimensions.get("screen");
const nameWidth = width - width * 0.25 - 75;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  profileInfoContainer: {
    paddingLeft: 10,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: STGColors.container
  },
  profileName: {
    fontFamily: STGFonts.RobotoMedium,
    color: "white",
    fontSize: 16,
    width: nameWidth
  },
  profileShow: {
    fontFamily: STGFonts.RobotoRegular,
    color: "white",
    fontSize: 12
  },
  profileInfo: {
    marginLeft: 10
  },
  itemsContainer: {
    flex: 1,
    backgroundColor: "ghostwhite"
  },
  item: {
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 10,
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14
  },
  itemSecondText: {
    fontFamily: STGFonts.RobotoThin
  },
  sectionTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 24,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  languageModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    backgroundColor: STGColors.container,
    alignItems: "center",
    paddingHorizontal: 10
  },
  languageModalHeaderBtn: {
    height: 48,
    paddingHorizontal: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  languageModalHeaderTitle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14
  },
  languageModalHeaderBtnText: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14
  },
  languageModalHeaderBtnTextCnahge: {
    fontFamily: STGFonts.RobotoThin,
    fontSize: 14,
    color: "rgba(0,0,0,0.4)"
  },
});
