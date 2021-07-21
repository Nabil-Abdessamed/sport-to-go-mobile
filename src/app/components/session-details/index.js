import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import styles from "./style";
import _ from "lodash";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import {
  STGButton,
  STGContainer,
  STGColors,
  STGListUsers,
  STGImageZoom,
  STGAvatar,
  STGPictoMap,
  STGActionSheet,
} from "stg-ui";
import { BASE_URL } from "@config";
import {
  deleteSessionService,
  getSessionSubscribersService,
  getOneSessionService,
} from "@services";
import Styles from "../styles";
import { STGFullMap } from "stg-ui";
import { Recurrences } from "../session/recurrences";
import Days from "../session/Days";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import SessionAgenda from "./Agenda";

const HeaderRight = ({ hasOptions, onPressShowOptions }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    }}
  >
    {hasOptions && (
      <TouchableOpacity onPress={() => onPressShowOptions()}>
        <MaterialCommunityIcons name="dots-vertical" size={30} />
      </TouchableOpacity>
    )}
  </View>
);

export default function SessionDetails() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight
        hasOptions={Number(session.owner) === 1}
        onPressShowOptions={showOptions}
      />
    ),
  });
  const { params } = useRoute();
  // Props from redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [session, setSession] = useState({});
  const [subscribersShow, setSubscribersShow] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const days = new Days({ ...session });

  const getSession = async (id) => {
    setLoading(true);
    const { data, status } = await getOneSessionService(id);
    setLoading(false);
    if (status === 200) {
      setSession(data);
      getSubscribers(data.id);
    } else {
      if (params?.session) {
        setSession(params.session);
        getSubscribers(params.session.id);
      } else {
        navigation.goBack();
      }
    }
  };

  const showSubscribers = () => {
    setOptionsVisible(false);
    setTimeout(() => {
      setSubscribersShow(true);
    }, 300);
  };

  const hideSubscribers = () => {
    setSubscribersShow(false);
  };

  const getSubscribers = async (sessionId) => {
    const { data, status } = await getSessionSubscribersService(sessionId);
    if (status === 200) {
      setSubscribers(data);
    } else {
      setSubscribers([]);
    }
  };

  const _renderButtonPay = (session, t) => {
    if (Number(session.owner) === 0) {
      if (Number(session.subscribed) === 0) {
        if (
          Number(session.subscribersCount) < session.places ||
          session.places === 0
        ) {
          return (
            <STGButton
              onPress={() =>
                navigation.navigate("SessionPaymentStripe", {
                  session: { ...session },
                })
              }
              btnText={t("session:btnBook")}
            />
          );
        }
      }
    }
    return null;
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  const showOptions = () => {
    setOptionsVisible(true);
  };

  const hideOptions = () => {
    setOptionsVisible(false);
  };

  const onPressEdit = () => {
    hideOptions();
    navigation.navigate("SessionEdit", {
      session: { ...session },
    });
  };

  const deleteSession = async () => {
    const response = await deleteSessionService(session.id);
    if (response.status === 200) {
      Alert.alert(
        t("session:delete.success"),
        t("session:delete.successMessage")
      );
      const onUpdate = params.onUpdate;
      if (onUpdate) {
        onUpdate();
      }
      navigation.navigate("Session");
    } else if (response.status === 409) {
      Alert.alert(
        t("session:delete.conflict"),
        t("session:delete.conflictMessage")
      );
    } else {
      Alert.alert(t("session:delete.error"), t("session:delete.errorMessage"));
    }
  };

  const onPressDelete = () => {
    Alert.alert(
      t("session:delete.requestTitle"),
      t("session:delete.requestMessage"),
      [
        {
          text: t("common:yes"),
          onPress: deleteSession,
          style: "destructive",
        },
        {
          text: t("common:no"),
        },
      ]
    );
  };

  const renderTime = (time) => {
    if (time !== undefined) {
      return time.substr(0, 5);
    } else {
      return "";
    }
  };

  useEffect(() => {
    const willFocusEvent = navigation.addListener("focus", () => {
      if (params?.session) {
        getSession(params.session.id);
      }
    });
    return willFocusEvent;
  }, []);

  return (
    <SessionAgenda />
    // <>
    //   <STGContainer loading={loading}>
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       keyboardDismissMode={"none"}
    //       keyboardShouldPersistTaps={"handled"}
    //       contentContainerStyle={{
    //         marginBottom: 20,
    //         paddingVertical: 20,
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={Styles.userContainer}
    //         onPress={() => {
    //           if (Number(session.userId) === Number(user.id)) {
    //             navigation.navigate("MySpace");
    //           } else {
    //             navigation.navigate("ProfileShow", {
    //               user: session.userId,
    //             });
    //           }
    //         }}
    //       >
    //         <STGAvatar
    //           uri={`${BASE_URL}/upload/avatars/${session.userAvatar}`}
    //         />
    //         <Text style={Styles.userFullname}>
    //           {session.userPartnershipName || session.userFullname || ""}
    //         </Text>
    //       </TouchableOpacity>

    //       <Text style={[Styles.detailsItemTitle, { marginTop: 10 }]}>
    //         {session.sport}
    //       </Text>
    //       <Text style={Styles.detailsItemDescription}>
    //         {session.description}
    //       </Text>

    //       <View
    //         style={[
    //           Styles.detailsItem,
    //           { justifyContent: "center", marginVertical: 20 },
    //         ]}
    //       >
    //         <IconEntypo name="price-ribbon" size={28} />
    //         <Text style={[Styles.detailsItemTitle, { fontSize: 28 }]}>{`${
    //           session.price
    //         } €`}</Text>
    //       </View>

    //       {session.image && (
    //         <STGImageZoom
    //           uri={`${BASE_URL}/upload/sessions/${session.image}`}
    //           withZoom={true}
    //         />
    //       )}

    //       <View style={Styles.detailsItem}>
    //         <MaterialCommunityIcons name="calendar-month-outline" size={18} />
    //         <Text style={Styles.detailsItemTitle}>
    //           {moment(session.dateStartAt).format("DD MMM YYYY")}
    //         </Text>
    //       </View>

    //       <View style={Styles.detailsItem}>
    //         <MaterialCommunityIcons name="clock" size={18} />
    //         <Text style={Styles.detailsItemTitle}>
    //           {renderTime(session.timeStartAt)}
    //         </Text>
    //       </View>

    //       {session.hasRecurrence === 1 && (
    //         <View style={Styles.detailsItem}>
    //           <MaterialCommunityIcons name="calendar-month-outline" size={18} />
    //           <Text style={Styles.detailsItemTitle}>
    //             {moment(session.dateExpireAt).format("DD MMM YYYY")}
    //           </Text>
    //         </View>
    //       )}

    //       {session.hasRecurrence === 1 && <Recurrences days={days} t={t} />}

    //       <View style={Styles.detailsItem}>
    //         <IconEntypo name="location-pin" size={20} />
    //         <Text style={Styles.detailsItemTitle}>
    //           {`${session.country}${session.city !== "" ? ", " : ""}${
    //             session.city
    //           }${session.address !== "" ? ", " : ""}${session.address}`}
    //         </Text>
    //       </View>

    //       {Number(session.places) > 0 && (
    //         <View style={Styles.detailsItem}>
    //           <FontAwesome5 name="users" size={12} />
    //           <Text style={Styles.detailsItemTitle}>{`${session.places} ${t(
    //             "session:places"
    //           )}`}</Text>
    //         </View>
    //       )}

    //       {Number(session.subscribersCount) > 0 && (
    //         <View style={Styles.detailsItem}>
    //           <FontAwesome5 name="users" size={14} />
    //           <Text style={Styles.detailsItemTitle}>{`${
    //             session.subscribersCount
    //           } ${
    //             Number(session.subscribersCount) > 1
    //               ? t("event:moreParticipated")
    //               : t("event:oneParticipated")
    //           }`}</Text>
    //         </View>
    //       )}

    //       {session.latitude && session.longitude && (
    //         <STGPictoMap
    //           regionLatitude={session.latitude}
    //           regionLongitude={session.longitude}
    //           latitude={session.latitude}
    //           longitude={session.longitude}
    //           onPressFullscreen={handleShowMap}
    //         />
    //       )}

    //       {Number(session.places) > 0 && (
    //         <View style={Styles.detailsItem}>
    //           <MaterialCommunityIcons name="human-handsup" size={18} />
    //           <Text style={Styles.detailsItemText}>{`${Number(session.places) -
    //             Number(session.subscribersCount)} ${t(
    //             "session:availablePlaces"
    //           )}`}</Text>
    //         </View>
    //       )}
    //     </ScrollView>
    //     {_renderButtonPay(session, t)}
    //     {Number(session.subscribed) === 1 && (
    //       <MaterialCommunityIcons
    //         name="check-decagram"
    //         color={STGColors.container}
    //         size={64}
    //         style={styles.subscribed}
    //       />
    //     )}
    //   </STGContainer>
    //   {session.latitude && session.longitude && (
    //     <STGFullMap
    //       show={showMap}
    //       hideMap={handleHideMap}
    //       regionLatitude={session.latitude}
    //       regionLongitude={session.longitude}
    //       markers={[
    //         {
    //           latitude: session.latitude,
    //           longitude: session.longitude,
    //           title: session.sport,
    //           description: session.address,
    //         },
    //       ]}
    //     />
    //   )}
    //   <STGListUsers
    //     visible={subscribersShow}
    //     data={subscribers}
    //     hide={hideSubscribers}
    //     title={t("session:details.subscribesList")}
    //     navigation={navigation}
    //   />
    //   <STGActionSheet
    //     isVisible={optionsVisible}
    //     hide={hideOptions}
    //     cancelButtonText={t("common:cancel")}
    //     items={[
    //       {
    //         title: `(${session.subscribersCount}) ${t(
    //           "session:options.subscribers"
    //         )}`,
    //         onPress: showSubscribers,
    //         icon: <FontAwesome5 name="users" size={20} />,
    //       },
    //       {
    //         title: t("session:options.edit"),
    //         onPress: onPressEdit,
    //         icon: <FontAwesome5 name="edit" size={20} />,
    //       },
    //       {
    //         title: t("session:options.delete"),
    //         onPress: onPressDelete,
    //         icon: <FontAwesome5 name="trash-alt" size={20} />,
    //       },
    //     ]}
    //   />
    // </>
  );
}
