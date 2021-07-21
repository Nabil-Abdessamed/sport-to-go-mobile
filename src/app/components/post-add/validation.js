import v from "validator";

export function validateDescription(text, t) {
  if (v.isEmpty(text)) {
    return t("validation:description");
  }
  return null;
}

export default {
  validateDescription
};
