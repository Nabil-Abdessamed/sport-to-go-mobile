import { StyleSheet, Platform } from "react-native";
import { STGFonts, STGColors } from "stg-ui";

export default StyleSheet.create({
  avatarContainer: {
    height: 122,
    width: 122,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 61,
    borderColor: "white",
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 6
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.8)",
        shadowOffset: {
          height: 6,
          width: 2
        },
        shadowOpacity: 0.35,
        shadowRadius: 6
      }
    })
  },
  userFullname: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 18
  },
  userSCorporateName: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 20,
    marginTop: 10
  },
  itemText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 16
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.3,
    marginTop: 10,
    paddingBottom: 10
  },
  firstItem: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.3,
    paddingBottom: 20,
    marginBottom: 10
  },
  chatBtn: {
    backgroundColor: STGColors.container,
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    ...Platform.select({
      android: {
        elevation: 6
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.8)",
        shadowOffset: {
          height: 3,
          width: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 6
      }
    })
  },
  link: {
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  follow: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 0.2,
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: STGColors.container
  },
  followed: {
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor: "ghostwhite"
  },
  followText: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: STGFonts.RobotoRegular
  },
  followedText: {
    color: "rgba(0,0,0,0.8)"
  }
});
