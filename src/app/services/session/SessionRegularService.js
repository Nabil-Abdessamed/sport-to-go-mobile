import { globalApiConfig } from "../../config";
import stripe from "tipsi-stripe";

const PUBLISHABLE_KEY = "pk_test_1A0pORb9JuB1R9mmbdkUeQ4i00BQxyqIk5"; // Compte Test de Majustic (Akram Jabeur)
// const PUBLISHABLE_KEY = "pk_test_tiaoNWXJ70bqS0d2kdG3ch7E"; // Compte Test du client
// const PUBLISHABLE_KEY = "pk_live_0J6rUlNCn82BQwQyEhI3kR5b"; // Compte Live du client

stripe.setOptions({
  publishableKey: PUBLISHABLE_KEY,
});

async function saveSessionRegularService(data) {
  return globalApiConfig.post(`/sessions-regular`, data);
}

async function editSessionRegularService(id, data) {
  return globalApiConfig.put(`/sessions-regular/${id}`, data);
}

async function editSessionRegularFileService(id, data) {
  return globalApiConfig.post(`/sessions-regular/${id}/file`, data);
}

async function editSessionRegularRecurrencesService(id, data) {
  return globalApiConfig.put(`/sessions-regular/${id}/recurrences`, data);
}

async function removeSessionRegularService(id) {
  return globalApiConfig.delete(`/sessions-regular/${id}`);
}

async function getSessionRegularService(id) {
  return globalApiConfig.get(`/sessions-regular/${id}`);
}

async function getSessionsRegularService(params) {
  return globalApiConfig.get(`/sessions-regular`, { params });
}

async function getSessionsRegularSearchService(page, size, params) {
  return globalApiConfig.get(`/sessions-regular/search`, {
    params: {
      page,
      size,
      ...params,
    },
  });
}

async function getSessionsRegularSubscribersService(id) {
  return await globalApiConfig.get(`/session-regular-subscribe/${id}`);
}

async function getSessionsRegularSubscribedUsersService(id) {
  return await globalApiConfig.get(`/session-regular-subscribe/${id}/users`);
}

async function getCardInfoService() {
  return await stripe.paymentRequestWithCardForm();
}

async function purchaseSessionRegularService(id, data) {
  return await globalApiConfig.post(`/session-regular-subscribe/${id}`, data);
}

export default {
  saveSessionRegularService,
  editSessionRegularService,
  editSessionRegularFileService,
  editSessionRegularRecurrencesService,
  removeSessionRegularService,
  getSessionRegularService,
  getSessionsRegularService,
  getSessionsRegularSearchService,
  getSessionsRegularSubscribersService,
  getSessionsRegularSubscribedUsersService,
  getCardInfoService,
  purchaseSessionRegularService,
};
