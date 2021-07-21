import React, { useState, useCallback, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { STGActionSheet, STGContainer, STGFullMap, STGPictoMap } from "stg-ui";
import Styles from "../session-regular/SessionRegularStyles";
import SessionDetailsStyles from "./Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import Moment from "moment";
import { BASE_URL } from "../../config";
import SessionRegularCalendars from "./SessionRegularCalendars";
import { SessionRegularService } from "../../services";
import ButtonEdit from "./ButtonEdit";
import { setCreateSession } from "@redux/actions";
import { STGImage } from "stg-ui";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import RecurrenceDateTime from "./RecurrenceDateTime";

const daysName = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function SessionRegularDetails() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { session } = useSelector((state) => state.session, shallowEqual);
  const [loading, setLoading] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [hasLocation, setHasLocation] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [placesText, setPlacesText] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleOptionsVisible = () => {
    setOptionsVisible(!optionsVisible);
  };

  const renderCreatedAtFormat = (data) => {
    return Moment(data)
      .locale(i18n.language)
      .format("ddd, DD MMM YYYY");
  };

  const renderSessionDateFormat = (data) => {
    return Moment(data)
      .locale(i18n.language)
      .format("dddd, DD MMMM YYYY");
  };

  const getTimeStartEnd = (day) => {
    switch (day) {
      case 1:
        return {
          timeStart: session.mondayTimeStart,
          timeEnd: session.mondayTimeEnd,
        };
      case 2:
        return {
          timeStart: session.tuesdayTimeStart,
          timeEnd: session.tuesdayTimeEnd,
        };
      case 3:
        return {
          timeStart: session.wednesdayTimeStart,
          timeEnd: session.wednesdayTimeEnd,
        };
      case 4:
        return {
          timeStart: session.thursdayTimeStart,
          timeEnd: session.thursdayTimeEnd,
        };
      case 5:
        return {
          timeStart: session.fridayTimeStart,
          timeEnd: session.fridayTimeEnd,
        };
      case 6:
        return {
          timeStart: session.saturdayTimeStart,
          timeEnd: session.saturdayTimeEnd,
        };
      default:
        return {
          timeStart: session.sundayTimeStart,
          timeEnd: session.sundayTimeEnd,
        };
    }
  };

  const onDayPress = (data) => {
    if (data) {
      const selected = new Date(data.timestamp);
      const { timeStart, timeEnd } = getTimeStartEnd(selected.getDay());
      const subscribed =
        (subscribers &&
          subscribers.some(
            (item) =>
              Moment(item.date).format("YYYY-MM-DD") ===
              Moment(selected).format("YYYY-MM-DD")
          )) ||
        false;
      const sd = {
        ...data,
        timeStart: (timeStart && timeStart.substr(0, 5)) || "",
        timeEnd: (timeEnd && timeEnd.substr(0, 5)) || "",
        subscribed,
      };
      setSelectedDay(sd);
    } else {
      setSelectedDay(null);
    }
  };

  const getSessionsRegularSubscribers = async (id = null) => {
    const {
      data,
      status,
    } = await SessionRegularService.getSessionsRegularSubscribersService(id);
    setSubscribers(status === 200 && data.length > 0 ? data : null);
  };

  const onPressPurchase = async () => {
    const card = await SessionRegularService.getCardInfoService();
    if (card && card.card) {
      setLoading(true);
      const formdata = {
        currency: "eur",
        // source: card.tokenId,
        source: "tok_visa",
        date: selectedDay.dateString,
      };

      const {
        status,
      } = await SessionRegularService.purchaseSessionRegularService(
        session.id,
        formdata
      );
      setLoading(false);
      if (status === 201) {
        Alert.alert(
          `Paiement approuvé !`,
          `Vous êtes maintenant inscrit à cette séance.`
        );
        setSelectedDay(null);
        getSessionsRegularSubscribers(session.id);
      } else {
        Alert.alert(
          `Problème d'inscription'!`,
          `Une erreur s'est produite lors de l'inscription dans cette séance.`
        );
      }
    }
  };

  const handleShowHideLocation = () => {
    setLocationVisible(!locationVisible);
  };

  const createDateFromTime = (time) => {
    const date = Moment(new Date()).format("YYYY-MM-DD");
    return new Date(`${date}T${time}`);
  };

  const getRecurrencesData = () => {
    const dateStart = new Date();
    const dateEnd = new Date();
    dateEnd.setHours(dateEnd.getHours() + 1);
    const items = daysName.map((item, key) => {
      return {
        day: item,
        value: session[item] === 1 ? true : false,
        timeStartAt: session[item]
          ? createDateFromTime(session[`${item}TimeStart`])
          : dateStart,
        timeEndAt: session[item]
          ? createDateFromTime(session[`${item}TimeEnd`])
          : dateEnd,
        error: false,
      };
    });
    return JSON.stringify(items);
  };

  const onPressItemUser = () => {
    user.id === session.userId
      ? navigation.navigate("MySpace")
      : navigation.navigate("ProfileShow", {
          user: session.userId,
        });
  };

  const onPressDelete = async () => {
    handleOptionsVisible();
    const { status } = await SessionRegularService.removeSessionRegularService(
      session.id
    );
    if (status < 300) {
      navigation.goBack();
      Alert.alert(
        t("session:delete.success"),
        t("session:delete.successMessage")
      );
    } else if (status === 409) {
      Alert.alert(
        t("session:delete.conflict"),
        t("session:delete.conflictMessage")
      );
    } else {
      Alert.alert(t("session:delete.error"), t("session:delete.errorMessage"));
    }
  };

  const onPressRequestDelete = () => {
    Alert.alert(
      t("session:delete.requestTitle"),
      t("session:delete.requestMessage"),
      [
        {
          text: t("common:yes"),
          onPress: onPressDelete,
          style: "destructive",
        },
        {
          text: t("common:no"),
        },
      ]
    );
  };

  useEffect(
    useCallback(() => {
      if (session !== null) {
        const isOwner = +user.id === +session.userId;
        setIsOwner(isOwner);
        const hasLocation =
          session.latitude != null && session.longitude != null;
        setHasLocation(hasLocation);
        const hasAddress =
          session.country != null ||
          session.city != null ||
          session.address != null;
        setHasAddress(hasAddress);
        const placesText =
          session.places > 0
            ? t("session:details.placesLimited").replace("$1", session.places)
            : t("session:details.placesUnlimited");
        setPlacesText(placesText);
      }
    }, [session])
  );

  useEffect(() => {
    if (params && params.session != null) {
      dispatch(setCreateSession(params.session));
      getSessionsRegularSubscribers(params.session.id);
    }
    return () => {
      dispatch(setCreateSession(null));
      setSubscribers(null);
    };
  }, []);

  return (
    <>
      <STGContainer loading={loading}>
        {session ? (
          <ScrollView
            stickyHeaderIndices={[0]}
            contentContainerStyle={SessionDetailsStyles.body}
          >
            <View style={Styles.card}>
              {/* Card Header */}
              <View style={Styles.cardHeader}>
                <TouchableOpacity
                  style={Styles.userInfoContainer}
                  onPress={onPressItemUser}
                >
                  {/* Avatar */}
                  <View style={Styles.avatarContainer}>
                    <View style={Styles.avatar}>
                      <FastImage
                        source={{
                          uri: `${(session.userAvatar &&
                            BASE_URL.concat(session.userAvatar)) ||
                            ""}`,
                        }}
                        resizeMode="cover"
                        style={Styles.avatar}
                      />
                    </View>
                  </View>
                  <View style={Styles.nameContainer}>
                    <Text style={Styles.userName}>
                      {session.userPartnershipName}
                    </Text>
                    <Text style={Styles.userType}>
                      {session.userPartnershipType}
                    </Text>
                    <Text style={Styles.date}>
                      {renderCreatedAtFormat(session.createdAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
                {isOwner && (
                  <View style={Styles.settingButtonContainer}>
                    <TouchableOpacity
                      style={Styles.settingButton}
                      onPress={handleOptionsVisible}
                    >
                      <MaterialCommunityIcons name="dots-vertical" size={28} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View style={Styles.card}>
              <View style={Styles.cardContent}>
                <Text style={Styles.price}>{`${(session.price &&
                  session.price.toFixed(2)) ||
                  0} €`}</Text>
              </View>
              {isOwner && (
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "price",
                      sessionId: session.id,
                      data: { price: `${session.price}` },
                    });
                  }}
                />
              )}
            </View>

            <View style={Styles.card}>
              {/* Card Content */}
              <View style={Styles.cardContent}>
                {session.title !== "" && (
                  <View style={Styles.cardContentText}>
                    <Text style={Styles.title}>{session.title}</Text>
                  </View>
                )}
                {session.description !== "" && (
                  <View style={Styles.cardContentText}>
                    <Text style={Styles.description}>
                      {session.description}
                    </Text>
                  </View>
                )}
              </View>
              {isOwner && (
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "title",
                      sessionId: session.id,
                      data: {
                        title: session.title,
                        description: session.description,
                      },
                    });
                  }}
                />
              )}
            </View>

            {!session.fileId && isOwner && (
              <View style={Styles.card}>
                <View style={Styles.cardContent}>
                  <TouchableOpacity
                    style={Styles.cardContentText2}
                    onPress={() => {
                      navigation.navigate("SessionRegularEdit", {
                        fields: "file",
                        data: null,
                        sessionId: session.id,
                      });
                    }}
                  >
                    <MaterialCommunityIcons
                      name="file-image-outline"
                      size={28}
                    />
                    <Text style={Styles.title}>
                      {t("session:edit.editPhoto")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "file",
                      data: null,
                      sessionId: session.id,
                    });
                  }}
                />
              </View>
            )}

            {session.fileId && (
              <View style={Styles.card}>
                <STGImage
                  data={{
                    uri: `${BASE_URL.concat(
                      session.filePath.replace("public", "")
                    )}`,
                    height: session.fileHeight,
                    width: session.fileWidth,
                    isVertical: session.fileIsVertical,
                  }}
                  zoom={true}
                />
                {isOwner && (
                  <ButtonEdit
                    onPress={() => {
                      navigation.navigate("SessionRegularEdit", {
                        fields: "file",
                        data: {
                          fileId: session.fileId,
                          filename: session.filename,
                          filePath: session.filePath,
                          fileHeight: session.fileHeight,
                          fileWidth: session.fileWidth,
                          fileIsVertical: session.fileIsVertical,
                        },
                        sessionId: session.id,
                      });
                    }}
                  />
                )}
              </View>
            )}

            {!hasLocation && isOwner && (
              <View style={Styles.card}>
                <View style={Styles.cardContent}>
                  <TouchableOpacity
                    style={Styles.cardContentText2}
                    onPress={() => {
                      navigation.navigate("SessionRegularEdit", {
                        fields: "location",
                        sessionId: session.id,
                        data: {
                          latitude: session.latitude,
                          longitude: session.longitude,
                        },
                      });
                    }}
                  >
                    <MaterialCommunityIcons name="google-maps" size={28} />
                    <Text style={Styles.title}>
                      {t("session:edit.editLocation")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "location",
                      sessionId: session.id,
                      data: {
                        latitude: session.latitude,
                        longitude: session.longitude,
                      },
                    });
                  }}
                />
              </View>
            )}

            {hasLocation && (
              <View style={Styles.card}>
                {hasLocation && (
                  <STGPictoMap
                    latitude={session.latitude || null}
                    longitude={session.longitude || null}
                    regionLatitude={session.latitude || null}
                    regionLongitude={session.longitude || null}
                    onPressFullscreen={handleShowHideLocation}
                  />
                )}
                {isOwner && (
                  <ButtonEdit
                    onPress={() => {
                      navigation.navigate("SessionRegularEdit", {
                        fields: "location",
                        sessionId: session.id,
                        data: {
                          latitude: session.latitude,
                          longitude: session.longitude,
                        },
                      });
                    }}
                  />
                )}
              </View>
            )}

            <View style={Styles.card}>
              <View style={Styles.cardContent}>
                <View style={Styles.cardContentText}>
                  <Text style={Styles.addressText}>{placesText}</Text>
                </View>
                {session.places > 0 && (
                  <>
                    <View style={Styles.cardContentText}>
                      <Text style={Styles.addressText}>
                        {`${t("session:details.placesRemaining").replace(
                          "$1",
                          Math.floor(+session.places - +session.subscribesCount)
                        )}`}
                      </Text>
                    </View>
                    <View style={Styles.cardContentText}>
                      <Text style={Styles.addressText}>
                        {t("session:details.placesOccupied").replace(
                          "$1",
                          session.subscribesCount
                        )}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              {isOwner && subscribers && subscribers.length > 0 && (
                <View style={Styles.cardContent}>
                  <TouchableOpacity
                    style={Styles.cardContentText2}
                    onPress={() => {
                      navigation.navigate("SessionRegularSubscribesUsers", {
                        sessionId: session.id,
                      });
                    }}
                  >
                    <FontAwesome5Icon name="users" size={20} />
                    <Text style={Styles.link}>
                      {t("session:showUsersList")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {isOwner && (
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "places",
                      sessionId: session.id,
                      data: { places: `${session.places}` },
                    });
                  }}
                />
              )}
            </View>

            <View style={Styles.card}>
              <View style={Styles.sessionDate}>
                <View style={Styles.sessionDateIcon}>
                  <Ionicons name="calendar-outline" size={28} />
                </View>
                <View style={Styles.sessionDateContainer}>
                  <View style={Styles.cardContent}>
                    <Text style={Styles.sessionDateText}>
                      {renderSessionDateFormat(session.dateStartAt)}
                    </Text>
                  </View>
                  <View style={Styles.cardContent}>
                    <Text style={Styles.sessionDateText}>
                      {renderSessionDateFormat(session.dateExpireAt)}
                    </Text>
                  </View>
                </View>
              </View>
              {isOwner && (
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "date",
                      sessionId: session.id,
                      data: {
                        dateStartAt: session.dateStartAt,
                        dateExpireAt: session.dateExpireAt,
                      },
                    });
                  }}
                />
              )}
            </View>

            {hasAddress && (
              <View style={Styles.card}>
                <View style={Styles.cardContent}>
                  {session.country && (
                    <View style={Styles.cardContentText}>
                      <Text style={Styles.addressTitle}>
                        {t("common:country")}
                      </Text>
                      <View style={Styles.cardContentText}>
                        <Text style={Styles.addressText}>
                          {session.country}
                        </Text>
                      </View>
                    </View>
                  )}
                  {session.city && (
                    <View style={Styles.cardContentText}>
                      <Text style={Styles.addressTitle}>
                        {t("common:city")}
                      </Text>
                      <View style={Styles.cardContentText}>
                        <Text style={Styles.addressText}>{session.city}</Text>
                      </View>
                    </View>
                  )}
                  {session.address && (
                    <View style={Styles.cardContentText}>
                      <Text style={Styles.addressTitle}>
                        {t("common:address")}
                      </Text>
                      <View style={Styles.cardContentText}>
                        <Text style={Styles.addressText}>
                          {session.address}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
                {isOwner && (
                  <ButtonEdit
                    onPress={() => {
                      navigation.navigate("SessionRegularEdit", {
                        fields: "address",
                        sessionId: session.id,
                        data: {
                          country: session.country,
                          city: session.city,
                          address: session.address,
                        },
                      });
                    }}
                  />
                )}
              </View>
            )}
            <View style={Styles.card}>
              <RecurrenceDateTime item={session} t={t} />
            </View>

            <View style={Styles.card}>
              <View style={Styles.cardContent}>
                <View style={Styles.cardContentText}>
                  <Text style={Styles.card2ContentText1}>{""}</Text>
                </View>
              </View>
              <SessionRegularCalendars
                session={session}
                onDayPress={onDayPress}
              />
              {selectedDay && (
                <View style={Styles.card2}>
                  <View style={Styles.card2Content}>
                    <View style={Styles.selectedDayDateContainer}>
                      <Text style={Styles.selectedDayDateText1}>
                        {Moment(selectedDay.dateString)
                          .locale(i18n.language)
                          .format("DD")}
                      </Text>
                      <Text style={Styles.selectedDayDateText2}>
                        {Moment(selectedDay.dateString)
                          .locale(i18n.language)
                          .format("MMM")}
                      </Text>
                    </View>
                    <View style={Styles.selectedDayContent}>
                      <View style={Styles.selectedDayContentTime}>
                        <Text style={Styles.selectedDayContentTimeText}>
                          {selectedDay.timeStart}
                        </Text>
                        <Text style={Styles.selectedDayContentTimeText}>
                          {" - "}
                        </Text>
                        <Text style={Styles.selectedDayContentTimeText}>
                          {selectedDay.timeEnd}
                        </Text>
                      </View>

                      {!isOwner &&
                        (session.places === 0 ||
                        (session.places > 0 &&
                          Math.floor(
                            +session.places - +session.subscribesCount
                          ) > 0) ? (
                          <TouchableOpacity
                            style={Styles.purchaseButton}
                            onPress={onPressPurchase}
                          >
                            <Text style={Styles.purchaseButtonText}>
                              {t("session:payment.purchase")}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <Text>{t("session:allPlacesReserved")}!</Text>
                        ))}
                    </View>
                    {selectedDay.subscribed && (
                      <View style={Styles.subscribed}>
                        <FontAwesome5 name="calendar-check" size={32} />
                      </View>
                    )}
                  </View>
                </View>
              )}
              {isOwner && (
                <ButtonEdit
                  onPress={() => {
                    navigation.navigate("SessionRegularEdit", {
                      fields: "recurrences",
                      data: getRecurrencesData(),
                      sessionId: session.id,
                    });
                  }}
                />
              )}
            </View>

            {subscribers !== null && (
              <View style={Styles.card2}>
                <View style={Styles.card2Content}>
                  <Text style={Styles.card2ContentText1}>
                    {t("session:details.myRegistrations")}
                  </Text>
                </View>
                {subscribers.map((item, key) => (
                  <View style={Styles.card2Content} key={`subscriber-${key}`}>
                    <View style={Styles.selectedDayDateContainer}>
                      <FontAwesome5 name="calendar-check" size={24} />
                    </View>
                    <View style={Styles.selectedDayContent}>
                      <View style={Styles.selectedDayContentTime}>
                        <Text style={Styles.selectedDayContentTimeText}>
                          {Moment(item.date)
                            .locale(i18n.language)
                            .format("ddd DD MMM YYYY")}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={SessionDetailsStyles.loadingContainer}>
            <ActivityIndicator
              size="large"
              style={SessionDetailsStyles.spinner}
            />
          </View>
        )}
      </STGContainer>
      {hasLocation && (
        <STGFullMap
          show={locationVisible}
          hideMap={handleShowHideLocation}
          latitude={session.latitude}
          longitude={session.longitude}
          regionLatitude={session.latitude}
          regionLongitude={session.longitude}
        />
      )}

      <STGActionSheet
        visible={optionsVisible}
        onRequestClose={handleOptionsVisible}
        hide={handleOptionsVisible}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("session:options.delete"),
            onPress: onPressRequestDelete,
            icon: <FontAwesome5 name="trash-alt" size={20} />,
          },
        ]}
      />
    </>
  );
}
