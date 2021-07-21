import { StyleSheet } from "react-native";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  itemContainer: {
    width: "100%",
    minHeight: 48,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.4,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
  },
  title1: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
  },
  title2: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    marginTop: 5,
  },
  title3: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 10,
    marginTop: 5,
  },
});
