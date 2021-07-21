import v from "validator";

export function validateCode(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:code");
  }
  return null;
}

export function validatePassword(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:password");
  }
  if (v.isLength(text, { min: 6, max: 30 })) {
    return t("validation:passwordLength");
  }
  return null;
}
