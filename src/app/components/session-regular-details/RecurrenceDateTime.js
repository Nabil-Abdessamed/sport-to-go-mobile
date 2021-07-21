import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { STGColors } from "stg-ui";

const RecurrenceDateTime = ({ item, t, isGridItem = false }) => {
  const renderTimeFormat = (time) => {
    return time.substr(0, 5);
  };

  const { width } = Dimensions.get("screen");
  const screenWidth = isGridItem ? width / 2 : width;
  const itemContainerWidth = screenWidth / 7 - 1;
  const itemWidth = itemContainerWidth - 1;

  const styles = StyleSheet.create({
    container: {
      width: screenWidth - 10,
      minHeight: 80,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
    },
    itemContainer: {
      width: itemContainerWidth,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      padding: 2,
    },
    item: {
      width: itemWidth,
      flex: 1,
      borderRadius: 6,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#f2f2f2",
      paddingVertical: 5,
    },
    itemSelected: {
      backgroundColor: STGColors.container,
    },
    itemDay: {
      fontFamily: "Roboto-Medium",
      fontSize: 14,
    },
    itemDaySelected: {
      color: "#fff",
    },
    itemTime: {
      fontFamily: "Roboto-Medium",
      fontSize: isGridItem ? 9 : 12,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.monday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.monday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.monday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.monday === 1 && (
            <View>
              <Text
                style={[
                  styles.itemTime,
                  item && item.monday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.mondayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.monday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.mondayTimeEnd)}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.tuesday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.tuesday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.tuesday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.tuesday === 1 && (
            <>
              <Text
                style={[
                  styles.itemTime,
                  item && item.tuesday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.tuesdayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.tuesday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.tuesdayTimeEnd)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.wednesday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.wednesday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.wednesday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.wednesday === 1 && (
            <>
              <Text
                style={[
                  styles.itemTime,
                  item && item.wednesday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.wednesdayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.wednesday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.wednesdayTimeEnd)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.thursday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.thursday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.thursday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.thursday === 1 && (
            <>
              <Text
                style={[
                  styles.itemTime,
                  item && item.thursday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.thursdayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.thursday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.thursdayTimeEnd)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.friday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.friday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.friday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.friday === 1 && (
            <>
              <Text
                style={[
                  styles.itemTime,
                  item && item.friday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.fridayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.friday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.fridayTimeEnd)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.saturday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.saturday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.saturday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.saturday === 1 && (
            <>
              <Text
                style={[
                  styles.itemTime,
                  item && item.saturday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.saturdayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.saturday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.saturdayTimeEnd)}
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item,
            item && item.sunday === 1 ? styles.itemSelected : null,
          ]}
        >
          <Text
            style={[
              styles.itemDay,
              item && item.sunday === 1 ? styles.itemDaySelected : null,
            ]}
          >
            {t(`common:days.sunday`).substr(0, isGridItem ? 1 : 3)}
          </Text>
          {item && item.sunday === 1 && (
            <>
              <Text
                style={[
                  styles.itemTime,
                  item && item.sunday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.sundayTimeStart)}
              </Text>
              <Text
                style={[
                  styles.itemTime,
                  item && item.sunday === 1 ? styles.itemDaySelected : null,
                ]}
              >
                {renderTimeFormat(item.sundayTimeEnd)}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default RecurrenceDateTime;
