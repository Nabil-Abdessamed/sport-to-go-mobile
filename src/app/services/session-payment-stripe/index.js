import { globalApiConfig } from "@config";

export async function createCardService(data) {
  return await globalApiConfig.post("/payment-stripe/create-customer", data);
}

export async function retrieveCustomerService() {
  return await globalApiConfig.get("/payment-stripe/retrieve-customer");
}

export async function createChargeService(data) {
  return await globalApiConfig.post("/payment-stripe/create-charge", data);
}
