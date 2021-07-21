import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { STGContainer } from "stg-ui";
import SessionRegularEditPrice from "./EditPrice";
import SessionRegularEditTitle from "./EditTitle";
import SessionRegularEditPlaces from "./EditPlaces";
import SessionRegularEditDate from "./EditDate";
import SessionRegularEditAddress from "./EditAddress";
import SessionRegularEditFile from "./EditFile";
import SessionRegularEditLocation from "./EditLocation";
import { setCreateSession } from "@redux/actions";
import { useDispatch } from "react-redux";
import { SessionFileService, SessionRegularService } from "../../services";
import SessionRegularEditRecurrence from "./EditRecurrences";
import LoadingScreen from "./LoadingScreen";

const initialProps = {};

export default function SessionRegularEdit(props = initialProps) {
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
    } = await SessionRegularService.editSessionRegularService(
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

  const onPressSaveEditRecurrences = async (formdata) => {
    setDisableButton(true);
    const {
      data,
      status,
    } = await SessionRegularService.editSessionRegularRecurrencesService(
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
    const {
      status,
      data,
    } = await SessionRegularService.getSessionRegularService(id);
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
    } = await SessionRegularService.editSessionRegularFileService(
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
          <SessionRegularEditDate
            dateStartAt={params.data.dateStartAt}
            dateExpireAt={params.data.dateExpireAt}
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
      case "recurrences":
        return (
          <SessionRegularEditRecurrence
            data={params.data}
            t={t}
            navigation={navigation}
            onSaveButtonPress={onPressSaveEditRecurrences}
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
