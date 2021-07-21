import validator from "validator";

export function validateName(text, t) {
  const message = t("validation:name");
  if (validator.isEmpty(text)) {
    return message;
  }
  return null;
}

export function validateEmail(text, t) {
  const message = t("validation:email");
  if (!validator.isEmail(text)) {
    return message;
  }
  return null;
}

export function validatePassword(text, t) {
  const message = t("validation:password");
  if (validator.isEmpty(text)) {
    return message;
  }
  if (
    !validator.isLength(text, {
      min: 6,
      max: 30,
    })
  ) {
    return t("validation:passwordLength");
  }
  return null;
}

export function validateConfirmPassword(text1, text2, t) {
  if (validator.isEmpty(text2)) {
    return t("validation:confirmPassword");
  }
  if (!validator.equals(text1, text2)) {
    return t("validation:confirmPassword2");
  }
  return null;
}

export function validatePhone(text, t) {
  const message = t("validation:phone");
  if (!validator.isMobilePhone(text, "fr-FR")) {
    return message;
  }
  return null;
}

export function validateCode(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:freeRegistrationCode");
  }
  if (!validator.isAlphanumeric(text, "en-US")) {
    return t("validation:freeRegistrationCode1");
  }
  if (!validator.isLength(text, { min: 16, max: 16 })) {
    return t("validation:freeRegistrationCode2");
  }
  return null;
}
