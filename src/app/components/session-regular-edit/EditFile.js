import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-picker";
import { BASE_URL } from "../../config";
import EditFormContainer from "./EditFormContainer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

const initialProps = {
  t: () => {},
  navigation: {},
  isImage: false,
  onImageButtonPress: () => {},
  isMap: false,
  onMapButtonPress: () => {},
  onSaveButtonPress: () => {},
  data: null,
};

export default function SessionRegularEditFile(props = initialProps) {
  const [sessionFile, setSessionFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileDimensions, setFileDimensions] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const renderImageDimensions = (data) => {
    if (data.isVertical) {
      if (data.width > width) {
        const percent = (((data.width - width) * 100) / data.width) * 0.01;
        setFileDimensions({
          width,
          height: data.height * (1 - percent),
        });
      }
    } else {
      setFileDimensions({
        width,
        height: imageHeight,
      });
    }
  };

  const onImageButtonPress = () => {
    ImagePicker.showImagePicker(
      {
        noData: true,
        title: props.t("imagePicker:title"),
        takePhotoButtonTitle: props.t("imagePicker:takePhotoButtonTitle"),
        chooseFromLibraryButtonTitle: props.t(
          "imagePicker:chooseFromLibraryButtonTitle"
        ),
        cancelButtonTitle: props.t("imagePicker:cancelButtonTitle"),
        mediaType: "mixed",
      },
      (response) => {
        if (response.didCancel) {
          return null;
        } else {
          const file = {
            name: response.fileName,
            size: response.fileSize,
            type: response.type,
            uri: response.uri,
          };
          const fileInfo = {
            height: response.height,
            width: response.width,
            isVertical: response.isVertical,
          };
          setSessionFile(null);
          setFile(file);
          setFileInfo(fileInfo);
          renderImageDimensions(fileInfo);
        }
      }
    );
  };

  const onPressSessionFileRemove = () => {
    setSessionFile(null);
  };

  const onPressFileRemove = () => {
    setFile(null);
  };

  const save = () => {
    if (file && fileInfo) {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("width", fileInfo.width);
      formdata.append("height", fileInfo.height);
      formdata.append("isVertical", fileInfo.isVertical);
      props.onSaveButtonPress(formdata);
    } else {
      props.onSaveButtonPress(null);
    }
  };

  useEffect(() => {
    if (props.data) {
      const dim = {
        width: props.data.fileWidth,
        height: props.data.fileHeight,
        isVertical: props.data.fileIsVertical,
      };
      setSessionFile(props.data);
      renderImageDimensions(dim);
    }
  }, []);

  return (
    <EditFormContainer
      t={props.t}
      navigation={props.navigation}
      isImage={true}
      onImageButtonPress={onImageButtonPress}
      onSaveButtonPress={save}
    >
      {sessionFile && (
        <View style={styles.container}>
          <ScrollView>
            <FastImage
              source={{
                uri: BASE_URL.concat(
                  sessionFile.filePath.replace("public", "")
                ),
              }}
              style={fileDimensions}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={onPressSessionFileRemove}
              style={styles.closeButton}
            >
              <MaterialCommunityIcons
                accessibilityRole="text"
                name="close"
                size={32}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      {file && (
        <View style={styles.container}>
          <FastImage
            source={{
              uri: file.uri,
            }}
            style={fileDimensions}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={onPressFileRemove}
            style={styles.closeButton}
          >
            <MaterialCommunityIcons
              accessibilityRole="text"
              name="close"
              size={32}
            />
          </TouchableOpacity>
        </View>
      )}
      {!sessionFile && !file && (
        <View style={styles.container}>
          <MaterialCommunityIcons
            accessibilityRole="text"
            name="image-outline"
            size={256}
          />
        </View>
      )}
    </EditFormContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
