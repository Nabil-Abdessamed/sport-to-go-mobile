import validator from "validator";

export function validatePartnershipName(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:partnershipName");
  }
  return null;
}

export function validateDisplayName(text, t) {
  if (validator.isEmpty(text)) {
    return `Veuillez entrer un nom valide.`;
  }
  return null;
}

export function validateMatriculation(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:matriculation");
  }
  return null;
}

export function validateSiret(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:siretNumber");
  }
  if (!validator.isNumeric(text, { no_symbols: true })) {
    return t("validation:siretNumber2");
  }
  if (!validator.isLength(text, { min: 9, max: 9 })) {
    return t("validation:siretNumber3");
  }
  return null;
}

export function validateCountry(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:country");
  }
  return null;
}

export function validateCity(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:city");
  }
  return null;
}

export function validateAddress(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:address");
  }
  return null;
}

export function validateType(text, t) {
  if (validator.isEmpty(text)) {
    return t("validation:type");
  }
  return null;
}

export function validatePoste(text, t) {
  if (!validator.isPostalCode(text, "FR")) {
    return t("validation:postalCode");
  }
  return null;
}

export function validateWebsite(text, t) {
  if (!validator.isURL(text)) {
    return t("validation:website");
  }
  return null;
}
