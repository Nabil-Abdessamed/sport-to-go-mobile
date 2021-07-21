import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";

const { width, height } = Dimensions.get("screen");
const itemWidth = width / 2 - 20;
const itemShowImageWidth = (width * 9) / 16;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    backgroundColor: "ghostwhite",
  },
  card: {
    backgroundColor: "white",
    padding: 5,
    marginVertical: 5,
    ...Platform.select({
      android: {
        elevation: 1,
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
  userInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoItemText: {
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "700",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 32,
  },
  itemText: {
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "500",
  },
  btnEdit: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
  },
  avatarContainer: {
    alignContent: "center",
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
  },
  nameContainer: {
    padding: 5,
    justifyContent: "center",
  },
  fullname: {
    fontSize: 18,
    fontFamily: STGFonts.RobotoMedium,
  },
  description: {
    fontFamily: STGFonts.RobotoThinItalic,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 14,
  },
  sDisplayName: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: STGFonts.RobotoRegular,
  },
  btnAdd: {
    height: 60,
    width: 60,
    backgroundColor: STGColors.container,
    borderRadius: 30,
    position: "absolute",
    bottom: 10,
    right: 10,
    borderColor: "rgba(0,0,0,0.4)",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  galleryItem: {
    width: itemWidth,
    height: itemWidth,
    margin: 5,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: "#000",
  },
  videoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  videoIndicator: {
    position: "absolute",
  },
  itemShowMedia: {
    width,
    height: width,
  },
  itemShowDescription: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  itemShowUser: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: STGColors.container,
  },
  btnBack: {
    height: 54,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  itemShowUserAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  itemShowUserFullname: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 16,
    fontFamily: STGFonts.RobotoBold,
    paddingHorizontal: 10,
  },
});
