import v from "validator";

function validateSport(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:sportName");
  }
  return null;
}

function validateTitle(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:sportName");
  }
  return null;
}

function validatePrice(text, t) {
  if (!v.isNumeric(text, { no_symbols: true })) {
    return t("validation:price");
  }
  if (!v.isLength(text, { min: 0 })) {
    return t("validation:price");
  }
  return null;
}

function validateStartAt(text, t) {
  if (v.toDate(text) === null) {
    return t("validation:date");
  }
  return null;
}

function validateExpireAt(text1, text2, t) {
  if (v.toDate(text1) === null) {
    return t("validation:date");
  }
  if (v.toDate(text1) < v.toDate(text2)) {
    return t("validation:dateExpiration");
  }
  return null;
}

function validateCountry(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:country");
  }
  return null;
}

function validateCity(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:city");
  }
  return null;
}

function validatePlaces(text, t) {
  if (!v.isNumeric(text)) {
    return t("validation:places");
  }
  if (parseInt(text) < 0 || parseInt(text) > 500) {
    return t("validation:places1");
  }
  return null;
}

function valiadteDays(session, t) {
  if (
    !session.monday &&
    !session.tuesday &&
    !session.wednesday &&
    !session.thursday &&
    !session.friday &&
    !session.saturday &&
    !session.sunday
  ) {
    return t("validation:chooseDays");
  }
  return null;
}

function validateDiffError(date1, date2, t) {
  if (date1 > date2) {
    return t("validation:dateDiff");
  }
  return null;
}

export default {
  validateTitle,
  validateSport,
  validateCity,
  validateCountry,
  validatePrice,
  validateSport,
  validateStartAt,
  validateExpireAt,
  validatePlaces,
  valiadteDays,
  validateDiffError
};
