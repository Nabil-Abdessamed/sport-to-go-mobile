import { StyleSheet, Dimensions } from "react-native";
import { STGFonts, STGColors } from "stg-ui";
const { width } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

const styles = StyleSheet.create({
  container: {
    width,
    borderTopColor: "rgba(0,0,0,0.2)",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  headerActions: {
    height: 48,
    width: 48,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  userTitleOne: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
  },
  userTitleTwo: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
  },
  body: {
    flex: 1,
  },
  text: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    padding: 5,
    lineHeight: 24,
  },
  comments: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
    paddingHorizontal: 10,
    alignSelf: "stretch",
  },
  showMore: {
    paddingHorizontal: 10,
    alignSelf: "stretch",
    textAlign: "right",
  },
  emptyImage: {
    height: imageHeight,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  btnDeleteImage: {
    position: "absolute",
    top: 5,
    right: 5,
    height: 32,
    width: 32,
    backgroundColor: STGColors.container,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.5,
  },
  footer: {
    height: 32,
    width: "100%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 32,
  },
  commentsCount: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 14,
    marginRight: 5,
  },
  type: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 12,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
});

export default styles;
