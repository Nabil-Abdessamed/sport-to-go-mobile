import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import {
  STGContainer,
  STGHeaderBack,
  STGFonts,
  STGColors,
  STGVideo,
  STGButton,
  STGImageZoom,
  STGScrollView,
} from "stg-ui";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createGalleryItemService } from "@services";
import ImagePicker from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const height = width * 0.5265;

export default function GalleryCreate() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // States
  const [tmpFile, setTmpFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const filetype =
    (tmpFile && tmpFile.type && tmpFile.type.substr(0, 5)) || "video";

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
          setTmpFile(tmpFile);
        }
      }
    );
  };

  const save = async () => {
    if (!tmpFile) {
      Alert.alert(
        t("mySpace:galleryAdd.alertErrorTitle"),
        t("mySpace:galleryAdd.alertErrorMessage")
      );
    } else {
      const formdata = new FormData();
      formdata.append("description", description);
      if (tmpFile) {
        formdata.append("file", tmpFile);
      }
      setLoading(true);
      setLoadingText(t("mySpace:galleryAdd.loadingText"));
      const { data, status } = await createGalleryItemService(formdata);
      setLoading(false);
      setLoadingText("");
      if (status === 200) {
        navigation.goBack();
      } else {
        Alert.alert(
          t("mySpace:galleryAdd.error"),
          t("mySpace:galleryAdd.errorMessage")
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading} loadingText={loadingText}>
        <STGScrollView>
          <STGContainer>
            <TextInput
              placeholder={t("mySpace:galleryAdd.descriptionPlaceholder")}
              style={styles.gcTextInput}
              multiline
              value={description}
              defaultValue={description}
              onChangeText={(text) => setDescription(text)}
            />
            {!tmpFile ? (
              <View style={styles.gcImageAdd}>
                <MaterialCommunityIcons
                  name="image-size-select-large"
                  size={100}
                  color="rgba(0,0,0,06)"
                />
              </View>
            ) : (
              <View style={styles.gcImageAddedContainer}>
                {filetype === "image" && <STGImageZoom uri={tmpFile.uri} />}
                {filetype === "video" && (
                  <STGVideo source={{ uri: tmpFile.uri }} />
                )}
                <TouchableOpacity
                  onPress={() => setTmpFile(null)}
                  style={styles.gcBtnCancelImage}
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
              onPress={imagePicker}
              btnText={t("event:add.imageSelect")}
            />
            <STGButton onPress={save} btnText={t("common:save")} />
          </STGContainer>
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gcTextInput: {
    width,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.2,
    marginVertical: 20,
    fontFamily: STGFonts.RobotoRegular,
  },
  gcImageAdd: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  gcImageAddedContainer: { flex: 1, paddingVertical: 20 },
  gcBtnCancelImage: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  gcBtnAdd: {
    backgroundColor: STGColors.container,
    width: width - 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderBottomColor: "rgba(255,255,255,0.2)",
    borderBottomWidth: 0.5,
    borderRadius: 6,
    marginTop: 20,
  },
  gcBtnAddText: {
    fontFamily: STGFonts.RobotoMedium,
  },
});
