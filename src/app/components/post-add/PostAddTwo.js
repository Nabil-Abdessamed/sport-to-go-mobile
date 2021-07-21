import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import {
  STGContainer,
  STGButton,
  STGVideo,
  STGImageZoom,
  STGScrollView,
} from "stg-ui";
import ImagePicker from "react-native-image-picker";
import { savePostService } from "@services";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import _ from "lodash";
import { useNavigation, useRoute } from "@react-navigation/native";
import PostHelpers from "../post/Helpers";

export default function PostAddTwo() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [post, setPost] = useState({});
  const [tmpFile, setTmpFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [filetype, setFiletype] = useState(null);

  const save = async () => {
    setLoading(true);
    setLoadingText(t("post:add.loadingText"));
    const formdata = new FormData();
    if (tmpFile) {
      formdata.append("file", tmpFile);
    }
    for (let n in post) {
      if (post[n] !== null) {
        formdata.append(n, post[n]);
      }
    }
    const { status } = await savePostService(formdata);
    setLoading(false);
    setLoadingText("");
    if (_.inRange(status, 200, 300)) {
      PostHelpers.getPostsData();
      navigation.navigate("Post");
    } else {
      Alert.alert(
        t("post:add.alertErrorTitle"),
        t("post:add.alertErrorMessage"),
        [{ text: t("common:ok") }],
        { cancelable: false }
      );
    }
  };

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
          const filetype = tmpFile.type.substr(0, 5) || "video";
          setTmpFile(tmpFile);
          setFiletype(filetype);
        }
      }
    );
  };

  useEffect(() => {
    if (params && params.post) {
      setPost(params.post);
    }
  });

  return (
    <STGContainer loading={loading} loadingText={loadingText}>
      <STGScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <STGContainer>
          {tmpFile && filetype === "image" && (
            <STGImageZoom uri={tmpFile.uri} withZoom={true} />
          )}
          {tmpFile && filetype === "video" && (
            <STGVideo
              source={{
                uri: tmpFile.uri,
              }}
            />
          )}
          {!tmpFile && (
            <MaterialCommunityIcons
              name="image-size-select-large"
              size={100}
              color="rgba(0,0,0,06)"
              style={{ alignSelf: "center" }}
            />
          )}
        </STGContainer>
      </STGScrollView>
      <STGButton onPress={imagePicker} btnText={t("post:add.imageSelect")} />
      <STGButton onPress={save} btnText={t("common:save")} />
    </STGContainer>
  );
}
