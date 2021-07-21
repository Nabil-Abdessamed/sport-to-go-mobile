import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: { backgroundColor: "#F2F2F2" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  spinner: { transform: [{ scale: 3 }] },
});

export default styles;
