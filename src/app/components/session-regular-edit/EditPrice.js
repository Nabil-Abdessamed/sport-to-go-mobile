import React, { useState } from "react";
import SessionTextInput from "../session-add-regular/SessionTextInput";
import EditFormContainer from "./EditFormContainer";
import SessionValidator from "../session-add/validation";
import { STGScrollView, STGScrollViewBody } from "stg-ui";

const initialProps = {
  t: () => {},
  onSaveButtonPress: () => {},
  price: "",
  navigation: {},
};

export default function SessionRegularEditPrice(props = initialProps) {
  const { t } = props;
  const [price, setPrice] = useState(props.price);
  const [priceError, setPriceError] = useState(null);

  const save = () => {
    const priceError = SessionValidator.validatePrice(price, t);
    setPriceError(priceError);
    if (priceError === null) {
      props.onSaveButtonPress({ price });
    }
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <STGScrollView>
        <STGScrollViewBody>
          <SessionTextInput
            value={price}
            setValue={setPrice}
            title={t("session:add.pricePlaceholder")}
            placeholder={t("session:add.pricePlaceholder")}
            error={priceError}
            keyboardType="decimal-pad"
          />
        </STGScrollViewBody>
      </STGScrollView>
    </EditFormContainer>
  );
}
