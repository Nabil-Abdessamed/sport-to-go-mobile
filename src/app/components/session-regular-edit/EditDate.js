import React, { useState } from "react";
import { Text } from "react-native";
import { STGDatePicker, STGScrollView, STGScrollViewBody } from "stg-ui";
import gStyles from "@components/styles";
import EditFormContainer from "./EditFormContainer";
import Moment from "moment";
import SessionValidator from "../session-add/validation";

const initialProps = {
  t: () => {},
  dateStartAt: "",
  dateExpireAt: "",
  handleChangeDateStartAt: () => {},
  handleChangeDateExpireAt: () => {},
  dateDiffError: null,
  navigation: {},
};

export default function SessionRegularEditDate(props = initialProps) {
  const { t } = props;
  const [dateStartAt, setDateStartAt] = useState(
    props.dateStartAt ? new Date(props.dateStartAt) : new Date()
  );
  const [dateExpireAt, setDateExpireAt] = useState(
    props.dateExpireAt ? new Date(props.dateExpireAt) : new Date()
  );
  const [dateDiffError, setDateDiffError] = useState(null);

  const handleChangeDateStartAt = (e, date) => {
    setDateStartAt(date);
  };

  const handleChangeDateExpireAt = (e, date) => {
    setDateExpireAt(date);
  };

  const save = () => {
    const dateDiffError = SessionValidator.validateDiffError(
      dateStartAt,
      dateExpireAt,
      t
    );
    setDateDiffError(dateDiffError);
    if (dateDiffError === null) {
      const formdata = {
        dateStartAt: Moment(dateStartAt).format("YYYY-MM-DD"),
        dateExpireAt: Moment(dateExpireAt).format("YYYY-MM-DD"),
      };
      props.onSaveButtonPress(formdata);
    }
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <STGScrollView>
        <STGScrollViewBody>
          <STGDatePicker
            attr="dateStartAt"
            value={dateStartAt}
            handleChangeInput={handleChangeDateStartAt}
            t={t}
            dateMode="date"
            dateFormat="dddd, DD MMM YYYY"
          />
          <STGDatePicker
            attr="dateExpireAt"
            value={dateExpireAt}
            handleChangeInput={handleChangeDateExpireAt}
            t={t}
            dateMode="date"
            dateFormat="dddd, DD MMM YYYY"
          />
          {dateDiffError && <Text style={gStyles.helper}>{dateDiffError}</Text>}
        </STGScrollViewBody>
      </STGScrollView>
    </EditFormContainer>
  );
}
