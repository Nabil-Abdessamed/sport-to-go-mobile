import { globalApiConfig } from "../../config";

async function editSessionFile(id, data) {
  return await globalApiConfig.put(`/sessions-file/${id}`, data);
}

async function removeSessionFile(id) {
  return await globalApiConfig.delete(`/sessions-file/${id}`);
}

export default {
  editSessionFile,
  removeSessionFile,
};
