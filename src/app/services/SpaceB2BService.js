import { globalApiConfig } from "@config";

export async function getItems() {
  return await globalApiConfig.get("/b2b");
}

export async function getItemsBySearch(type, description) {
  return await globalApiConfig.get("/b2b/search", {
    params: {
      type,
      description,
    },
  });
}

export async function getItem(id) {
  return await globalApiConfig.get(`/b2b/${id}`);
}

export async function save(data) {
  return await globalApiConfig.post(`/b2b`, data);
}

export async function update(data) {
  return await globalApiConfig.put(`/b2b`, data);
}

export async function remove(id) {
  return await globalApiConfig.delete(`/b2b/${id}`);
}

export async function getItemComments(id) {
  return await globalApiConfig.get(`/b2b-comments/${id}/comments`);
}

export async function saveComment(data) {
  return await globalApiConfig.post(`/b2b-comments`, data);
}

export async function updateComment(data) {
  return await globalApiConfig.put(`/b2b-comments`, data);
}

export async function deleteComment(id) {
  return await globalApiConfig.delete(`/b2b-comments/${id}`);
}

export default {
  getItem,
  getItems,
  getItemsBySearch,
  save,
  update,
  remove,
  getItemComments,
  saveComment,
  updateComment,
  deleteComment,
};
