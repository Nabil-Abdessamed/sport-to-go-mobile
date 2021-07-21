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
import {
  STGActionSheet,
  STGButton,
  STGContainer,
  STGFullMap,
  STGPictoMap,
} from "stg-ui";
import Styles from "../session-regular/SessionRegularStyles";
import SessionDetailsStyles from "../session-regular-details/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import Moment from "moment";
import { BASE_URL } from "../../config";
import { SessionUniqueService } from "../../services";
import ButtonEdit from "../session-regular-details/ButtonEdit";
import { setCreateSession } from "@redux/actions";
import { STGImage } from "stg-ui";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function SessionUniqueDetails() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { session } = useSelector((state) => state.session, shallowEqual);
  const [loading, setLoading] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
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
    if (data) {
      return Moment(data)
        .locale(i18n.language)
        .format("ddd, DD MMM YYYY");
    } else {
      return "";
    }
  };

  const renderSessionDateFormat = (data) => {
    if (data) {
      return Moment(data)
        .locale(i18n.language)
        .format("dddd, DD MMMM YYYY");
    } else {
      return "";
    }
  };

  const renderSessionTimeFormat = (time) => {
    if (time && typeof time === "string") {
      return time.substr(0, 5);
    } else {
      return "";
    }
  };

  const getSessionsUniqueSubscribes = async (id = null) => {
    const {
      data,
      status,
    } = await SessionUniqueService.getSessionsUniqueSubscribersService(id);
    setSubscribers(status === 200 && data.length > 0 ? data : null);
  };

  const onPressPurchase = async () => {
    const card = await SessionUniqueService.getCardInfoService();
    if (card && card.card) {
      setLoading(true);
      const formdata = {
        currency: "eur",
        // source: card.tokenId,
        source: "tok_visa",
        date: Moment(session.date).format("YYYY-MM-DD"),
        timeStartAt: session.timeStartAt,
        timeEndAt: session.timeEndAt,
      };
      const {
        status,
      } = await SessionUniqueService.purchaseSessionUniqueService(
        session.id,
        formdata
      );
      setLoading(false);
      if (status < 300) {
        Alert.alert(
          t("session:payment.success"),
          t("session:payment.successMessage")
        );
        getSessionsUniqueSubscribes(session.id);
      } else if (status === 409) {
        Alert.alert(
          t("session:payment.error"),
          t("session:payment.errorMessage2")
        );
      } else {
        Alert.alert(
          t("session:payment.error"),
          t("session:payment.errorMessage")
        );
      }
    }
  };

  const handleShowHideLocation = () => {
    setLocationVisible(!locationVisible);
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
    const {
      status,
      data,
    } = await SessionUniqueService.removeSessionUniqueService(session.id);
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
        setIsOwner(+session.isOwner === 1 ? true : false);
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
      getSessionsUniqueSubscribes(params.session.id);
    }
    return () => {
      dispatch(setCreateSession(null));
      setSubscribers(null);
    };
  }, []);

  return (
    <>
      <STGContainer loading={loading}>
        {session !== null ? (
          <>
            <ScrollView
              stickyHeaderIndices={[0]}
              contentContainerStyle={SessionDetailsStyles.body}
            >
              <View style={Styles.card}>
                <View style={Styles.cardHeader}>
                  <TouchableOpacity
                    style={Styles.userInfoContainer}
                    onPress={onPressItemUser}
                  >
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
                        <MaterialCommunityIcons
                          name="dots-vertical"
                          size={28}
                        />
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
                      navigation.navigate("SessionUniqueEdit", {
                        fields: "price",
                        sessionId: session.id,
                        data: { price: `${session.price}` },
                      });
                    }}
                  />
                )}
              </View>

              <View style={Styles.card}>
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
                      navigation.navigate("SessionUniqueEdit", {
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
                        navigation.navigate("SessionUniqueEdit", {
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
                      <Text style={Styles.link}>
                        {t("session:edit.editPhoto")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ButtonEdit
                    onPress={() => {
                      navigation.navigate("SessionUniqueEdit", {
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
                        navigation.navigate("SessionUniqueEdit", {
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
                        navigation.navigate("SessionUniqueEdit", {
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
                      <Text style={Styles.link}>
                        {t("session:edit.editLocation")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ButtonEdit
                    onPress={() => {
                      navigation.navigate("SessionUniqueEdit", {
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
                        navigation.navigate("SessionUniqueEdit", {
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
                            Math.floor(
                              +session.places - +session.subscribesCount
                            )
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
                {isOwner && +session.subscribesCount > 0 && (
                  <View style={Styles.cardContent}>
                    <TouchableOpacity
                      style={Styles.cardContentText2}
                      onPress={() => {
                        navigation.navigate("SessionUniqueSubscribesUsers", {
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
                      navigation.navigate("SessionUniqueEdit", {
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
                        {renderSessionDateFormat(session.date)}
                      </Text>
                    </View>
                    <View style={Styles.cardContent}>
                      <Text style={Styles.sessionDateText}>
                        {renderSessionTimeFormat(session.timeStartAt)}
                        {" | "}
                        {renderSessionTimeFormat(session.timeEndAt)}
                      </Text>
                    </View>
                  </View>
                </View>
                {isOwner && (
                  <ButtonEdit
                    onPress={() => {
                      navigation.navigate("SessionUniqueEdit", {
                        fields: "date",
                        sessionId: session.id,
                        data: {
                          date: session.date,
                          timeStartAt: session.timeStartAt,
                          timeEndAt: session.timeEndAt,
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
                        navigation.navigate("SessionUniqueEdit", {
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
                        <View style={Styles.selectedDayContentTime}>
                          <Text style={Styles.selectedDayContentTimeText2}>
                            {session.timeStartAt.substr(0, 5)}
                            {" | "}
                            {session.timeEndAt.substr(0, 5)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
            {!isOwner && (
              <STGButton
                onPress={onPressPurchase}
                btnText={t("session:payment.purchase")}
                btnIcon={<FontAwesome5Icon name="dollar-sign" size={18} />}
              />
            )}
          </>
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
