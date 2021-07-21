import React, { useState, useEffect } from "react";
import {
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  PermissionsAndroid,
} from "react-native";
import { STGContainer } from "stg-ui";
import styles from "./style";
import { BASE_URL } from "@config";
import Pdf from "react-native-pdf";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RNFetchBlob from "rn-fetch-blob";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("screen");

export default function RegisterFive() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [structure, setStructure] = useState({});
  const [downloaded, setDownloaded] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  const getPermissions = async () => {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
  };

  const checkAndDownload = async () => {
    if (Platform.OS === "ios") {
      download();
    } else {
      const granted = await getPermissions();
      if (granted) {
        download();
      } else {
        Alert.alert(`Sport To Go`, t("register:permission"));
      }
    }
  };

  const download = () => {
    const data = params.data;
    const dirs = RNFetchBlob.fs.dirs.DownloadDir;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        mime: "application/pdf",
        path: `${dirs}/${data.filename}`,
        title: t("register:downloadingContract"),
        description: t("register:downloadingContract"),
      },
      path: `${dirs}/${data.filename}`,
      trusty: true,
    })
      .fetch("GET", `${BASE_URL}${data.path}`)
      .then((res) => {
        if (res.info().status === 200) {
          setDownloaded(true);
          Alert.alert(
            t("register:downloadingContract"),
            t("register:downloadingContract")
          );
        }
      });
  };

  const next = () => {
    if (downloaded === false) {
      Alert.alert(
        "Info",
        t("register:downloadContract"),
        [
          {
            text: t("register:download"),
            onPress: () => checkAndDownload(),
          },
          {
            text: t("register:later"),
            onPress: () => {
              navigation.navigate("RegisterSix", {
                structure,
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate("RegisterSix", {
        structure,
      });
    }
  };

  useEffect(() => {
    setStructure(params.structure);
    setTimeout(() => {
      setShowPdf(true);
    }, 1000);
  });

  return (
    <STGContainer>
      <Pdf
        source={{
          uri: showPdf ? `${BASE_URL}${params.data.path}` : "",
        }}
        style={{ flex: 1, width, height: height - 48 }}
      />
      <TouchableOpacity
        style={[styles.btn, styles.downloadBtn]}
        onPress={checkAndDownload}
      >
        <MaterialCommunityIcons name="download" size={32} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.nextBtn]} onPress={next}>
        <MaterialIcons name="navigate-next" size={32} color="#000" />
      </TouchableOpacity>
    </STGContainer>
  );
}
