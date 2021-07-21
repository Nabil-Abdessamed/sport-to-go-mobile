import { StyleSheet, Dimensions, Platform } from "react-native";
import { STGFonts, STGColors } from "stg-ui";

const { width, height } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

const Styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    minHeight: 40,
    maxHeight: 120,
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    letterSpacing: 1,
    paddingHorizontal: 5,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  textInputTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
    alignSelf: "stretch",
    textAlign: "center",
    marginVertical: 15,
  },
  errors: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(220,20,60,0.8)",
    alignSelf: "stretch",
    textAlign: "center",
  },
  helper: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    color: "rgba(220,20,60,0.8)",
  },
  helperText: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
  },
  bigTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 24,
    color: "rgba(220,20,60,0.8)",
    alignSelf: "stretch",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: STGColors.container,
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerBtn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSearchTextInput: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
  },
  headerTitle: {
    alignSelf: "center",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 18,
    width: width - 48 * 4,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageBtnClose: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  image: {
    width,
    height: imageHeight,
    alignSelf: "center",
  },
  imageSelectText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
  },
  // Users styles
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  userFullname: {
    paddingHorizontal: 5,
    color: "rgba(0,0,0,0.8)",
    fontSize: 18,
    fontFamily: STGFonts.RobotoBold,
  },
  userAvatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderColor: "rgba(0,0,0,0.4)",
    borderWidth: 0.4,
  },
  // Item Details Styles
  detailsContainer: {
    width: "100%",
    minHeight: 48,
    backgroundColor: "white",
    paddingVertical: 15,
    marginVertical: 10,
    ...Platform.select({
      android: {
        elevation: 2,
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
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  detailsItemTitle: {
    fontSize: 16,
    fontFamily: STGFonts.RobotoBold,
    padding: 10,
  },
  detailsItemDescription: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    padding: 10,
  },
  detailsItemText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    paddingHorizontal: 10,
  },
  // Common UI Styles
  btnAdd: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: STGColors.container,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
    width: 60,
    height: 60,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  btnRound: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: STGColors.container,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
    width: 60,
    height: 60,
    marginTop: 10,
  },
  bottomActions: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  followBtn: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    flex: 1,
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  listHeaderMessageText: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  postCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "rgba(0,0,0,0.2)",
    backgroundColor: "white",
    borderTopWidth: 0.2,
  },
  postCommentInput: {
    minHeight: 48,
    maxHeight: 144,
    width: "100%",
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 65,
    paddingBottom: 10,
  },
  postCommentBtnContainer: {
    width: 60,
    height: 54,
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  postCommentBtnText: {
    color: "dodgerblue",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14,
  },
  postVideoPoster: {
    backgroundColor: "#000",
    width,
    height: imageHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  androidPostVideoPosterImage: {
    minWidth: width,
    minHeight: imageHeight,
  },
  androidPostVideoPoster: {
    minWidth: width,
    minHeight: imageHeight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  videoIndicator: {
    position: "absolute",
  },
  imageSelectText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
  },
});

export default Styles;
