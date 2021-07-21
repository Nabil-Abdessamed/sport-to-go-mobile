import { globalApiConfig } from "@config";

export async function getContracts() {
  return await globalApiConfig.get("/contract");
}

export default {
  getContracts,
};
