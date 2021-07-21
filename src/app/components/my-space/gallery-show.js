import React, { useState, useEffect } from "react";
import { Text, ScrollView, Alert, View } from "react-native";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@config";
import {
  STGContainer,
  STGVideo,
  STGImageZoom,
  STGHeaderBack,
  STGActionSheet,
} from "stg-ui";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import GalleryService from "@services/Gallery";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GalleryShow() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [item, setItem] = useState({});
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const showOptions = () => {
    setOptionsVisible(true);
  };

  const hideOptions = () => {
    setOptionsVisible(false);
  };

  const deleteItem = async () => {
    const { status } = await GalleryService.deleteGalleryItemService(item.id);
    if (status === 200) {
      Alert.alert("", t("gallery:deleteSuccess"));
      navigation.goBack();
    } else {
      Alert.alert("", t("gallery:deleteError"));
    }
  };

  const onPressDelete = () => {
    Alert.alert(
      "",
      t("gallery:deleteMessage"),
      [
        {
          text: t("common:yes"),
          style: "destructive",
          onPress: () => {
            hideOptions();
            deleteItem();
          },
        },
        {
          text: t("common:no"),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    setItem(params.item);
  }, []);

  const onVideoBackPress = () => {
    navigation.goBack();
  };

  const onVideoFullscreenEnter = () => {
    setFullscreen(true);
  };

  const onVideoFullscreenExit = () => {
    setFullscreen(false);
  };

  const type = item && item.filetype && item.filetype.substr(0, 5);
  const path = `${BASE_URL}/upload/gallery/${item.file}`;

  return (
    <>
      <STGContainer style={{ position: "relative" }}>
        <>
          {!fullscreen && (
            <STGHeaderBack
              navigation={navigation}
              hasOptions={Number(item.owner) === 1}
              onPressShowOptions={showOptions}
            />
          )}
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {!fullscreen && item.description !== "" && (
              <Text style={styles.itemShowDescription}>{item.description}</Text>
            )}
            {!fullscreen && item.description === "" && (
              <View style={{ marginTop: 20 }} />
            )}
            {type === "image" && <STGImageZoom uri={path} />}
            {type === "video" && (
              <STGVideo
                source={{
                  uri: path,
                }}
                fullscreen={fullscreen}
                fullscreenShowButton={true}
                disableBack={false}
                onVideoBackPress={onVideoBackPress}
                onVideoFullscreenEnter={onVideoFullscreenEnter}
                onVideoFullscreenExit={onVideoFullscreenExit}
              />
            )}
          </ScrollView>
        </>
      </STGContainer>
      <STGActionSheet
        isVisible={optionsVisible}
        hide={hideOptions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: t("gallery:delete"),
            onPress: onPressDelete,
            icon: <FontAwesome5 name="trash-alt" size={20} />,
          },
        ]}
      />
    </>
  );
}
