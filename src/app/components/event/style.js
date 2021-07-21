import { StyleSheet, Platform, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts, STGColors } from "stg-ui";
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "ghostwhite",
  },
  btnAdd: {
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
  text: {
    fontFamily: STGFonts.RobotoRegular,
    color: "black",
  },
  userName: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoMedium,
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,0.2)",
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoBold,
  },
  eventDescription: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
    marginVertical: 20,
  },
  eventDate: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 10,
  },
  moreDetailsBtn: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginRight: 5,
  },
  moreDetailsText: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 10,
  },
  searchBarContainer: {
    width: "100%",
    height: 48,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
  },
  searchBar: {
    paddingLeft: 40,
  },
  searchBarIcon: {
    position: "absolute",
    left: 20,
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
  mapContainer: {
    flex: 1,
    borderRadius: 10,
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
  itemCard: {
    padding: 10,
    width: width,
    minHeight: 48,
    backgroundColor: "white",
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
  itemImg: {
    height: 200,
    width: "100%",
    alignSelf: "center",
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
  itemToolbarBtn: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  itemSubscribersCount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemSubscribersCountText: {
    marginRight: 2,
    color: colors.background,
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14,
    fontWeight: "500",
  },
  participateBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 0.2,
    backgroundColor: STGColors.container,
  },
  participateBtnText: {
    color: "ghostwhite",
    fontFamily: STGFonts.RobotoRegular,
  },
  participatedBtn: {
    backgroundColor: "ghostwhite",
    borderColor: "rgba(0,0,0,0.4)",
  },
  participatedBtnText: {
    color: "rgba(0,0,0,0.8)",
  },
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
});
