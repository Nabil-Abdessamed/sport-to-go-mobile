import { StyleSheet, Platform } from "react-native";
import { colors } from "@constants";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
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
    fontFamily: STGFonts.RobotoBold
  },
  description: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular,
    paddingVertical: 5
  },
  addressItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingVertical: 5
  },
  addressItemTitle: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoRegular
  },
  addressItemValue: {
    fontSize: 14,
    fontFamily: STGFonts.RobotoBold
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 1
  },
  eventDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5
  },
  eventDate: {
    fontSize: 12,
    fontFamily: STGFonts.RobotoBold,
    marginLeft: 5
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
  card: {
    width: "100%",
    minHeight: 48,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
          height: 0.5,
          width: 0.5
        },
        shadowOpacity: 0.2,
        shadowRadius: 2
      }
    })
  },
  userAvatar: { height: 40, width: 40, borderRadius: 20 },
  priceText: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 16,
    marginLeft: 10
  },
  subscribed: {
    position: "absolute",
    top: 60,
    right: 0
  }
});
