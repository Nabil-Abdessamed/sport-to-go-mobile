import { StyleSheet, Dimensions } from "react-native";
import { STGFonts, STGColors } from "stg-ui";

const { width } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

export const SessionEditStyle = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48
  },
  dateEditBtnText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
    alignSelf: "stretch",
    paddingHorizontal: 10
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
  mapHeader: {
    height: 48,
    backgroundColor: STGColors.container
  },
  mapFooter: {
    height: 48,
    backgroundColor: STGColors.container
  },
  mapBtnClose: {
    height: 48,
    width: 48,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.5,
    borderRadius: 30,
    backgroundColor: STGColors.container,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  imageBtnClose: {
    alignSelf: "flex-end",
    marginBottom: 10
  },
  image: {
    width,
    height: imageHeight,
    alignSelf: "center"
  },
  imageSelectText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16
  }
});

export default SessionEditStyle;
