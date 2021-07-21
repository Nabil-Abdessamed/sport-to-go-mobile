import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";
const { width, height } = Dimensions.get("screen");

const imageHeight = width * 0.5625;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
  },
  btnCardShowMap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderColor: "rgba(255,255,255,0.2)",
    width: 48,
  },
  btnCardShowMapText: {
    fontSize: 18,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "bold",
    color: "white",
  },
  mapBtnClose: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 32,
    width: 32,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 32,
    position: "absolute",
    top: 12,
    right: 10,
  },
  modalHeader: {
    width,
    height: 56,
    backgroundColor: colors.background,
    ...Platform.select({
      android: { elevation: 6 },
      ios: {
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
          height: 6,
          width: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
    }),
  },
  sessionTitle: {
    fontSize: 18,
    fontFamily: STGFonts.RobotoBold,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sessionDescription: {
    fontSize: 12,
    fontFamily: STGFonts.RobotoRegular,
    paddingHorizontal: 10,
  },
  sessionShowMore: {
    fontSize: 11,
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "500",
  },
  sessionShowMoreBtn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sessionAdd: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: STGColors.container,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
    width: 60,
    height: 60,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  sessionCard: {
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
  dateText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
  },
  deviderVertical: {
    height: 20,
    width: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 1,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  dateInfo: { flexDirection: "row", alignItems: "center" },
  itemToolbarBtn: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  itemToolbar: {
    position: "absolute",
    right: 5,
    top: 5,
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  itemSubscribersCount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemSubscribersCountText: {
    marginRight: 2,
    color: colors.background,
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
  },
  itemSubscribed: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  price: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 22,
    marginVertical: 10,
    alignSelf: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
  },
  description: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    padding: 10,
  },
  image: {
    width,
    height: imageHeight,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  userFullname: {
    fontSize: 18,
    fontFamily: STGFonts.RobotoBold,
  },
  userAvatar: { width: 48, height: 48, borderRadius: 24 },
  itemHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  itemOptions: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  listFooter: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
