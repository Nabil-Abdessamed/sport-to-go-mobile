import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { STGContainer } from "stg-ui";
import { setCreateSession } from "@redux/actions";
import { useDispatch } from "react-redux";
import SessionRegularEditPrice from "../session-regular-edit/EditPrice";
import SessionRegularEditTitle from "../session-regular-edit/EditTitle";
import SessionRegularEditPlaces from "../session-regular-edit/EditPlaces";
import SessionUniqueEditDate from "./EditDate";
import SessionRegularEditAddress from "../session-regular-edit/EditAddress";
import SessionRegularEditFile from "../session-regular-edit/EditFile";
import SessionRegularEditLocation from "../session-regular-edit/EditLocation";
import LoadingScreen from "../session-regular-edit/LoadingScreen";
import { SessionFileService, SessionUniqueService } from "../../services";

const initialProps = {};

export default function SessionUniqueEdit(props = initialProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = useState(false);

  const onPressSave = async (formdata) => {
    setDisableButton(true);
    const {
      data,
      status,
    } = await SessionUniqueService.editSessionUniqueService(
      params.sessionId,
      formdata
    );
    setDisableButton(false);
    if (status === 200) {
      dispatch(setCreateSession(data));
      navigation.goBack();
      Alert.alert(t("session:edit.success"), t("session:edit.successMessage"));
    } else {
      Alert.alert(t("session:edit.error"), t("session:edit.errorMessage"));
    }
  };

  const getSessionAfterEdit = async (id) => {
    const { status, data } = await SessionUniqueService.getSessionUniqueService(
      id
    );
    if (status === 200) {
      return data;
    }
    return null;
  };

  const editFile = async (formdata) => {
    setDisableButton(true);
    const { data, status } = await SessionFileService.editSessionFile(
      params.data.fileId,
      formdata
    );
    if (status === 200) {
      const session = await getSessionAfterEdit(params.sessionId);
      setDisableButton(false);
      dispatch(setCreateSession(session));
      navigation.goBack();
      Alert.alert(t("session:edit.success"), t("session:edit.successMessage"));
    } else {
      setDisableButton(false);
      Alert.alert(t("session:edit.error"), t("session:edit.errorMessage"));
    }
  };

  const saveFile = async (formdata) => {
    setDisableButton(true);
    const {
      data,
      status,
    } = await SessionUniqueService.editSessionUniqueFileService(
      params.sessionId,
      formdata
    );
    setDisableButton(false);
    if (status === 201) {
      dispatch(setCreateSession(data));
      navigation.goBack();
      Alert.alert(t("session:edit.success"), t("session:edit.successMessage"));
    } else {
      Alert.alert(t("session:edit.error"), t("session:edit.errorMessage"));
    }
  };

  const deleteFile = async (id) => {
    setDisableButton(true);
    const { status } = await SessionFileService.removeSessionFile(id);
    if (status < 300) {
      const session = await getSessionAfterEdit(params.sessionId);
      setDisableButton(false);
      dispatch(setCreateSession(session));
      navigation.goBack();
      Alert.alert(t("session:edit.success"), t("session:edit.successMessage"));
    } else {
      setDisableButton(false);
      Alert.alert(t("session:edit.error"), t("session:edit.errorMessage"));
    }
  };

  const onPressSaveFile = (formdata) => {
    if (params && params.data && params.data.fileId && formdata === null) {
      deleteFile(params.data.fileId);
    } else if (formdata != null && params.data) {
      editFile(formdata);
    } else if (formdata != null && !params.data) {
      saveFile(formdata);
    }
  };

  const initFieldsToEdit = () => {
    switch (params.fields) {
      case "price":
        return (
          <SessionRegularEditPrice
            price={params.data.price}
            t={t}
            navigation={navigation}
            onSaveButtonPress={onPressSave}
          />
        );
      case "title":
        return (
          <SessionRegularEditTitle
            t={t}
            title={params.data.title}
            description={params.data.description}
            navigation={navigation}
            onSaveButtonPress={onPressSave}
          />
        );
      case "places":
        return (
          <SessionRegularEditPlaces
            places={params.data.places}
            t={t}
            navigation={navigation}
            onSaveButtonPress={onPressSave}
          />
        );
      case "date":
        return (
          <SessionUniqueEditDate
            date={params.data.date}
            timeStartAt={params.data.timeStartAt}
            timeEndAt={params.data.timeEndAt}
            t={t}
            navigation={navigation}
            onSaveButtonPress={onPressSave}
          />
        );
      case "address":
        return (
          <SessionRegularEditAddress
            country={params.data.country}
            city={params.data.city}
            address={params.data.address}
            t={t}
            navigation={navigation}
            onSaveButtonPress={onPressSave}
          />
        );
      case "file":
        return (
          <SessionRegularEditFile
            t={t}
            onSaveButtonPress={onPressSaveFile}
            navigation={navigation}
            isImage={true}
            data={params.data}
          />
        );
      case "location":
        return (
          <SessionRegularEditLocation
            t={t}
            onSaveButtonPress={onPressSave}
            navigation={navigation}
            isMap={true}
            latitude={params.data.latitude}
            longitude={params.data.longitude}
          />
        );
      default:
        return null;
    }
  };

  return (
    <STGContainer>
      {initFieldsToEdit()}
      {disableButton && <LoadingScreen />}
    </STGContainer>
  );
}
