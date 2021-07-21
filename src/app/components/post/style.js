import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";

const { width, height } = Dimensions.get("window");

const imageHeight = width * 0.5625;

const itemCheckerboardContainerWidth = width / 2;
const imageCheckBoardWidth = itemCheckerboardContainerWidth - 20;
const imageCheckBoardBodyWidth = itemCheckerboardContainerWidth - 10;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    backgroundColor: "ghostwhite",
  },
  btnAdd: {
    backgroundColor: STGColors.container,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.5,
    borderRadius: 60,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  card: {
    backgroundColor: "white",
    width,
    minHeight: 60,
    marginVertical: 10,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
          height: 0.5,
          width: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  postItemUser: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  postItemArticle: {
    letterSpacing: 0.5,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "400",
    padding: 10,
  },
  postItemImage: {
    marginTop: 10,
    width: "100%",
    height: 300,
  },
  postItemAction: {
    flexDirection: "row",
    height: 42,
    justifyContent: "space-between",
  },
  postItemActionInfo: {
    flexDirection: "row",
    height: 20,
    marginTop: 10,
  },
  postItemActionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  postItemActionBtnText: {
    color: STGColors.container,
    fontSize: 16,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "500",
    marginLeft: 5,
  },
  postItemActionInfoText: {
    color: "#525252",
    fontSize: 12,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "500",
    marginRight: 2,
  },
  postItemSettingBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  postItemDevider: {
    height: 1,
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "center",
  },
  commentHeader: {
    height: 48,
    borderBottomColor: "rgba(0,0,0,0.4)",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentHeaderBtn: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  commentBtn: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  commentText: {
    flex: 1,
    padding: 10,
    backgroundColor: "ghostwhite",
  },
  userActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    flex: 1,
  },
  userCard: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 5,
  },
  userAvatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  userFullname: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14,
    marginLeft: 5,
  },
  postItemCheckImage: {
    width: imageCheckBoardWidth,
    height: 100,
    alignSelf: "center",
    alignItems: "stretch",
    borderRadius: 2,
  },
  postItemCheckVideo: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  itemCheckerboardContainer: {
    width: itemCheckerboardContainerWidth,
    padding: 5,
  },
  itemCheckBoardBody: {
    width: imageCheckBoardBodyWidth,
    alignSelf: "auto",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    paddingVertical: 10,
  },
  postCheckArticleText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    width,
    height: 54,
    flexDirection: "row",
    backgroundColor: STGColors.container,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOffset: {
          height: 6,
          width: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        borderBottomColor: "rgba(0,0,0,0.2)",
        borderBottomWidth: 0.5,
      },
    }),
  },
  btnGroup: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: {
    position: "absolute",
    left: 5,
    color: "white",
    fontSize: 16,
    fontFamily: STGFonts.RobotoRegular,
    alignSelf: "stretch",
  },
  headerBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 48,
  },
  postCheckActionGroup: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20
  },
  postCheckAction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    paddingHorizontal: 5,
  },
  postCheckActionText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 9,
    marginRight: 2,
  },
  toast: {
    borderRadius: 20,
    height: 60,
    width: width - 20,
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    bottom: 80,
    right: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  toastText: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
  },
  itemHeader: {
    flex: 1,
    flexDirection: "row",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  itemOptions: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
