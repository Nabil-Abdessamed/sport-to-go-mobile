import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";
const { width } = Dimensions.get("screen");
const subReccCard = width / 2 - 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  positionText: {
    fontSize: 12,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "700",
  },
  positionValue: {
    fontSize: 10,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "500",
  },
  sportItem: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  sportItemText: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
  },
  sportItemDevider: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 1,
  },
  sportItemBtnOk: {
    height: 48,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    paddingHorizontal: 10,
    width: "100%",
    height: 48,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "500",
  },
  textInput: {
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 48,
    width: "100%",
  },
  reccCard: {
    width,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subReccCard: {
    width: subReccCard,
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: STGColors.container,
  },
  subReccCardLeft: {
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  },
  subReccCardRight: {
    borderTopStartRadius: 5,
    borderBottomStartRadius: 5,
  },
  subReccCardSelected: {
    backgroundColor: "#3B3E3D",
  },
  subReccText: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 18,
    color: "#FFF",
    marginLeft: 5,
  },
  days: {
    height: 64,
    width,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  day: {
    height: 42,
    width: 42,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C3C3C3",
  },
  daySelected: {
    backgroundColor: STGColors.container,
  },
  dayText: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 20,
    color: "#4E4E4E",
  },
  dayTextSelected: {
    color: "#FFF",
  },
  viewPadding: {
    paddingHorizontal: 8
  }
});
