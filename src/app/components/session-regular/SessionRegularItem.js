import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import FastImage from "react-native-fast-image";
import Styles from "./SessionRegularStyles";
import Moment from "moment";
import { BASE_URL } from "../../config";
// import SessionRegularItemRecurrences from "./SessionRegularItemRecurrences";
import { STGImage } from "stg-ui";
import RecurrenceDateTime from "../session-regular-details/RecurrenceDateTime";

const propsType = {
  t: () => {},
  onPressItem: () => {},
  onPressItemUser: () => {},
  item: null,
};

export default function SessionRegularItem(props = propsType) {
  const { item, t } = props;
  const [descNumberOfLines, setDescNumberOfLines] = useState(3);
  // const [recurrences, setRecurrences] = useState(null);

  const handleDescClick = () => {
    setDescNumberOfLines(descNumberOfLines === 0 ? 3 : 0);
  };

  const renderCreatedAtFormat = (data) => {
    return Moment(data).format("ddd, DD MMM YYYY");
  };

  // useEffect(() => {
  //   setRecurrences({
  //     monday: item.monday,
  //     tuesday: item.tuesday,
  //     wednesday: item.wednesday,
  //     thursday: item.thursday,
  //     friday: item.friday,
  //     saturday: item.saturday,
  //     sunday: item.sunday,
  //   });
  // }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={Styles.card}
      onPress={props.onPressItem}
    >
      {/* Card Header */}
      <View style={Styles.cardHeader}>
        <TouchableWithoutFeedback>
          <TouchableOpacity
            style={Styles.userInfoContainer}
            onPress={props.onPressItemUser}
          >
            {/* Avatar  */}
            <View style={Styles.avatarContainer}>
              <FastImage
                style={Styles.avatar}
                source={{
                  uri: item.userAvatar
                    ? BASE_URL.concat(item.userAvatar)
                    : undefined,
                }}
                resizeMode="cover"
              />
            </View>
            {/* Name */}
            <View style={Styles.nameContainer}>
              <Text style={Styles.userName}>{item.userPartnershipName}</Text>
              <Text style={Styles.userType}>{item.userPartnershipType}</Text>
              <Text style={Styles.date}>
                {renderCreatedAtFormat(item.createdAt)}
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </View>
      {/* Card Content */}
      <View style={Styles.cardContent}>
        <View style={Styles.cardContentText}>
          <Text style={Styles.title}>{`${item.title}`}</Text>
        </View>
        <View style={Styles.cardContentText}>
          <Text
            style={Styles.description}
            ellipsizeMode="tail"
            numberOfLines={descNumberOfLines}
            onPress={handleDescClick}
          >
            {item.description}
          </Text>
        </View>
        <View style={Styles.fileContainer}>
          {item.filename && (
            <STGImage
              data={{
                uri: `${BASE_URL.concat(item.filePath.replace("public", ""))}`,
                height: item.fileHeight,
                width: item.fileWidth,
                isVertical: item.fileIsVertical,
              }}
              zoom={true}
            />
          )}
        </View>
        {/* <SessionRegularItemRecurrences t={t} item={recurrences} /> */}
        <RecurrenceDateTime item={item} t={t} />
        <View style={Styles.cardContentText}>
          <Text style={Styles.price}>{`${item.price.toFixed(2)} €`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
