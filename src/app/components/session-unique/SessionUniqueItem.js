import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import FastImage from "react-native-fast-image";
import Ionicons from "react-native-vector-icons/Ionicons";
import Styles from "../session-regular/SessionRegularStyles";
import Moment from "moment";
import { BASE_URL } from "../../config";
import { STGImage } from "stg-ui";

const propsType = {
  t: () => {},
  i18n: {},
  onPressItem: () => {},
  onPressItemUser: () => {},
  item: null,
};

export default function SessionUniqueItem(props = propsType) {
  const { item, t, i18n } = props;
  const [descNumberOfLines, setDescNumberOfLines] = useState(3);

  const handleDescClick = () => {
    setDescNumberOfLines(descNumberOfLines === 0 ? 3 : 0);
  };

  const renderCreatedAtFormat = (data) => {
    return Moment(data).format("ddd, DD MMM YYYY");
  };

  const renderDate = (date) => {
    return Moment(date)
      .locale(i18n.language)
      .format("ddd DD MMM YYYY");
  };

  const renderTime = (time) => {
    if (time && typeof time === "string") {
      return time.substr(0, 5);
    } else {
      return "";
    }
  };

  useEffect(() => {}, []);

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
        <View style={Styles.cardContentText}>
          <Text style={Styles.price}>{`${item.price.toFixed(2)} €`}</Text>
        </View>
        <View style={Styles.cardContentText2}>
          <View style={Styles.cardContentText}>
            <Ionicons name="calendar-outline" size={20} />
          </View>
          <View style={Styles.cardContentText}>
            <Text style={Styles.dateText}>{renderDate(item.date)}</Text>
            <Text style={Styles.dateText}>
              {renderTime(item.timeStartAt)} | {renderTime(item.timeEndAt)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
