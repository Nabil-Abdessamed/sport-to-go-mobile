import React, { useState } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import _ from "lodash";
import { STGButton, STGContainer, STGImageZoom, STGScrollView } from "stg-ui";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { saveSessionService, saveSessionService2 } from "@services";
import ImagePicker from "react-native-image-picker";
import moment from "moment";
import { useNavigation, StackActions } from "@react-navigation/native";
import SessionHelpers from "../session/Helpers";

export default function SessionAddFile() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // States
  const [tmpFile, setTmpFile] = useState(null);
  const [tmpFileInfo, setTmpFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  // Props from redux
  const { session } = useSelector((state) => state.session, shallowEqual);

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
          const tmpFileInfo = {
            height: response.height,
            width: response.width,
            isVertical: response.isVertical,
          };
          setTmpFile(tmpFile);
          setTmpFileInfo(tmpFileInfo);
        }
      }
    );
  };

  const _save = async () => {
    const formdata = new FormData();
    const data = _.clone(session);
    data.dateStartAt = moment(session.dateStartAt).format("YYYY-MM-DD");
    data.dateExpireAt = moment(session.dateExpireAt).format("YYYY-MM-DD");
    data.timeStartAt = moment(session.timeStartAt).format("HH:mm:ss");
    if (tmpFile) {
      formdata.append("file", tmpFile);
    }
    for (const s in data) {
      if (data[s] !== null) {
        formdata.append(s, data[s]);
      }
    }
    setLoadingText(t("post:add.loadingText"));
    setLoading(true);
    const response = await saveSessionService(formdata);
    setLoadingText("");
    setLoading(false);
    if (response.status === 201) {
      SessionHelpers.getSessionsPagination();
      Alert.alert(t("post:add.success"), t("post:add.successMessage"));
      navigation.dispatch(StackActions.pop(5));
    } else {
      Alert.alert(t("post:add.error"), t("post:add.errorMessage"));
    }
  };

  const save2 = async () => {
    const formdata = new FormData();
    formdata.append("title", "Test from Mobile");
    formdata.append("description", "Test from Mobile");
    formdata.append("places", "20");
    formdata.append("price", "123");
    formdata.append("country", "Tunisie");
    formdata.append("city", "Kebil SUD");
    formdata.append("address", "Bazma Kebili");
    formdata.append("date", "2020-09-16");
    formdata.append("time", "11:11:11");
    formdata.append("monday", "true");
    formdata.append("tuesday", "true");
    formdata.append("wednesday", "false");
    formdata.append("thursday", "true");
    formdata.append("friday", "true");
    formdata.append("saturday", "false");
    formdata.append("sunday", "false");
    formdata.append("file", tmpFile);
    formdata.append("fileHeight", tmpFileInfo.height);
    formdata.append("fileWidth", tmpFileInfo.width);
    formdata.append("fileIsVertical", tmpFileInfo.isVertical);
    const { data, status } = await saveSessionService2(formdata);
  };

  return (
    <STGContainer loading={loading} loadingText={loadingText}>
      <STGScrollView>
        <STGContainer>
          {tmpFile !== null ? (
            <STGImageZoom uri={tmpFile.uri} withZoom={false} />
          ) : (
            <MaterialCommunityIcons
              name="image-size-select-large"
              size={100}
              color="rgba(0,0,0,06)"
              style={{ alignSelf: "center" }}
            />
          )}
        </STGContainer>
      </STGScrollView>
      <STGButton onPress={imagePicker} btnText={t("session:add.imageSelect")} />
      <STGButton onPress={save2} btnText={t("common:save")} />
    </STGContainer>
  );
}
