import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Picker,
  Platform,
} from "react-native";
import {
  STGContainer,
  STGImageZoom,
  STGButton,
  STGVideo,
  STGScrollViewBody,
  STGScrollView,
} from "stg-ui";
import gStyles from "@components/styles";
import Styles from "./Styles";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-picker";
import SpaceB2BService from "@services/SpaceB2BService";
import { BASE_URL } from "@config";
import Constants from "./Constants";
import { B2BType } from "./B2BType";
import { useNavigation, useRoute } from "@react-navigation/native";
import B2bHelpers from "./Helpers";

export default function Create() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [id, setId] = useState(null);
  const [type, setType] = useState(B2BType.AD);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [tmpFile, setTmpFile] = useState(null);
  const [tmpFileInfo, setTmpFileInfo] = useState(null);
  const [removeFile, setRemoveFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [mode, setMode] = useState(Constants.MODE_CREATE);
  const [filetype, setFiletype] = useState(null);
  const [changedFile, setChangedFile] = useState(false);

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
          if (mode === Constants.MODE_EDIT && changedFile === false) {
            setChangedFile(true);
          }
          const filetype = response.type.substr(0, 5) || null;
          setTmpFile(tmpFile);
          setTmpFileInfo({
            fileIsVertical: response.isVertical,
            fileHeight: response.height,
            fileWidth: response.width,
          });
          setFiletype(filetype);
          setRemoveFile(false);
        }
      }
    );
  };

  const save = async () => {
    if (!tmpFile && description.trim() === "") {
      return;
    }
    const formdata = new FormData();
    formdata.append("type", type);
    formdata.append("description", description.trim());
    if (tmpFile) {
      formdata.append("file", tmpFile);
      if (tmpFileInfo) {
        for (const fi in tmpFileInfo) {
          formdata.append(fi, tmpFileInfo[fi]);
        }
      }
    }
    setLoading(true);
    const { status, data } = await SpaceB2BService.save(formdata);
    setLoading(false);
    if (status === 201) {
      B2bHelpers.getB2bItems();
      navigation.goBack();
    }
  };

  const update = async () => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("type", type);
    formdata.append("description", description.trim());
    formdata.append("removeFile", removeFile);
    if (tmpFile !== null && changedFile === true) {
      formdata.append("file", tmpFile);
      if (tmpFileInfo) {
        for (const fi in tmpFileInfo) {
          formdata.append(fi, tmpFileInfo[fi]);
        }
      }
    }
    setLoading(true);
    const { status } = await SpaceB2BService.update(formdata);
    setLoading(false);
    if (status === 200) {
      B2bHelpers.getB2bItems();
      navigation.goBack();
    }
  };

  const onSubmit = () => {
    if (params.mode === Constants.MODE_EDIT) {
      update();
    } else {
      save();
    }
  };

  const getItem = async (id) => {
    const { data, status } = await SpaceB2BService.getItem(id);
    if (status === 200) {
      setId(data.id);
      setDescription(data.description);
      setType(data.type);
      setTmpFile(
        (data.file && { uri: `${BASE_URL}/upload/b2b/${data.file}` }) || null
      );
      setFiletype(
        (data.file && data.filetype && data.filetype.substr(0, 5)) || null
      );
    }
  };

  useEffect(() => {
    const willMount = navigation.addListener("focus", () => {
      const { mode, item } = params;
      setMode(mode);
      if (mode === Constants.MODE_EDIT) {
        getItem(item.id);
      }
    });
    return willMount;
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading} loadingText={loadingText}>
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.textInputTitle}>{t("b2b:type")}</Text>
              <Picker
                selectedValue={type}
                onValueChange={(type) => setType(type)}
                mode="dropdown"
              >
                <Picker.Item
                  label={t("b2b:equipment")}
                  value={B2BType.EQUIPMENT}
                />
                <Picker.Item label={t("b2b:ad")} value={B2BType.AD} />
                <Picker.Item label={t("b2b:sale")} value={B2BType.SALE} />
              </Picker>
              <Text style={gStyles.textInputTitle}>{t("b2b:description")}</Text>
              <TextInput
                multiline
                defaultValue={description}
                value={description}
                style={{
                  ...gStyles.textInput,
                  paddingVertical: 20,
                  lineHeight: 20,
                  borderBottomColor: descriptionError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("post:add.descriptionPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) => setDescription(value)}
              />
              {descriptionError && (
                <Text style={gStyles.helper}>{descriptionError}</Text>
              )}

              <Text style={[gStyles.textInputTitle, { marginBottom: 20 }]}>
                {t("b2b:imageSelect")}
              </Text>
              {tmpFile === null && (
                <TouchableOpacity
                  style={Styles.emptyImage}
                  onPress={imagePicker}
                >
                  <MaterialCommunityIcons
                    name="image-size-select-large"
                    size={100}
                    color="rgba(0,0,0,06)"
                  />
                </TouchableOpacity>
              )}
            </STGScrollViewBody>
            {tmpFile && (
              <View style={{ position: "relative" }}>
                {filetype === "image" && (
                  <STGImageZoom uri={tmpFile.uri} withZoom={true} />
                )}
                {filetype === "video" && (
                  <STGVideo
                    source={{ uri: tmpFile.uri }}
                    fullscreen={false}
                    disableFullscreen={true}
                    disableBack={true}
                  />
                )}
                <TouchableOpacity
                  style={Styles.btnDeleteImage}
                  onPress={() => {
                    setTmpFile(null);
                    setTmpFileInfo(null);
                    setRemoveFile(true);
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={30}
                    color="rgba(0,0,0,06)"
                  />
                </TouchableOpacity>
              </View>
            )}
            <STGButton
              btnText={
                mode === Constants.MODE_EDIT
                  ? t("common:update")
                  : t("common:save")
              }
              onPress={onSubmit}
              disabled={!tmpFile && description.trim() === ""}
            />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
