import { Dimensions, StyleSheet } from "react-native";
import { STGColors } from "stg-ui";

const { width, height } = Dimensions.get("screen");

const borderColor = "rgba(0,0,0,0.3)";

const Styles = StyleSheet.create({
  card: {
    borderTopColor: borderColor,
    borderTopWidth: 0.5,
    borderBottomColor: borderColor,
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: borderColor,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 4 },
    elevation: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  nameContainer: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  userType: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
  date: {
    fontFamily: "Roboto-Thin",
    fontSize: 12,
    textTransform: "capitalize",
  },
  settingButtonContainer: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  settingButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 10,
  },
  cardContentText: {
    paddingHorizontal: 5,
  },
  cardContentText2: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    textTransform: "capitalize",
  },
  dateText2: {
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    textTransform: "capitalize",
  },
  link: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
  },
  addressTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 14,
    marginTop: 10,
  },
  addressText: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    marginTop: 5,
  },
  description: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    alignSelf: "stretch",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  fileContainer: {
    paddingVertical: 10,
  },
  listContent: {
    backgroundColor: "#F2F2F2",
    paddingBottom: 80,
  },
  listHeader: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 10,
    borderBottomColor: "#F2F2F2",
  },
  dayRecurrence: {
    height: 32,
    width: 32,
    borderRadius: 3,
    backgroundColor: "#C3C3C3",
    justifyContent: "center",
    alignItems: "center",
  },
  dayRecurrenceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    height: 32,
  },
  dayRecurrenceText: {
    fontFamily: "Roboto-Bold",
    color: "#000",
    fontSize: 16,
  },
  sessionDateContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionDateIcon: {
    width: 60,
  },
  sessionDate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sessionDateText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textTransform: "capitalize",
    alignSelf: "stretch",
    textAlign: "center",
  },
  card2: {
    backgroundColor: "#F2F2F2",
    padding: 10,
  },
  card2Content: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.3,
  },
  card2ContentText1: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },
  selectedDayDateContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayDateText1: {
    fontSize: 32,
    fontFamily: "Roboto-Medium",
  },
  selectedDayDateText2: {
    fontSize: 18,
    fontFamily: "Roboto-Regular",
    textTransform: "capitalize",
  },
  selectedDayContent: {
    flex: 1,
    alignItems: "center",
  },
  selectedDayContentTime: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayContentTimeText: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    textTransform: "capitalize",
  },
  selectedDayContentTimeText2: {
    fontSize: 20,
    fontFamily: "Roboto-Medium",
    textTransform: "capitalize",
  },
  purchaseButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: STGColors.container,
    borderRadius: 5,
    marginTop: 10,
  },
  purchaseButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
  subscribed: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  listFooter: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    marginVertical: 10,
  },
  resultContainer: { flex: 1, paddingVertical: 10 },
  emptyResultContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyResultText: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    textAlign: "center",
  },
  searchDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  searchDateText: {
    color: "rgba(0,0,0,0.8)",
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    letterSpacing: 1,
  },
});

export default Styles;
