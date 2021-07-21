import validator from "validator";

export function validateEmail(text) {
  const message = `Veuillez entrer un email valide.`;
  if (validator.isEmpty(text)) return message;
  return null;
}

export function validatePassword(text) {
  const message = `Veuillez entrer un mot de passe valide.`;
  if (validator.isEmpty(text)) return message;
  return null;
}
