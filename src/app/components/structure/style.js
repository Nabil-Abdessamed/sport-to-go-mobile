import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@constants";
import { STGFonts } from "stg-ui";
const { width } = Dimensions.get("screen");
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
    marginVertical: 5,
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "500"
  },
  itemCard: {
    backgroundColor: "white",
    height: 48,
    width: "100%",
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    marginVertical: 5
  },
  itemText: {
    color: "black",
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "500"
  },
  itemSelectCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  },
  avatarContainer: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center"
  },
  selectOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  selectBody: {
    width: width - 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: {
          height: 2,
          width: 0.5
        }
      },
      android: {
        elevation: 6
      }
    })
  },
  selectContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputHasError: {
    borderColor: "rgba(255,69,0, 0.5)"
  }
});
