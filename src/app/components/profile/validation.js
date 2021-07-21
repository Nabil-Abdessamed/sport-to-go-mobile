import validator from "validator";

export function validateFullname(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:name");
  }
  return null;
}

export function validatePhone(text, t) {
  if (!validator.isMobilePhone(text, "fr-FR")) {
    return t("validation:phone");
  }
  return null;
}

export function validateBirthdate(text, t) {
  if (validator.toDate(text) === null) {
    return t("validation:birthdate");
  }
  return null;
}
