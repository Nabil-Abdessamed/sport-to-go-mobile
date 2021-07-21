import { globalApiConfig } from "@config";

export async function getGalleryItemsService(userId) {
  return await globalApiConfig.get(`/gallery/${userId}`);
}

export async function createGalleryItemService(data) {
  return await globalApiConfig.post("/gallery", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteGalleryItemService(id) {
  return await globalApiConfig.delete(`/gallery/${id}`);
}

export default {
  getGalleryItemsService,
  createGalleryItemService,
  deleteGalleryItemService,
};
