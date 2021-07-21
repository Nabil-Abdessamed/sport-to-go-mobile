import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ListHeader from "../session-regular/ListHeader";
import SessionUniqueService from "../../services/session/SessionUniqueService";
import SessionUniqueList from "./List";
import { setSessionsUnique } from "@redux/actions";

const MODE = {
  GRID: "GRID",
  LIST: "LIST",
};

const SessionsDto = {
  page: 0,
  size: 20,
  itemsCount: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
};

const initialProps = {
  user: null,
};

export default function SessionUnique(props = initialProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { sessionsUnique } = useSelector(
    (state) => state.session,
    shallowEqual
  );
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [sessions, setSessions] = useState(SessionsDto);
  const [mode, setMode] = useState(MODE.GRID);

  const getSessionsUnique = async () => {
    setRefreshing(true);
    const {
      data,
      status,
    } = await SessionUniqueService.getSessionsUniqueService({ page: 0, size });
    setRefreshing(false);
    if (status === 200) {
      dispatch(setSessionsUnique(data));
    } else {
      dispatch(setSessionsUnique(SessionsDto));
    }
  };

  const loadMoreSessionsRegular = async () => {
    const totalPages = sessionsUnique.totalPages;
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setLoadMore(true);
      setPage(nextPage);
      const {
        status,
        data,
      } = await SessionUniqueService.getSessionsUniqueService({
        page: nextPage,
        size,
      });
      setLoadMore(false);
      data.items = [...sessionsUnique.items, ...data.items];
      dispatch(setSessionsUnique(status === 200 ? data : SessionsDto));
    }
  };

  const onPressAddButton = () => {
    navigation.navigate("SessionUniqueAdd");
  };

  const handleChangeMode = () => {
    setMode(mode === MODE.GRID ? MODE.LIST : MODE.GRID);
  };

  const onPressSearchButton = () => {
    navigation.navigate("SessionUniqueSearch");
  };

  const onPressItemUser = (item) => {
    user.id === item.userId
      ? navigation.navigate("MySpace")
      : navigation.navigate("ProfileShow", {
          user: item.userId,
        });
  };

  const onPressItem = (session) => {
    navigation.navigate("SessionUniqueDetails", { session });
  };

  useFocusEffect(
    useCallback(() => {
      getSessionsUnique();
      return () => {
        dispatch(setSessionsUnique(SessionsDto));
      };
    }, [])
  );

  const numColumns = mode === MODE.GRID ? 2 : 1;

  return (
    <>
      <ListHeader
        buttonAddShow={user && user.type === "PRO"}
        onPressAddButton={onPressAddButton}
        onChangeMode={handleChangeMode}
        onPressSearchButton={onPressSearchButton}
        mode={mode}
      />
      <SessionUniqueList
        numColumns={numColumns}
        data={sessionsUnique}
        mode={mode}
        onPressItem={onPressItem}
        onPressItemUser={onPressItemUser}
        user={user}
        loadMore={loadMore}
        loadMoreSessionsRegular={loadMoreSessionsRegular}
        refreshing={refreshing}
        refreshSessionsRegular={getSessionsUnique}
        t={t}
        i18n={i18n}
        onPressSearchButton={onPressSearchButton}
        onPressAddButton={onPressAddButton}
        handleChangeMode={handleChangeMode}
      />
    </>
  );
}
