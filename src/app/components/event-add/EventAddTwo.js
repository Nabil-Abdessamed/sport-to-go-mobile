import React, { useState, useEffect } from "react";
import { TouchableOpacity, Alert, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import {
  STGContainer,
  STGButton,
  STGImageZoom,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { saveEventService } from "@services";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import _ from "lodash";
import ImagePicker from "react-native-image-picker";
import STGVideo from "stg-ui/STGVideo";
import { useNavigation, useRoute } from "@react-navigation/native";
import EventHelpers from "../event/Helpers";
import Moment from "moment"

export default function EventAddTwo() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [event, setEvent] = useState({});
  const [tmpFile, setTmpFile] = useState(null);
  const [filetype, setFiletype] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const imagePicker = async () => {
    ImagePicker.showImagePicker(
      {
        noData: true,
        title: t("imagePicker:title"),
        takePhotoButtonTitle: t("imagePicker:takePhotoButtonTitle"),
        chooseFromLibraryButtonTitle: t(
          "imagePicker:chooseFromLibraryButtonTitle"
        ),
        cancelButtonTitle: t("imagePicker:cancelButtonTitle"),
        mediaType: "mixed",
      },
      (response) => {
        if (response.didCancel) {
          return null;
        } else {
          const tmpFile = {
            name: response.fileName,
            size: response.fileSize,
            type: response.type,
            uri: response.uri,
          };
          const filetype = (tmpFile && tmpFile.type.substr(0, 5)) || "video";
          setTmpFile(tmpFile);
          setFiletype(filetype);
        }
      }
    );
  };

  const save = async () => {
    setLoading(true);
    setLoadingText(t("event:add.loadingText"));
    const formData = new FormData();
    if (tmpFile) {
      formData.append("file", tmpFile);
    }
    const tmpEvent = _.clone(event);
    tmpEvent.date = Moment(event.date).format("YYYY-MM-DD");
    tmpEvent.timeStartAt = Moment(event.timeStartAt).format("HH:mm:ss");
    tmpEvent.timeEndAt = Moment(event.timeEndAt).format("HH:mm:ss");
    for (let e in tmpEvent) {
      if (tmpEvent[e] !== null) {
        formData.append(e, tmpEvent[e]);
      }
    }
    const { data, status } = await saveEventService(formData);
    setLoading(false);
    setLoadingText("");
    if (status === 201) {
      EventHelpers.getEvents();
      navigation.navigate("Event");
    } else {
      Alert.alert(
        t("event:add.alertErrorTitle"),
        t("event:add.alertErrorMessage"),
        [{ text: t("common:ok") }],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    const event = params.event;
    setEvent(event);
  }, []);

  return (
    <STGContainer loading={loading} loadingText={loadingText}>
      <STGScrollView>
        <STGContainer>
          <TouchableOpacity activeOpacity={0.8} onPress={imagePicker}>
            {tmpFile && filetype === "image" && (
              <STGImageZoom uri={tmpFile.uri} withZoom={false} />
            )}
            {tmpFile && filetype === "video" && (
              <STGVideo source={{ uri: tmpFile.uri }} />
            )}
            {!tmpFile && (
              <MaterialCommunityIcons
                name="image-size-select-large"
                size={100}
                color="rgba(0,0,0,06)"
                style={{
                  alignSelf: "center",
                }}
              />
            )}
          </TouchableOpacity>
        </STGContainer>
      </STGScrollView>
      <STGButton onPress={imagePicker} btnText={t("event:add.imageSelect")} />
      <STGButton onPress={save} btnText={t("common:save")} />
    </STGContainer>
  );
}
