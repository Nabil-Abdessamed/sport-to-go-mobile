import { StyleSheet } from "react-native";
import { colors } from "@constants";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  body: {
    flex: 1,
    backgroundColor: "ghostwhite"
  },
  content: {
    padding: 10
  },
  textInput: {
    backgroundColor: "white",
    height: 48,
    width: "100%",
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    marginVertical: 5
  },
  btnCreate: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.1)"
  },
  btnCreateText: {
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    fontWeight: "500",
    fontVariant: ["small-caps"]
  }
});
