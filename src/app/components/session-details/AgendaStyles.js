import { StyleSheet } from "react-native";
import { STGColors } from "stg-ui";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 5,
  },
  itemStyle: {
    minHeight: 60,
    padding: 5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  dayContainer: {
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  dayStyle: {
    minHeight: 60,
    padding: 5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  knob: {
    height: 5,
    width: 60,
    borderRadius: 5,
    backgroundColor: STGColors.container,
  },
});
