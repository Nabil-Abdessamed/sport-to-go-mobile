import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import styles from "./style";
import gStyles from "../styles";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { STGContainer, STGBody } from "stg-ui";
import {
  getFollowedUsersService,
  getUsersProBySearchService,
  followUserService,
  unfollowUserService,
} from "@services";
import { getUsersProAction } from "@redux/actions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import validator from "validator";
import Item from "./Item";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";

const DefaultHeader = ({ navigation, handleShowSearch, t }) => (
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.headerBtn}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="ios-arrow-back" size={30} color="#000000" />
    </TouchableOpacity>
    <Text style={gStyles.headerTitle} ellipsizeMode="tail" numberOfLines={1}>
      {t(`proSpace:headerTitle`)}
    </Text>
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={styles.headerBtn} onPress={handleShowSearch}>
        <MaterialIcons name="search" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Entypo name="home" size={30} color="#000000" />
      </TouchableOpacity>
    </View>
  </View>
);
const SearchHeader = ({
  handleShowSearch,
  handleSearchInputChange,
  getUsersSearch,
  t,
}) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerBtn} onPress={handleShowSearch}>
      <Ionicons name="ios-arrow-back" size={30} color="#000000" />
    </TouchableOpacity>
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder={t("proSpace:inputSearch")}
        placeholderTextColor="rgba(255,255,255,0.4)"
        style={styles.headerSearchTextInput}
        onChangeText={handleSearchInputChange}
        autoFocus
        keyboardType="web-search"
        onSubmitEditing={getUsersSearch}
      />
    </View>
    <TouchableOpacity style={styles.headerBtn} onPress={getUsersSearch}>
      <MaterialIcons name="search" size={30} color="black" />
    </TouchableOpacity>
  </View>
);

export default function ProSpace() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Props from Redux
  const { usersPro } = useSelector((state) => state.users, shallowEqual);
  // States
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [usersProSearch, setUsersProSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const _handleShowSearch = () => {
    setShowSearchModal(!showSearchModal);
  };

  const _handleSearchInputChange = (text) => setSearchInput(text);

  const getUsersPro = async () => {
    setLoading(true);
    setLoadingText(t("proSpace:loadingText"));
    const { status, data } = await getFollowedUsersService();
    setLoading(false);
    setLoadingText("");
    if (status === 200) {
      dispatch(getUsersProAction(data));
    } else {
      dispatch(getUsersProAction([]));
    }
  };

  const getUsersSearch = async () => {
    if (!validator.isEmpty(searchInput)) {
      setLoading(true);
      setLoadingText(t("proSpace:loadingText"));
      const { data, status } = await getUsersProBySearchService(searchInput);
      setLoading(false);
      setLoadingText("");
      if (_.inRange(status, 200, 300)) {
        setUsersProSearch(data);
      } else {
        setUsersProSearch([]);
        Alert.alert(t("proSpace:error"), t("proSpace:errorMessage"));
      }
    }
  };

  useEffect(() => {
    getUsersPro();
  }, []);

  return (
    <>
      <STGContainer>
        <DefaultHeader
          navigation={navigation}
          handleShowSearch={_handleShowSearch}
          t={t}
        />
        <STGBody loading={loading} loadingText={loadingText}>
          <FlatList
            style={{ backgroundColor: "white" }}
            scrollEnabled={true}
            contentInsetAdjustmentBehavior="automatic"
            keyboardDismissMode={"none"}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={{
              marginBottom: 20,
              paddingVertical: 20,
              paddingHorizontal: 5,
            }}
            data={usersPro}
            keyExtractor={(_, index) => `userpro-${index}`}
            renderItem={({ item }) => (
              <Item
                item={item}
                onPress={() =>
                  navigation.navigate("ProfileShow", { user: item.userId })
                }
              />
            )}
          />
        </STGBody>
      </STGContainer>
      <Modal
        visible={showSearchModal}
        transparent
        animated
        animationType="fade"
        hardwareAccelerated={true}
        supportedOrientations={["portrait"]}
        onRequestClose={() => {
          setShowSearchModal(false);
          setUsersProSearch([]);
        }}
        onDismiss={() => setUsersProSearch([])}
      >
        <STGContainer>
          <SearchHeader
            navigation={navigation}
            handleShowSearch={_handleShowSearch}
            handleSearchInputChange={_handleSearchInputChange}
            getUsersSearch={getUsersSearch}
            t={t}
          />
          <FlatList
            style={{ backgroundColor: "white" }}
            contentInsetAdjustmentBehavior="automatic"
            keyboardDismissMode={"none"}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={{
              marginBottom: 20,
              paddingVertical: 20,
              paddingHorizontal: 5,
            }}
            data={usersProSearch}
            keyExtractor={(_, index) => `userpro-${index}`}
            renderItem={({ item }) => (
              <Item
                item={item}
                onPress={() => {
                  _handleShowSearch();
                  navigation.navigate("ProfileShow", { user: item.userId });
                }}
              />
            )}
          />
        </STGContainer>
      </Modal>
    </>
  );
}
