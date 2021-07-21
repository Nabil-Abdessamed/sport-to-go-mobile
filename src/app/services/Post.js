import { globalApiConfig } from "@config";

export async function getPostsService() {
  return await globalApiConfig.get("/posts");
}

export async function getUserPostsService(user) {
  return await globalApiConfig.get(`/posts/users/${user}`);
}

export async function savePostService(data) {
  return await globalApiConfig.post("/posts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function likePostService(id) {
  return await globalApiConfig.post(`/post-like/${id}`, {});
}

export async function addPostCommentService(id, data) {
  return await globalApiConfig.post(`/post-comment/${id}`, data);
}

export async function updatePostCommentService(data) {
  return await globalApiConfig.put(`/post-comment/${data.id}`, data);
}

export async function removePostCommentService(id) {
  return await globalApiConfig.delete(`/post-comment/${id}`);
}

export async function getPostCommentsService(id) {
  return await globalApiConfig.get(`/post-comment/${id}`);
}

export async function sharePostService(id) {
  return await globalApiConfig.post(`/post-share/${id}`);
}

export async function updatePostService(data) {
  return await globalApiConfig.put(`/posts`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deletePostService(id) {
  return await globalApiConfig.delete(`/posts/${id}`);
}

export async function getPostService(id) {
  return await globalApiConfig.get(`/posts/${id}`);
}

export async function getPostsBySearchService(data) {
  return await globalApiConfig.get("/posts/filter", { params: data });
}

export async function getLikesUsersService(postId) {
  return await globalApiConfig.get(`/post-like/${postId}/users`);
}
