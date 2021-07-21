import validator from "validator";

export function validateOldPassword(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:oldPassword");
  }
  return null;
}

export function validateNewPassword(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:newPassword");
  }
  return null;
}

export function validateConfirmNewPassword(text1, text2, t) {
  if (validator.isEmpty(text1)) {
    return t("validation:confirmPassword");
  }
  if (!validator.equals(text1, text2)) {
    return t("validation:confirmPassword2");
  }
  return null;
}
