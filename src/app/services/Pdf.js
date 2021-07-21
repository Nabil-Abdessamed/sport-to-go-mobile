import { globalApiConfig } from "@config";

export async function generateRegisterPdfService(data) {
  return await globalApiConfig.post("/pdf", data);
}
