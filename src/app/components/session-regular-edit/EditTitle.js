import React, { useState } from "react";
import SessionTextInput from "../session-add-regular/SessionTextInput";
import EditFormContainer from "./EditFormContainer";
import SessionValidator from "../session-add/validation";
import { STGScrollView, STGScrollViewBody } from "stg-ui";

const initialProps = {
  t: () => {},
  onSaveButtonPress: () => {},
  title: "",
  description: "",
  navigation: {},
};

export default function SessionRegularEditTitle(props = initialProps) {
  const { t } = props;
  const [title, setTitle] = useState(props.title);
  const [titleError, setTitleError] = useState(null);
  const [description, setDescription] = useState(props.description);

  const save = () => {
    const titleError = SessionValidator.validateTitle(title, t);
    setTitleError(titleError);
    if (titleError === null) {
      props.onSaveButtonPress({ title, description });
    }
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <STGScrollView>
        <STGScrollViewBody>
          <SessionTextInput
            value={title}
            setValue={setTitle}
            title={t("session:add.sportNamePlaceholder")}
            placeholder={t("session:add.sportNamePlaceholder")}
            error={titleError}
          />
          <SessionTextInput
            value={description}
            setValue={setDescription}
            title={t("session:add.descriptionPlaceholder")}
            placeholder={t("session:add.descriptionPlaceholder")}
            multiline={true}
          />
        </STGScrollViewBody>
      </STGScrollView>
    </EditFormContainer>
  );
}
