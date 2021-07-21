import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { SessionRegularService } from "../../services";
import ListHeader from "./ListHeader";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setSessionsRegular, setSessionsRegularFilter } from "@redux/actions";
import SessionRegularList from "./List";

const MODE = {
  GRID: "GRID",
  LIST: "LIST",
};

const initialProps = {};

const SessionsDto = {
  page: 0,
  size: 20,
  itemsCount: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
};

export default function SessionRegular(props = initialProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { sessionsRegular, sessionsRegularFilter } = useSelector(
    (state) => state.session,
    shallowEqual
  );
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [mode, setMode] = useState(MODE.GRID);

  const getSessionsRegular = async () => {
    setRefreshing(true);
    const {
      status,
      data,
    } = await SessionRegularService.getSessionsRegularService({
      page: 0,
      size,
    });
    setRefreshing(false);
    dispatch(setSessionsRegular(status === 200 ? data : SessionsDto));
  };

  const loadMoreSessionsRegular = async () => {
    const totalPages = sessionsRegular.totalPages;
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setLoadMore(true);
      setPage(nextPage);
      const {
        status,
        data,
      } = await SessionRegularService.getSessionsRegularService({
        page: nextPage,
        size,
      });
      setLoadMore(false);
      data.items = [...sessionsRegular.items, ...data.items];
      dispatch(setSessionsRegular(status === 200 ? data : SessionsDto));
    }
  };

  const onPressAddButton = () => {
    navigation.navigate("SessionAddRegular");
  };

  const onPressItem = (session) => {
    navigation.navigate("SessionRegularDetails", { session });
  };

  const handleChangeMode = () => {
    setMode(mode === MODE.GRID ? MODE.LIST : MODE.GRID);
  };

  useFocusEffect(
    useCallback(() => {
      getSessionsRegular();
      return () => {
        setPage(0);
        setSize(20);
        dispatch(setSessionsRegular(SessionsDto));
        dispatch(setSessionsRegularFilter(null));
      };
    }, [])
  );

  const onPressItemUser = (item) => {
    user.id === item.userId
      ? navigation.navigate("MySpace")
      : navigation.navigate("ProfileShow", {
          user: item.userId,
        });
  };

  const onPressSearchButton = () => {
    navigation.navigate("SessionRegularSearch");
  };

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
      <SessionRegularList
        numColumns={numColumns}
        data={sessionsRegular}
        mode={mode}
        onPressItem={onPressItem}
        onPressItemUser={onPressItemUser}
        user={user}
        loadMore={loadMore}
        loadMoreSessionsRegular={loadMoreSessionsRegular}
        refreshing={refreshing}
        refreshSessionsRegular={getSessionsRegular}
        t={t}
        onPressSearchButton={onPressSearchButton}
        onPressAddButton={onPressAddButton}
        handleChangeMode={handleChangeMode}
      />
    </>
  );
}
