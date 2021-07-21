import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, Text } from "react-native";
import Styles from "../styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Item from "./item";
import ItemCheckerboard from "./ItemCheckerboard";
import EventService from "@services/EventService";
import {
  setEventsAction,
  setEventsSearchAction,
  setEventModeAction,
} from "@redux/actions";
import { STGContainer, STGBody, STGActionSheet, STGListUsers } from "stg-ui";
import { EventHeaderRight } from "./EventHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import EventHelpers from "./Helpers";

export default function Event() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <EventHeaderRight
        navigation={navigation}
        handleChangeMode={handleChangeMode}
        mode={mode}
      />
    ),
  });
  const dispatch = useDispatch();
  const { params } = useRoute();
  // Props from Redux
  const { events, eventsSearch, eventMode } = useSelector(
    (state) => state.event,
    shallowEqual
  );
  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [mode, setMode] = useState("GRID");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);
  const numColumns = mode === "GRID" ? 2 : 1;

  const onRefresh = async () => {
    setRefreshing(true);
    EventHelpers.getEvents();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getParticipants = async () => {
    const response = await EventService.getEventParticipantsService(
      selectedItem.id
    );
    if (response.status === 200) {
      setParticipants(response.data);
    } else {
      setParticipants([]);
    }
  };

  const getEvents = async () => {
    setLoading(true);
    setLoadingText(t("event:loadingText"));
    const response = await EventService.getEventsService();
    setLoading(false);
    setLoadingText("");
    dispatch(setEventModeAction("DATA"));
    if (response.status === 200) {
      dispatch(setEventsAction(response.data));
    } else {
      Alert.alert(t("event:error"), t("event:errorMessage"));
      dispatch(setEventsAction([]));
    }
  };

  const getEventsBySearch = async (filter) => {
    const response = await EventService.getEventsBySearchService(filter);
    dispatch(setEventModeAction("DATA"));
    if (response.status === 200) {
      dispatch(setEventsSearchAction(response.data));
    } else {
      dispatch(setEventsSearchAction(null));
    }
  };

  const handleChangeMode = () => {
    setMode(mode === "GRID" ? "LIST" : "GRID");
  };

  const showOptions = (item) => {
    setSelectedItem(item);
    setOptionsVisible(true);
  };

  const hideOptions = () => {
    setSelectedItem(null);
    setOptionsVisible(false);
  };

  const onPressEdit = () => {
    setOptionsVisible(false);
    navigation.navigate("EventEdit", {
      event: selectedItem,
    });
  };

  const deleteEvent = async () => {
    setOptionsVisible(false);
    const response = await EventService.deleteEventSerivce(selectedItem.id);
    if (response.status === 200) {
      refreshEvents();
    }
  };

  const onPressDelete = () => {
    Alert.alert(t("event:deleteTitle"), t("event:deleteMessage"), [
      {
        text: t("common:yes"),
        onPress: () => deleteEvent(),
        style: "destructive",
      },
      {
        text: t("common:no"),
      },
    ]);
  };

  const handleShowParticipants = () => {
    getParticipants();
    setOptionsVisible(false);
    setTimeout(() => {
      setShowParticipants(true);
    }, 1000);
  };

  const handleHideParticipants = () => {
    setParticipants([]);
    setShowParticipants(false);
  };

  useEffect(() => {
    if (params && params.search) {
      getEventsBySearch(params.filter);
    } else {
      getEvents();
    }
    return () => {
      dispatch(dispatch(setEventModeAction("DATA")));
    };
  }, []);

  return (
    <>
      <STGContainer>
        <STGBody loading={loading} loadingText={loadingText}>
          {eventMode === "SEARCH" && eventsSearch && eventsSearch.length === 0 && (
            <View style={Styles.listHeader}>
              <Text style={Styles.listHeaderMessageText}>
                {t("common:searchEmpty")}
              </Text>
            </View>
          )}
          <FlatList
            key={numColumns}
            numColumns={numColumns}
            contentContainerStyle={{ paddingBottom: 80 }}
            scrollEnabled={true}
            data={
              eventMode === "DATA"
                ? events
                : eventMode === "SEARCH"
                ? eventsSearch
                : []
            }
            keyExtractor={(_, index) => `event-key-${index}`}
            refreshing={refreshing}
            scrollEventThrottle={16}
            renderItem={({ item }) =>
              mode === "GRID" ? (
                <ItemCheckerboard item={item} navigation={navigation} t={t} />
              ) : (
                <Item
                  item={item}
                  navigation={navigation}
                  t={t}
                  showOptions={() => showOptions(item)}
                />
              )
            }
            onRefresh={onRefresh}
            ListHeaderComponent={() => {
              return !events || (events && events.length === 0) ? (
                <View style={Styles.listHeader}>
                  <Text style={Styles.listHeaderMessageText}>
                    {t("common:searchEmpty")}
                  </Text>
                </View>
              ) : null;
            }}
          />
        </STGBody>
      </STGContainer>
      <STGActionSheet
        isVisible={optionsVisible}
        hide={hideOptions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: `(${(selectedItem && selectedItem.subscribersCount) ||
              0}) ${t("session:options.subscribers")}`,
            onPress: handleShowParticipants,
            icon: <FontAwesome5 name="users" size={20} />,
          },
          {
            title: t("session:options.edit"),
            onPress: onPressEdit,
            icon: <FontAwesome5 name="edit" size={20} />,
          },
          {
            title: t("session:options.delete"),
            onPress: onPressDelete,
            icon: <FontAwesome5 name="trash-alt" size={20} />,
          },
        ]}
      />
      <STGListUsers
        visible={showParticipants}
        data={participants}
        hide={handleHideParticipants}
        title={t("event:details.participantsListTitle")}
        navigation={navigation}
      />
    </>
  );
}
