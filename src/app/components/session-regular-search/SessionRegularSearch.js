import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Switch,
} from "react-native";
import {
  STGContainer,
  STGDatePicker,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import gStyles from "@components/styles";
import SessionTextInput from "../session-add-regular/SessionTextInput";
import HeaderRight from "./SessionReagularSearchHeader";
import { SessionRegularService } from "../../services";
import SessionRegularList from "../session-regular/List";
import SessionRegularStyles from "../session-regular/SessionRegularStyles";

function isEmpty(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

const SessionsDto = {
  page: 0,
  size: 20,
  itemsCount: 0,
  totalItems: 0,
  totalPages: 0,
  items: [],
};

export default function SessionRegularSearch() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [searchMode, setSearchMode] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [sessions, setSessions] = useState(null);
  const d1 = new Date();
  const d2 = new Date(d1.getTime());
  d2.setMonth(d2.getMonth() + 1);
  const [date1, setDate1] = useState(d1);
  const [date2, setDate2] = useState(d2);
  const [withDate, setWithDate] = useState(false);

  const getFilter = () => {
    const filter = {};
    if (title !== "") filter["title"] = title;
    if (country !== "") filter["country"] = country;
    if (city !== "") filter["city"] = city;
    if (address !== "") filter["address"] = address;
    if (withDate && date1 !== "" && date2 !== "") {
      filter["date1"] = date1;
      filter["date2"] = date2;
    }
    return filter;
  };

  const onPressSearchButton = async () => {
    const filter = getFilter();
    if (!isEmpty(filter)) {
      setSearchMode(1);
      setRefreshing(true);
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
    }
  };

  const onLoadMore = async () => {
    const filter = getFilter();
    if (!isEmpty(filter)) {
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
    }
  };

  const onPressItem = (session) => {
    navigation.navigate("SessionRegularDetails", { session });
  };

  const onPressItemUser = (item) => {
    user.id === item.userId
      ? navigation.navigate("MySpace")
      : navigation.navigate("ProfileShow", {
          user: item.userId,
        });
  };

  const changeSearchMode = () => {
    setSearchMode(searchMode === 0 ? 1 : 0);
    setSessions(null);
  };

  const handleChangeDate1 = (_, date) => {
    setDate1(date);
  };

  const handleChangeDate2 = (_, date) => {
    setDate2(date);
  };

  navigation.setOptions({
    headerRight: () => (
      <HeaderRight
        t={t}
        onPressSearchButton={onPressSearchButton}
        searchMode={searchMode}
        changeSearchMode={changeSearchMode}
      />
    ),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer>
        {searchMode === 1 ? (
          <View style={SessionRegularStyles.resultContainer}>
            {sessions && sessions.items.length === 0 ? (
              <View style={SessionRegularStyles.emptyResultContainer}>
                <Text style={SessionRegularStyles.emptyResultText}>
                  {t("common:searchEmpty")}
                </Text>
              </View>
            ) : (
              <SessionRegularList
                numColumns={2}
                data={sessions}
                t={t}
                onPressItemUser={onPressItemUser}
                onPressItem={onPressItem}
                mode={"GRID"}
                loadMoreSessionsRegular={onLoadMore}
                loadMore={loadMore}
                refreshing={refreshing}
              />
            )}
          </View>
        ) : (
          <STGScrollView>
            <STGScrollViewBody>
              {/* Title */}
              <SessionTextInput
                value={title}
                setValue={setTitle}
                title={t("session:add.sportNamePlaceholder")}
                placeholder={t("session:add.sportNamePlaceholder")}
              />
              {/* Address */}
              <SessionTextInput
                value={country}
                setValue={setCountry}
                title={t("session:add.countryPlaceholder")}
                placeholder={t("session:add.countryPlaceholder")}
              />
              <SessionTextInput
                value={city}
                setValue={setCity}
                title={t("session:add.cityPlaceholder")}
                placeholder={t("session:add.cityPlaceholder")}
              />
              <SessionTextInput
                value={address}
                setValue={setAddress}
                title={t("session:add.addressPlaceholder")}
                placeholder={t("session:add.addressPlaceholder")}
              />
              {/* Date */}
              <View
                style={SessionRegularStyles.searchDateContainer}
              >
                <Text
                  style={SessionRegularStyles.searchDateText}
                >
                  {t("common:date")}
                </Text>
                <Switch
                  value={withDate}
                  onValueChange={(value) => setWithDate(value)}
                />
              </View>
              {withDate && (
                <>
                  <Text style={gStyles.textInputTitle}>
                    {t("common:startDate")}
                  </Text>
                  <STGDatePicker
                    attr="date1"
                    value={date1}
                    handleChangeInput={handleChangeDate1}
                    t={t}
                    dateMode="date"
                    dateFormat="dddd, DD MMM YYYY"
                  />
                  <Text style={gStyles.textInputTitle}>
                    {t("common:endDate")}
                  </Text>
                  <STGDatePicker
                    attr="date2"
                    value={date2}
                    handleChangeInput={handleChangeDate2}
                    t={t}
                    dateMode="date"
                    dateFormat="dddd, DD MMM YYYY"
                    minimumDate={date1}
                  />
                </>
              )}
            </STGScrollViewBody>
          </STGScrollView>
        )}
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
