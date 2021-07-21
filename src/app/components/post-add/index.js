import React, { useState } from "react";
import { Text, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import gStyles from "@components/styles";
import { PostDto } from "../../dto";
import {
  STGContainer,
  STGButton,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import Validation from "./validation";
import _ from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function PostAdd() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // States
  const [post, setPost] = useState(new PostDto());
  const [descriptionError, setDescriptionError] = useState(null);

  const next = () => {
    const descriptionError = Validation.validateDescription(post.article, t);
    if (descriptionError) {
      setDescriptionError(descriptionError);
    } else {
      navigation.navigate("PostAddTwo", {
        post,
      });
    }
  };

  const handleChangeInput = (value) => {
    const p = _.clone(post);
    p.article = value;
    setPost(p);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGScrollView>
        <STGContainer>
          <STGScrollViewBody>
            <Text style={gStyles.textInputTitle}>
              {t("post:add.description")}
            </Text>
            <TextInput
              autoFocus={true}
              multiline={true}
              defaultValue={post.description}
              value={post.description}
              style={{
                ...gStyles.textInput,
                borderBottomColor: descriptionError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("post:add.descriptionPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => handleChangeInput(value)}
            />
            {descriptionError && (
              <Text style={gStyles.helper}>{descriptionError}</Text>
            )}
          </STGScrollViewBody>
          <STGButton onPress={next} btnText={t("common:next")} />
        </STGContainer>
      </STGScrollView>
    </KeyboardAvoidingView>
  );
}
