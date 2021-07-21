import { globalApiConfig } from "@config";

export async function getSizeService() {
  try {
    const response = await globalApiConfig.get("/storage");
    return response;
  } catch (e) {
    return e;
  }
}
