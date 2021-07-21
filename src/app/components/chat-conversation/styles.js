import { StyleSheet } from "react-native";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
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
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  title1: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16,
  },
  title2: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
  },
  title3: {
    fontFamily: STGFonts.RobotoThin,
    fontSize: 14,
  },
});
