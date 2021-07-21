import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@constants";
import { STGFonts } from "stg-ui";
const { width } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    backgroundColor: "ghostwhite",
  },
  content: {
    padding: 10,
  },
  textInput: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    height: 40,
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  textInputTitle: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
  },
  avatarContainer: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "stretch",
    textAlign: "center",
    marginVertical: 15,
  },
  cameraIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  switchText: {
    paddingRight: 10,
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 12,
  },
  switch: {
    transform: [{ scale: 0.6 }],
  },
  headerRightButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5
  },
  headerRightButtonTitle: {
    paddingRight: 10,
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16,
  },
});
