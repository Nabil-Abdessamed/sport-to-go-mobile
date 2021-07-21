import React, { useEffect, useState } from "react";
import SessionRegularList from "../session-regular/List";
import { SessionRegularService } from "../../services";

const SessionsDto = {
  page: 0,
  size: 20,
  itemsCount: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
};

export default function SessionsUserRegular(props) {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [sessions, setSessions] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const getSessionsUser = async (userId) => {
    setRefreshing(true);
    const filter = { sessionUserId: userId };
    const {
      data,
      status,
    } = await SessionRegularService.getSessionsRegularSearchService(
      0,
      size,
      filter
    );
    setRefreshing(false);
    if (status === 200) {
      setSessions(data);
    } else {
      setSessions(null);
    }
  };

  const onLoadMore = async () => {
    const filter = { sessionUserId: props.userId };
    const totalPages = sessions.totalPages;
    const nextPage = page + 1;
    if (nextPage < totalPages) {
      setLoadMore(true);
      setPage(nextPage);
      const {
        data,
        status,
      } = await SessionRegularService.getSessionsRegularSearchService(
        nextPage,
        size,
        filter
      );
      setLoadMore(false);
      data.items = [...sessions.items, ...data.items];
      setSessions(status === 200 ? data : SessionsDto);
    }
  };

  const onPressItem = (session) => {
    props.navigation.navigate("SessionRegularDetails", { session });
  };

  useEffect(() => {
    if (props.userId) {
      getSessionsUser(props.userId);
    }
  }, []);

  return sessions ? (
    <SessionRegularList
      key={props.numColumns}
      numColumns={props.numColumns}
      data={sessions}
      t={props.t}
      onPressItem={onPressItem}
      mode={props.mode}
      loadMoreSessionsRegular={onLoadMore}
      loadMore={loadMore}
      refreshing={refreshing}
    />
  ) : null;
}
