import { globalApiConfig } from "@config";

export async function getUsersBySearchService(search = "") {
  return await globalApiConfig.get(`/users/${search}/search`);
}

export async function getUsersProBySearchService(search = "") {
  return await globalApiConfig.get(`/users/pro/${search}/search`);
}

export async function updateUserProfileService(data) {
  return await globalApiConfig.put("/users/profile", data);
}

export async function updateUserAvatarService(data) {
  return await globalApiConfig.post("/users/avatar", data);
}

export async function updateUserPasswordService(data) {
  return await globalApiConfig.put("/users/password", data);
}

export async function getUsersByTypeService(type) {
  return await globalApiConfig.get(`/users/${type}/type`);
}

export async function getUserProfileService(id) {
  return await globalApiConfig.get(`/users/${id}/profile-show`);
}

export async function followUserService(id) {
  return await globalApiConfig.post(`/users/follow/${id}`, {});
}

export async function unfollowUserService(id) {
  return await globalApiConfig.delete(`/users/unfollow/${id}`);
}

export async function getFollowedUsersService() {
  return await globalApiConfig.get("/users/followed");
}

export async function getUserFollowersService(userId) {
  return await globalApiConfig.get(`/users-follow/${userId}/users`);
}

export async function getUserFollowersCountService(userId) {
  return await globalApiConfig.get(`/users-follow/${userId}/count`);
}
