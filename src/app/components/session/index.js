import React, { useState, useEffect, useCallback } from "react";
import { View, Alert, Text } from "react-native";
import { useTranslation } from "react-i18next";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SessionService from "@services/session";
import { STGContainer, STGBody, STGActionSheet } from "stg-ui";
import Styles from "../styles";
import SessionHeader from "./header";
import Constants from "./Constants";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import SessionsList from "./SessionsList";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  setSessionsAction,
  setSessionsWithRecurrenceAction,
  setSessionsWithoutRecurrenceAction,
  setSessionsSearchAction,
  setSessionsUserAction,
  setSessionDataModeAction,
} from "@redux/actions";
import SessionRegular from "../session-regular/SessionRegular";

export default function Session() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  // Props from Redux
  const {
    sessions,
    sessionsWithRecurrence,
    sessionsWithoutRecurrence,
    sessionsSearch,
    sessionsUser,
    sessionDataMode,
  } = useSelector((state) => state.session, shallowEqual);

  // States
  const [showMap, setShowMap] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const [mode, setMode] = useState(Constants.Grid);
  // const [sessionDataMode, setSessionDataMode] = useState();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [addSessionVisible, setAddSessionVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [pageSessionsUser, setPageSessionsUser] = useState(0);
  const [pageSessionsWithRecurrence, setPageSessionsWithRecurrence] = useState(
    0
  );
  const [
    pageSessionsWithoutRecurrence,
    setPageSessionsWithoutRecurrence,
  ] = useState(0);
  const [pageSessionsSearch, setPageSessionsSearch] = useState(0);
  const numColumns = mode === Constants.Grid ? 2 : 1;

  const handleSearchVisible = () => {
    navigation.navigate("SessionSearch");
  };

  const handleAddSessionVisible = () => {
    setAddSessionVisible(!addSessionVisible);
  };

  const getSessions = (page = 0, size = 20) => {
    if (sessionDataMode === Constants.SessionWithRecurrence) {
      getSessionsWithRecurrence({ page, size });
    }
    if (sessionDataMode === Constants.SessionWithoutRecurrence) {
      getSessionsWithRecurrence({ page, size });
    }
    if (sessionDataMode === Constants.SessionAllData) {
      getSessionsPagination(page, size);
    }
    if (sessionDataMode === Constants.UserSessions) {
      getUserSessions(params.user.id);
    }
  };

  const loadMoreSessions = () => {
    if (page + 1 < sessions.totalPages) {
      const start = sessions.currentPage + 1;
      setPage(start);
      getSessionsPagination(start, size, true);
    }
  };

  const loadMoreSessionsSearch = () => {
    if (pageSessionsSearch + 1 < sessionsSearch.totalPages) {
      const start = sessionsSearch.currentPage + 1;
      setPageSessionsSearch(start);
      if (params === "csdcsdcjlskjclks") {
        getSessionsBySearch(params.filter, start, size, true);
      }
    }
  };

  const loadMoreSessionsWithRecurrence = () => {
    if (pageSessionsWithRecurrence + 1 < sessionsWithRecurrence.totalPages) {
      const start = sessionsWithRecurrence.currentPage + 1;
      setPageSessionsWithRecurrence(start);
      getSessionsWithRecurrence(start, size, true);
    }
  };

  const loadMoreSessionsWithoutRecurrence = () => {
    if (
      pageSessionsWithoutRecurrence + 1 <
      sessionsWithoutRecurrence.totalPages
    ) {
      const start = sessionsWithoutRecurrence.currentPage + 1;
      setPageSessionsWithoutRecurrence(start);
      getSessionsWithoutRecurrence(start, size, true);
    }
  };

  const loadMoreSessionsUser = () => {
    if (pageSessionsUser + 1 < sessionsUser.totalPages) {
      const start = sessionsUser.currentPage + 1;
      setPageSessionsUser(start);
      getUserSessions(start, size, true);
    }
  };

  const getSessionsPagination = async (
    page = 0,
    size = 20,
    loadMore = false
  ) => {
    setIsInfiniteScroll(true);
    const { data, status } = await SessionService.getSessionsPaginationService({
      page,
      size,
    });
    setIsInfiniteScroll(false);
    if (status === 200) {
      if (loadMore) {
        data.items = [...sessions.items, ...data.items];
      }
      dispatch(setSessionsAction(data));
    } else {
      dispatch(setSessionsAction(null));
    }
  };

  const getUserSessions = async (
    user,
    page = 0,
    size = 20,
    loadMore = false
  ) => {
    const { data, status } = await SessionService.getUserSessionsService(user, {
      page,
      size,
    });
    if (status === 200) {
      if (loadMore) {
        data.items = [...sessionsUser.items, ...data.items];
      }
      dispatch(setSessionsUserAction(data));
    } else {
      dispatch(setSessionsUserAction(null));
    }
  };

  const getSessionsBySearch = async (
    filter,
    page = 0,
    size = 20,
    loadMore = false
  ) => {
    for (const f in filter) {
      if (filter[f] === null || filter[f] === undefined || filter[f] === "") {
        delete filter[f];
      }
    }
    if (filter) {
      const { data, status } = await SessionService.getSessionsBySearchService({
        ...filter,
        page,
        size,
      });
      if (status === 200) {
        if (loadMore) {
          data.items = [...sessionsWithRecurrence.items, ...data.items];
        }
        dispatch(setSessionsSearchAction(data));
      } else {
        dispatch(setSessionsSearch(null));
      }
    }
  };

  const getSessionsWithRecurrence = async (params, loadMore = false) => {
    dispatch(setSessionDataModeAction(Constants.SessionWithRecurrence));
    const { data, status } = await SessionService.getSessionsRecurrenceMode({
      ...params,
      mode: 1,
    });
    if (status === 200) {
      if (loadMore) {
        data.items = [...sessionsWithRecurrence.items, ...data.items];
      }
      dispatch(setSessionsWithRecurrenceAction(data));
    } else {
      dispatch(setSessionsWithRecurrenceAction(null));
    }
  };

  const getSessionsWithoutRecurrence = async (params, loadMore = false) => {
    dispatch(setSessionDataModeAction(Constants.SessionWithoutRecurrence));
    const { data, status } = await SessionService.getSessionsRecurrenceMode({
      ...params,
      mode: 0,
    });
    if (status === 200) {
      if (loadMore) {
        data.items = [...sessionsWithRecurrence.items, ...data.items];
      }
      dispatch(setSessionsWithoutRecurrenceAction(data));
    } else {
      dispatch(setSessionsWithoutRecurrenceAction(null));
    }
  };

  const subscribeToSession = async (item) => {
    const { status } = await SessionService.subscribeToSessionService(item.id);
    if (status === 201) {
      getSessions();
    }
  };

  const unSubscribeToSession = async (item) => {
    const { status } = await SessionService.unSubscribeToSessionService(
      item.id
    );
    if (status === 201) {
      getSessions();
    }
  };

  const _handleShowMap = () => {
    setShowMap(!showMap);
  };

  const handleChangeMode = () => {
    setMode(mode === Constants.Grid ? Constants.List : Constants.Grid);
  };

  const showItemOptions = (selectedItem) => {
    setSelectedItem(selectedItem);
    setOptionsVisible(true);
  };

  const hideItemOptions = () => {
    setSelectedItem(null);
    setOptionsVisible(false);
  };

  const onPressEdit = () => {
    setOptionsVisible(false);
    navigation.navigate("SessionEdit", {
      session: { ...selectedItem },
    });
  };

  const deleteSession = async () => {
    const { status } = await SessionService.deleteSessionService(
      selectedItem.id
    );
    if (status === 200) {
      getSessions();
      hideItemOptions();
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

  const changeSessionDataMode = (mode) => {
    if (mode !== sessionDataMode) {
      dispatch(setSessionDataModeAction(mode));
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     if (params?.mode === Constants.UserSessions) {
  //       dispatch(setSessionDataModeAction(Constants.UserSessions));
  //     } else {
  //       dispatch(setSessionDataModeAction(Constants.SessionAllData));
  //     }
  //   }, [])
  // );

  // useEffect(() => {
  //   if (sessionDataMode === Constants.SessionWithRecurrence) {
  //     getSessionsWithRecurrence();
  //   }
  //   if (sessionDataMode === Constants.SessionWithoutRecurrence) {
  //     getSessionsWithoutRecurrence();
  //   }
  //   if (sessionDataMode === Constants.SessionAllData) {
  //     getSessionsPagination();
  //   }
  //   if (sessionDataMode === Constants.UserSessions) {
  //     getUserSessions(params.user.id);
  //   }
  // }, [sessionDataMode]);

  navigation.setOptions({
    headerRight: () => (
      <SessionHeader
        navigation={navigation}
        handleAddSessionVisible={handleAddSessionVisible}
        handleShowMap={_handleShowMap}
        handleChangeMode={handleChangeMode}
        changeSessionDataMode={changeSessionDataMode}
        sessionDataMode={sessionDataMode}
        onPressSearchButton={handleSearchVisible}
        mode={mode}
        t={t}
      />
    ),
  });

  return (
    <>
      <STGContainer>
        {/* <SessionRegular /> */}
        {/*
        <STGBody>
           {!sessions &&
            !sessionsWithRecurrence &&
            !sessionsWithoutRecurrence &&
            !sessionsSearch &&
            !sessionsUser && (
              <View style={Styles.listHeader}>
                <Text style={Styles.listHeaderMessageText}>
                  {t("common:searchEmpty")}
                </Text>
              </View>
            )}

          {sessionDataMode === Constants.SessionAllData && sessions && (
            <SessionsList
              getSessions={getSessionsPagination}
              isRefreshing={isRefreshing}
              loadMoreSessions={loadMoreSessions}
              mode={mode}
              numColumns={numColumns}
              onRefresh={getSessionsPagination}
              sessions={sessions.items}
              showItemOptions={showItemOptions}
              subscribeToSession={subscribeToSession}
              unSubscribeToSession={unSubscribeToSession}
              isInfiniteScroll={isInfiniteScroll}
            />
          )}

          {sessionDataMode === Constants.SessionWithRecurrence &&
            sessionsWithRecurrence && (
              <SessionsList
                getSessions={getSessionsWithRecurrence}
                isRefreshing={isRefreshing}
                loadMoreSessions={loadMoreSessionsWithRecurrence}
                mode={mode}
                numColumns={numColumns}
                onRefresh={getSessionsWithRecurrence}
                sessions={sessionsWithRecurrence.items}
                showItemOptions={showItemOptions}
                subscribeToSession={subscribeToSession}
                unSubscribeToSession={unSubscribeToSession}
                isInfiniteScroll={isInfiniteScroll}
              />
            )}

          {sessionDataMode === Constants.SessionWithoutRecurrence &&
            sessionsWithoutRecurrence && (
              <SessionsList
                getSessions={getSessionsWithoutRecurrence}
                isRefreshing={isRefreshing}
                loadMoreSessions={loadMoreSessionsWithoutRecurrence}
                mode={mode}
                numColumns={numColumns}
                onRefresh={getSessionsWithoutRecurrence}
                sessions={sessionsWithoutRecurrence.items}
                showItemOptions={showItemOptions}
                subscribeToSession={subscribeToSession}
                unSubscribeToSession={unSubscribeToSession}
                isInfiniteScroll={isInfiniteScroll}
              />
            )}

          {sessionDataMode === Constants.SessionSearch && sessionsSearch && (
            <SessionsList
              getSessions={getSessionsBySearch}
              isRefreshing={isRefreshing}
              loadMoreSessions={loadMoreSessionsSearch}
              mode={mode}
              numColumns={numColumns}
              onRefresh={getSessionsBySearch}
              sessions={sessionsSearch.items}
              showItemOptions={showItemOptions}
              subscribeToSession={subscribeToSession}
              unSubscribeToSession={unSubscribeToSession}
              isInfiniteScroll={isInfiniteScroll}
            />
          )}

          {sessionDataMode === Constants.UserSessions && sessionsUser && (
            <SessionsList
              getSessions={getUserSessions}
              isRefreshing={isRefreshing}
              loadMoreSessions={loadMoreSessionsUser}
              mode={mode}
              numColumns={numColumns}
              onRefresh={getUserSessions}
              sessions={sessionsUser.items}
              showItemOptions={showItemOptions}
              subscribeToSession={subscribeToSession}
              unSubscribeToSession={unSubscribeToSession}
              isInfiniteScroll={isInfiniteScroll}
            />
          )} 
        </STGBody>
      */}
      </STGContainer>
      <STGActionSheet
        isVisible={optionsVisible}
        hide={hideItemOptions}
        cancelButtonText={t("common:cancel")}
        items={[
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
      <STGActionSheet
        isVisible={addSessionVisible}
        hide={handleAddSessionVisible}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("session:options.addSessionUnique"),
            icon: <FontAwesome5 name="plus" size={20} />,
            onPress: () => {
              handleAddSessionVisible();
              navigation.navigate("SessionAddRegular");
            },
          },
          {
            title: t("session:options.addSessionRegular"),
            icon: <FontAwesome5 name="plus" size={20} />,
            onPress: () => {},
          },
          {
            title: t("session:options.addSessionRandom"),
            icon: <FontAwesome5 name="plus" size={20} />,
            onPress: () => {},
          },
        ]}
      />
    </>
  );
}
