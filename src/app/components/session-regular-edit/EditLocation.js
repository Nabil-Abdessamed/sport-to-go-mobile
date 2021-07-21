import React, { useState } from "react";
import { STGFullMap, STGPictoMap } from "stg-ui";
import SessionMaps from "../session-maps/SessionMaps";
import EditFormContainer from "./EditFormContainer";

const initialProps = {
  t: () => {},
  navigation: {},
  isImage: false,
  onImageButtonPress: () => {},
  isMap: false,
  onMapButtonPress: () => {},
  onSaveButtonPress: () => {},
  latitude: null,
  longitude: null,
};

export default function SessionRegularEditLocation(props = initialProps) {
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);
  const [location, setLocation] = useState(null);
  const [locationVisible, setLocationVisible] = useState(false);
  const [newLocationVisible, setNewLocationVisible] = useState(false);

  const handleShowHideLocation = () => {
    setLocationVisible(!locationVisible);
  };

  const handleNewLocationVisible = () => {
    setNewLocationVisible(!newLocationVisible);
  };

  const onPressMap = (location) => {
    setLocation(location);
    setLatitude(location.latitude);
    setLongitude(location.longitude);
  };

  const save = () => {
    props.onSaveButtonPress({ location });
  };

  return (
    <EditFormContainer
      t={props.t}
      navigation={props.navigation}
      isMap={true}
      onMapButtonPress={handleNewLocationVisible}
      onSaveButtonPress={save}
    >
      {latitude && longitude && (
        <>
          <STGPictoMap
            latitude={latitude}
            longitude={longitude}
            regionLatitude={latitude}
            regionLongitude={longitude}
            onPressFullscreen={handleShowHideLocation}
          />
          <STGFullMap
            show={locationVisible}
            hideMap={handleShowHideLocation}
            latitude={latitude}
            longitude={longitude}
            regionLatitude={latitude}
            regionLongitude={longitude}
          />
        </>
      )}
      <SessionMaps
        visible={newLocationVisible}
        location={location}
        onPressMap={onPressMap}
        onRequestClose={handleNewLocationVisible}
      />
    </EditFormContainer>
  );
}
