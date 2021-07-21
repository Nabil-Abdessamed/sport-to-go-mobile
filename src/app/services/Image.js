import { fileApiConfig } from "@config";

export async function getImageService(id) {
  return await fileApiConfig.get(`/image/${id}`);
}
