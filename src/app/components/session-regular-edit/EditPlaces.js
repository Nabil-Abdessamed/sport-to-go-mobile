import React, { useState } from "react";
import { STGScrollView, STGScrollViewBody } from "stg-ui";
import SessionTextInput from "../session-add-regular/SessionTextInput";
import EditFormContainer from "./EditFormContainer";
import SessionValidator from "../session-add/validation";

const initialProps = {
  t: () => {},
  onSaveButtonPress: () => {},
  places: "",
  navigation: {},
};

export default function SessionRegularEditPlaces(props = initialProps) {
  const { t } = props;
  const [places, setPlaces] = useState(props.places);
  const [placesError, setPlacesError] = useState(null);

  const save = () => {
    const placesError = SessionValidator.validatePlaces(places, t);
    setPlacesError(placesError);
    if(placesError === null) {
      props.onSaveButtonPress({ places });
    }
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <STGScrollView>
        <STGScrollViewBody>
          <SessionTextInput
            value={places}
            setValue={setPlaces}
            title={t("session:add.placesPlaceholder")}
            placeholder={t("session:add.placesPlaceholder")}
            error={placesError}
            keyboardType="decimal-pad"
          />
        </STGScrollViewBody>
      </STGScrollView>
    </EditFormContainer>
  );
}
