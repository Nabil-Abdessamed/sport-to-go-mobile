import { globalApiConfig } from "../../config";
import stripe from "tipsi-stripe";

const PUBLISHABLE_KEY = "pk_test_1A0pORb9JuB1R9mmbdkUeQ4i00BQxyqIk5"; // Compte Test de Majustic (Akram Jabeur)
// const PUBLISHABLE_KEY = "pk_test_tiaoNWXJ70bqS0d2kdG3ch7E"; // Compte Test du client
// const PUBLISHABLE_KEY = "pk_live_0J6rUlNCn82BQwQyEhI3kR5b"; // Compte Live du client

stripe.setOptions({
  publishableKey: PUBLISHABLE_KEY,
});

async function saveSessionUniqueService(data) {
  return globalApiConfig.post(`/sessions-unique`, data);
}

async function editSessionUniqueService(id, data) {
  return globalApiConfig.put(`/sessions-unique/${id}`, data);
}

async function editSessionUniqueFileService(id, data) {
  return globalApiConfig.post(`/sessions-unique/${id}/file`, data);
}

async function editSessionUniqueRecurrencesService(id, data) {
  return globalApiConfig.put(`/sessions-unique/${id}/recurrences`, data);
}

async function removeSessionUniqueService(id) {
  return globalApiConfig.delete(`/sessions-unique/${id}`);
}

async function getSessionUniqueService(id) {
  return globalApiConfig.get(`/sessions-unique/${id}`);
}

async function getSessionsUniqueService(params) {
  return globalApiConfig.get(`/sessions-unique`, { params });
}

async function getSessionsUniqueSearchService(page, size, params) {
  return globalApiConfig.get(`/sessions-unique/search`, {
    params: {
      page,
      size,
      ...params,
    },
  });
}

async function getSessionsUniqueSubscribersService(id) {
  return await globalApiConfig.get(`/session-unique-subscribes/${id}`);
}

async function getSessionsUniqueSubscribedUsersService(id) {
  return await globalApiConfig.get(`/session-unique-subscribes/${id}/users`);
}

async function getCardInfoService() {
  return await stripe.paymentRequestWithCardForm();
}

async function purchaseSessionUniqueService(id, data) {
  return await globalApiConfig.post(`/session-unique-subscribes/${id}`, data);
}

export default {
  saveSessionUniqueService,
  editSessionUniqueService,
  editSessionUniqueFileService,
  editSessionUniqueRecurrencesService,
  removeSessionUniqueService,
  getSessionUniqueService,
  getSessionsUniqueService,
  getSessionsUniqueSearchService,
  getSessionsUniqueSubscribersService,
  getSessionsUniqueSubscribedUsersService,
  getCardInfoService,
  purchaseSessionUniqueService,
};
