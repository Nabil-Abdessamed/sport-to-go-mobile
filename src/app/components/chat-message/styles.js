import { StyleSheet } from "react-native";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
  avatarContainer: {
    height: 34,
    width: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.35)",
    borderWidth: 0.35,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    backgroundColor: "#FFF",
    shadowOffset: {
      height: 3,
      width: 1,
    },
    shadowRadius: 0.35,
    elevation: 6,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  name: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 14,
    paddingLeft: 10,
  },
  buttonBack: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: "100%",
  },
});
