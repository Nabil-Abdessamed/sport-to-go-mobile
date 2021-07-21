import { StyleSheet } from "react-native";
import { STGFonts } from "stg-ui";

export default StyleSheet.create({
  actionInfoContainer: {
    flexDirection: "row",
    borderTopColor: "rgba(0,0,0,0.1)",
    borderBottomColor: "rgba(0,0,0,0.1)",
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    paddingVertical: 10,
    marginVertical: 10
  },
  commentTextContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "ghostwhite",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  commentUser: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14
  },
  commentText: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 14,
    marginTop: 5
  },
  commentTitle: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 15
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 5
  },
  userFullname: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 18,
    marginLeft: 5
  },
  userPartnershipType: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: STGFonts.RobotoRoboto,
    fontSize: 12,
    marginLeft: 5
  },
  postCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "rgba(0,0,0,0.2)",
    backgroundColor: "white",
    borderTopWidth: 0.2
  },
  postCommentInput: {
    minHeight: 48,
    maxHeight: 144,
    width: "100%",
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 65,
    paddingBottom: 10
  },
  postCommentBtnContainer: {
    width: 60,
    height: 54,
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  postCommentBtnText: {
    color: "dodgerblue",
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14
  }
});
