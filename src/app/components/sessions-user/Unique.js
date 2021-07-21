import React, { useEffect, useState } from "react";
import SessionUniqueList from "../session-unique/List";
import { SessionUniqueService } from "../../services";

const SessionsDto = {
  page: 0,
  size: 20,
  itemsCount: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
};

export default function SessionsUserUnique(props) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [sessions, setSessions] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const getSessionsUser = async (userId) => {
    setRefreshing(true);
    const {
      data,
      status,
    } = await SessionUniqueService.getSessionsUniqueService({
      page: 0,
      size,
      sessionUserId: userId,
    });
    setRefreshing(false);
    if (status === 200) {
      setSessions(data);
    } else {
      setSessions(null);
    }
  };

  const onLoadMore = async () => {
    const totalPages = sessions.totalPages;
    const nextPage = page + 1;
    if (nextPage < totalPages) {
      setLoadMore(true);
      setPage(nextPage);
      const {
        data,
        status,
      } = await SessionUniqueService.getSessionsUniqueService({
        page: nextPage,
        size,
        sessionUserId: props.userId,
      });
      setLoadMore(false);
      data.items = [...sessions.items, ...data.items];
      setSessions(status === 200 ? data : SessionsDto);
    }
  };

  const onPressItem = (session) => {
    props.navigation.navigate("SessionUniqueDetails", { session });
  };

  useEffect(() => {
    if (props.userId) {
      getSessionsUser(props.userId);
    }
  }, []);

  return sessions ? (
    <SessionUniqueList
      key={props.numColumns}
      numColumns={props.numColumns}
      data={sessions}
      t={props.t}
      i18n={props.i18n}
      onPressItem={onPressItem}
      mode={props.mode}
      loadMoreSessionsRegular={onLoadMore}
      loadMore={loadMore}
      refreshing={refreshing}
    />
  ) : null;
}
