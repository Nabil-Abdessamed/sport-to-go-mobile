import { authApiConfig, globalApiConfig } from "@config";

export async function authenticate(data) {
  return await authApiConfig.post(
    "/auth/login",
    {},
    {
      headers: {
        Authorization: "Basic " + data,
      },
    }
  );
}

export async function registerService(data) {
  return await authApiConfig.post("/auth/register", data);
}

export async function activateService(authentification, code) {
  return await authApiConfig.post(
    "/auth/code/" + code,
    {},
    {
      headers: {
        Authorization: "Basic " + authentification,
      },
    }
  );
}

export async function checkEmailExistService(email) {
  return await globalApiConfig.post("/users/email-exist", {
    email,
  });
}

export async function updateStructureService(data) {
  return await globalApiConfig.post(`/structure/edit`, data);
}

export async function updateStructureLogoService(data) {
  return await globalApiConfig.post(`/structure/logo`, data);
}

export async function sendEmailForgotPasswordService(email) {
  return await globalApiConfig.post("/auth/password/send_request", { email });
}

export async function checkEmailAndCodeResetPasswordService(data) {
  return await globalApiConfig.post(
    "/auth/password/check_email_and_code",
    data
  );
}

export async function resetPasswordService(data) {
  return await authApiConfig.post(
    "/auth/password/reset",
    {},
    {
      headers: {
        Authorization: "Basic " + data,
      },
    }
  );
}

export async function payRegisterProService(data) {
  return await globalApiConfig.post(`/register/pro-pay`, data);
}

export async function emailExists(data) {
  return await globalApiConfig.post(`/register/emailexists`, data);
}

export async function logoutService() {
  return await globalApiConfig.post("/users/logout", {});
}

export async function checkFreeRegistrationCodeService(code) {
  return await globalApiConfig.get(`/free-registration-code/${code}`);
}

export async function getEmailAuthTokenService(email) {
  return await authApiConfig.get("/auth/email_auth_token", {
    params: { email },
  });
}
