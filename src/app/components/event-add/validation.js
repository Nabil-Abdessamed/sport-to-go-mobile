import v from "validator";

export function validateActivity(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:activity");
  }
  return null;
}

export function validateDescription(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:description");
  }
  return null;
}

export function validateCountry(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:country");
  }
  return null;
}

export function validateCity(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:city");
  }
  return null;
}

export function validateAddress(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:address");
  }
  return null;
}

export function validateDate(text, t) {
  if (v.toDate(text) === null) {
    return t("validation:date");
  }
  return null;
}

export function validateDateDiff(time1, time2, t) {
  if (
    v.toDate(time1.toString()) === null ||
    v.toDate(time2.toString()) === null
  ) {
    return t("validation:date");
  }
  if (time1 > time2) {
    return t("validation:timeDiff");
  }
  return null;
}

export function validateFile(file, t) {
  if (file === null) {
    return t("validation:image");
  }
  return null;
}

export function validatePlaces(text, t) {
  if (v.isEmpty(text) || text <= 0) {
    return t("validation:places");
  }
  if (parseInt(text) < 1 || parseInt(text) > 500) {
    return t("validation:places1");
  }
  return null;
}

export default {
  validateActivity,
  validateDescription,
  validateCountry,
  validateCity,
  validateAddress,
  validateDate,
  validateDateDiff,
  validateFile,
  validatePlaces,
};
