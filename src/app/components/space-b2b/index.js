import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Alert } from "react-native";
import { STGContainer, STGBody, STGActionSheet } from "stg-ui";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import SpaceB2BService from "@services/SpaceB2BService";
import Header from "./Header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Constants from "./Constants";
import Item from "./Item";
import ItemCheckerboard from "./ItemCheckerboard";
import Styles from "../styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { setB2bItemsAction } from "@redux/actions";

export default function SpaceB2B() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { params } = useRoute();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { items } = useSelector((state) => state.b2b, shallowEqual);
  // States
  // const [items, setItems] = useState([]);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mode, setMode] = useState(Constants.MODE_GRID);

  const numColumns = mode === Constants.MODE_GRID ? 2 : 1;

  const getItems = async () => {
    setRefreshing(true);
    const response = await SpaceB2BService.getItems();
    setRefreshing(false);
    if (response.status === 200) {
      dispatch(setB2bItemsAction(response.data));
    } else {
      dispatch(setB2bItemsAction([]));
    }
  };

  const getItemsBySearch = async (type, description) => {
    setRefreshing(true);
    const response = await SpaceB2BService.getItemsBySearch(type, description);
    setRefreshing(false);
    if (response.status === 200) {
      dispatch(setB2bItemsAction(response.data));
    } else {
      dispatch(setB2bItemsAction([]));
    }
  };

  const create = () => {
    navigation.navigate("SpaceB2BCreate", {
      mode: Constants.MODE_CREATE,
    });
  };

  const onPressItem = (item) => {
    navigation.navigate("SpaceB2BDetails", { item });
  };

  const onPressItemActions = (item) => {
    setActionsVisible(true);
    setSelectedItem(item);
  };

  const hideItemActions = () => {
    setActionsVisible(false);
    setSelectedItem(null);
  };

  const onPressEdit = () => {
    if (selectedItem) {
      setActionsVisible(false);
      navigation.navigate("SpaceB2BCreate", {
        mode: Constants.MODE_EDIT,
        item: selectedItem,
      });
    }
  };

  const deleteItem = async (item) => {
    setActionsVisible(false);
    const response = await SpaceB2BService.remove(item.id);
    if (response.status === 200) {
      getItems();
    }
    if (response.status === 404) {
      Alert.alert("Error Not found", "B2B not found");
    }
    if (response.status === 500) {
      Alert.alert("Error Server", "Server Error");
    }
  };

  const onPressDelete = (item) => {
    Alert.alert(
      t("b2b:deleteTitle"),
      t("b2b:deleteMessage"),
      [
        {
          text: t("common:yes"),
          onPress: () => deleteItem(item),
          style: "destructive",
        },
        {
          text: t("common:no"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const onPressShow = () => {
    setActionsVisible(false);
    setSelectedItem(selectedItem);
  };

  const onPressUser = (item) => {
    const owner = item.userId === user.id ? true : false;
    if (owner) {
      navigation.navigate("MySpace");
    } else {
      navigation.navigate("ProfileShow", {
        user: item.userId,
      });
    }
  };

  const handleChangeMode = () => {
    if (mode === Constants.MODE_GRID) {
      setMode(Constants.MODE_LIST);
    } else {
      setMode(Constants.MODE_GRID);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <STGContainer>
        <Header
          navigation={navigation}
          create={create}
          mode={mode}
          handleChangeMode={handleChangeMode}
        />
        <STGBody>
          <FlatList
            key={items ? numColumns + items.length : numColumns}
            numColumns={numColumns}
            keyExtractor={(_, key) => `item-key-${key}`}
            data={items}
            renderItem={({ item }) =>
              mode === Constants.MODE_GRID ? (
                <ItemCheckerboard
                  item={item}
                  navigation={navigation}
                  onPressItem={() => onPressItem(item)}
                  onPressActions={() => onPressItemActions(item)}
                  t={t}
                />
              ) : (
                <Item
                  item={item}
                  onPressItem={() => onPressItem(item)}
                  onPressActions={() => onPressItemActions(item)}
                  onPressUser={() => onPressUser(item)}
                  t={t}
                />
              )
            }
            ItemSeparatorComponent={() => (
              <View style={{ height: 5, backgroundColor: "ghostwhite" }} />
            )}
            refreshing={refreshing}
            onRefresh={() => {
              getItems();
            }}
            ListHeaderComponent={() => {
              return items && items.length === 0 ? (
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
        isVisible={actionsVisible}
        hide={hideItemActions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("b2b:show"),
            onPress: () => onPressShow(selectedItem),
            icon: <MaterialIcons name="pageview" size={28} />,
          },
          {
            title: t("b2b:edit"),
            onPress: () => onPressEdit(selectedItem),
            icon: <FontAwesome5 name="edit" size={28} />,
          },
          {
            title: t("b2b:delete"),
            onPress: () => onPressDelete(selectedItem),
            icon: <FontAwesome5 name="trash-alt" size={28} />,
          },
        ]}
      />
    </>
  );
}
