import v from "validator";

function cardNumber(text) {
  const value = text.replace(/\s/g, "").trim();
  const isEmpty = v.isEmpty(value);
  const isLength = v.isLength(value, 16, 16);
  const isNumeric = v.isNumeric(value, { no_symbols: true });
  if (isEmpty || !isLength || !isNumeric) {
    return true;
  }
  return false;
}

function cvc(value) {
  const isEmpty = v.isEmpty(value);
  const isLength = v.isLength(value, 3, 3);
  if (isEmpty || !isLength) {
    return true;
  }
  return false;
}

export default {
  cardNumber,
  cvc
};
