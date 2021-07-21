import React, { useState } from "react";
import { Text } from "react-native";
import { STGDatePicker, STGScrollView, STGScrollViewBody } from "stg-ui";
import gStyles from "@components/styles";
import EditFormContainer from "../session-regular-edit/EditFormContainer";
import Moment from "moment";
import SessionValidator from "../session-add/validation";

const initialProps = {
  t: () => {},
  date: new Date(),
  timeStartAt: new Date(),
  timeEndAt: new Date(),
  handleChangeDate: () => {},
  handleChangeTimeStartAt: () => {},
  handleChangeTimeEndAt: () => {},
  dateDiffError: null,
  navigation: {},
};

function renderTime(time) {
  if (time) {
    const date = new Date();
    const dateString = Moment(date).format("YYYY-MM-DD");
    return new Date(`${dateString}T${time}`);
  } else {
    return new Date();
  }
}

export default function SessionRegularEditDate(props = initialProps) {
  const { t } = props;
  const [date, setDate] = useState(
    props.date ? new Date(props.date) : new Date()
  );
  const [timeStartAt, setTimeStartAt] = useState(renderTime(props.timeStartAt));
  const [timeEndAt, setTimeEndAt] = useState(renderTime(props.timeEndAt));
  const [dateDiffError, setDateDiffError] = useState(null);

  const handleChangeDate = (e, d) => {
    setDate(d);
  };

  const handleChangeTimeStartAt = (e, d) => {
    setTimeStartAt(d);
  };

  const handleChangeTimeEndAt = (e, d) => {
    setTimeEndAt(d);
  };

  const save = () => {
    const dateDiffError = SessionValidator.validateDiffError(
      timeStartAt,
      timeEndAt,
      t
    );
    setDateDiffError(dateDiffError);
    if (dateDiffError === null) {
      const formdata = {
        date: Moment(date).format("YYYY-MM-DD"),
        timeStartAt: Moment(timeStartAt).format("HH:mm:ss"),
        timeEndAt: Moment(timeEndAt).format("HH:mm:ss"),
      };
      props.onSaveButtonPress(formdata);
    }
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <STGScrollView>
        <STGScrollViewBody>
          <STGDatePicker
            attr="date"
            value={date}
            handleChangeInput={handleChangeDate}
            t={t}
            dateMode="date"
            dateFormat="dddd, DD MMM YYYY"
          />
          <STGDatePicker
            attr="timeStartAt"
            value={timeStartAt}
            handleChangeInput={handleChangeTimeStartAt}
            t={t}
            dateMode="time"
            dateFormat="HH:mm"
          />
          <STGDatePicker
            attr="timeEndAt"
            value={timeEndAt}
            handleChangeInput={handleChangeTimeEndAt}
            t={t}
            dateMode="time"
            dateFormat="HH:mm"
          />
          {dateDiffError && <Text style={gStyles.helper}>{dateDiffError}</Text>}
        </STGScrollViewBody>
      </STGScrollView>
    </EditFormContainer>
  );
}
