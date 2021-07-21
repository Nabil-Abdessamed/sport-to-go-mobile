import { globalApiConfig } from "@config";

export async function getSportsService() {
  try {
    const response = await globalApiConfig.get("/sport");
    return response;
  } catch (error) {
    return error;
  }
}

export async function getSportsByUserService() {
  return await globalApiConfig.get("/sports/users");
}
