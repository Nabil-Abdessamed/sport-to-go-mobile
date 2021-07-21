import { StyleSheet } from "react-native";
import { colors } from "@constants";
import { STGColors, STGFonts } from "stg-ui";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: STGFonts.RobotoRegular,
    marginLeft: 10
  },
  description: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular,
    paddingLeft: 8,
    paddingVertical: 5,
    marginVertical: 20
  },
  editMapText: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoBold,
    paddingLeft: 10
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginVertical: 5,
    // borderBottomColor: "rgba(0,0,0,0.2)",
    // borderBottomWidth: 0.5
  },
  eventAddress: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular,
    marginLeft: 10
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1
  },
  eventDate: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular,
    marginLeft: 10
  },
  btnAction: {
    backgroundColor: "black",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 0.5,
    borderRadius: 60,
    position: "absolute",
    right: 10,
    bottom: 10
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,0.2)"
  },
  participateBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 0.2,
    backgroundColor: STGColors.container
  },
  participateBtnText: {
    color: "ghostwhite",
    fontFamily: STGFonts.RobotoRegular
  },
  participatedBtn: {
    backgroundColor: "ghostwhite",
    borderColor: "rgba(0,0,0,0.4)"
  },
  participatedBtnText: {
    color: "rgba(0,0,0,0.8)"
  },
  btnEdit: {
    height: 60,
    width: 60,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.2,
    borderRadius: 30,
    backgroundColor: STGColors.container,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10
  },
  mapHeader: {
    height: 48,
    backgroundColor: STGColors.container
  },
  mapFooter: {
    height: 48,
    backgroundColor: STGColors.container
  },
  btnClose: {
    height: 48,
    width: 48,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.2,
    borderRadius: 30,
    backgroundColor: STGColors.container,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  dateModalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  dateModalOut: {
    flex: 1,
    justifyContent: "flex-end"
  },
  dateModalBody: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 10
  },
  dateModalSave: {
    alignSelf: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  dateModalSaveText: {
    color: "#000",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16
  },
  dateModalCancel: {
    marginTop: 10,
    height: 48,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  dateModalCancelText: {
    color: "#000",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16
  },
  eventImage: { height: 200, width: "100%", alignSelf: "center" },
  eventImageSelectText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16
  },
  participantContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10
  },
  participantCloseBtn: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  participantHeader: {
    flexDirection: "row",
    height: 60,
    borderBottomColor: "rgba(0,0,0,0.4)",
    borderBottomWidth: 0.4,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  participantTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 20,
    textAlignVertical: "center",
    paddingHorizontal: 10,
    marginVertical: 10
  }
});
