import React, { useState } from "react";
import SessionTextInput from "../session-add-regular/SessionTextInput";
import EditFormContainer from "./EditFormContainer";
import SessionValidator from "../session-add/validation";
import { STGScrollView, STGScrollViewBody } from "stg-ui";

const initialProps = {
  t: () => {},
  onSaveButtonPress: () => {},
  country: "",
  city: "",
  address: "",
  navigation: {},
};

export default function SessionRegularEditAddress(props = initialProps) {
  const { t } = props;
  const [country, setCountry] = useState(props.country);
  const [countryError, setCountryError] = useState(null);
  const [city, setCity] = useState(props.city);
  const [cityError, setCityError] = useState(null);
  const [address, setAddress] = useState(props.address);

  const save = () => {
    const countryError = SessionValidator.validateCountry(country, t);
    setCountryError(countryError);
    const cityError = SessionValidator.validateCity(city, t);
    setCityError(cityError);
    if (countryError == null && cityError == null) {
      props.onSaveButtonPress({ country, city, address });
    }
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <STGScrollView>
        <STGScrollViewBody>
          <SessionTextInput
            value={country}
            setValue={setCountry}
            title={t("session:add.countryPlaceholder")}
            placeholder={t("session:add.countryPlaceholder")}
            error={countryError}
          />
          <SessionTextInput
            value={city}
            setValue={setCity}
            title={t("session:add.cityPlaceholder")}
            placeholder={t("session:add.cityPlaceholder")}
            error={cityError}
          />
          <SessionTextInput
            value={address}
            setValue={setAddress}
            title={t("session:add.addressPlaceholder")}
            placeholder={t("session:add.addressPlaceholder")}
          />
        </STGScrollViewBody>
      </STGScrollView>
    </EditFormContainer>
  );
}
