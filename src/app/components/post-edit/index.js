import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  STGContainer,
  STGButton,
  STGImageZoom,
  STGVideo,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import gStyles from "@components/styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker";
import { BASE_URL } from "@config";
import Validation from "../post-add/validation";
import { updatePostService } from "@services";
import _ from "lodash";
import { useNavigation, useRoute } from "@react-navigation/native";
import PostHelpers from "../post/Helpers";

export default function PostEdit() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [post, setPost] = useState({});
  const [tmpFile, setTmpFile] = useState(null);
  const [filetype, setFiletype] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [changedFile, setChangedFile] = useState(false);

  const imagePicker = () => {
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
          setTmpFile(tmpFile);
          const filetype = response.type.substr(0, 5);
          setFiletype(filetype);
          if (!changedFile) {
            setChangedFile(true);
          }
        }
      }
    );
  };

  const handleChangeText = (key, value) => {
    const p = _.clone(post);
    p[key] = value;
    setPost(p);
  };

  const save = async () => {
    const descriptionError = Validation.validateDescription(post.article, t);
    if (descriptionError) {
      setDescriptionError(descriptionError);
    } else {
      setLoading(true);
      setLoadingText(t("post:edit.loadingText"));
      const formdata = new FormData();
      if (tmpFile && changedFile) {
        formdata.append("file", tmpFile);
      } else {
        if (removeImage) {
          formdata.append("removeFile", true);
        } else {
          formdata.append("removeFile", false);
        }
      }
      for (let n in post) {
        if (post[n] !== null) {
          formdata.append(n, post[n]);
        }
      }
      const { data, status } = await updatePostService(formdata);
      setLoading(false);
      setLoadingText("");
      if (_.inRange(status, 200, 300)) {
        Alert.alert(
          t("post:edit.success"),
          t("post:edit.successMessage"),
          [
            {
              text: t("common:ok"),
            },
          ],
          { cancelable: false }
        );
        PostHelpers.getPostsData();
        navigation.navigate("Post");
      } else {
        Alert.alert(
          t("post:edit.error"),
          t("post:edit.errorMessage"),
          [
            {
              text: t("common:tryAgain"),
            },
          ],
          { cancelable: false }
        );
      }
    }
  };

  useEffect(() => {
    const p = params && params.post;
    const tmpFile = p.image
      ? {
          uri: `${BASE_URL}/upload/posts/${p.image}`,
        }
      : null;
    const filetype = (p && p.filetype && p.filetype.substr(0, 5)) || null;
    setPost(p);
    setTmpFile(tmpFile);
    setFiletype(filetype);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading} loadingText={loadingText}>
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              {/* Description */}
              <Text style={gStyles.textInputTitle}>
                {t("post:add.description")}
              </Text>
              <TextInput
                autoCapitalize="none"
                multiline
                autoFocus={true}
                defaultValue={post.article}
                value={post.article}
                placeholder={t("event:add.descriptionPlaceholder")}
                onChangeText={(text) => handleChangeText("article", text)}
                style={[
                  gStyles.textInput,
                  {
                    borderBottomColor: descriptionError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                    marginTop: 20,
                  },
                ]}
              />
              {descriptionError && (
                <Text style={gStyles.helper}>{descriptionError}</Text>
              )}

              {/* Image */}
              <Text style={gStyles.textInputTitle}>{t("post:edit.image")}</Text>
            </STGScrollViewBody>
            {tmpFile ? (
              <View>
                <TouchableOpacity
                  style={gStyles.imageBtnClose}
                  onPress={() => {
                    setTmpFile(null);
                    setRemoveImage(true);
                  }}
                >
                  <FontAwesome name="close" size={28} />
                </TouchableOpacity>
                {filetype === "image" && (
                  <STGImageZoom uri={tmpFile.uri} withZoom={true} />
                )}
                {filetype === "video" && (
                  <STGVideo source={{ uri: tmpFile.uri }} />
                )}
                <TouchableOpacity
                  onPress={imagePicker}
                  style={{ marginVertical: 10 }}
                >
                  <Text
                    style={[gStyles.imageSelectText, { alignSelf: "center" }]}
                  >
                    {t("event:add.imageSelect")}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={gStyles.imageContainer}>
                <View style={[gStyles.image, gStyles.imageContainer]}>
                  <MaterialCommunityIcons
                    name="image-size-select-large"
                    size={100}
                    color="rgba(0,0,0,0.6)"
                  />
                </View>
                <TouchableOpacity
                  onPress={imagePicker}
                  style={{ marginVertical: 10 }}
                >
                  <Text style={gStyles.imageSelectText}>
                    {t("event:add.imageSelect")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <STGButton onPress={save} btnText={t("common:save")} />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
