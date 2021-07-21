import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

import fr from "./fr.json";
import ar from "./ar.json";
import en from "./en.json";
import { store } from "@redux/stores";
import { getCurrentLanguage } from "@redux/actions";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: callback => {
    const lang =
      Platform.OS === "android"
        ? NativeModules.I18nManager.localeIdentifier
        : NativeModules.SettingsManager.settings.AppleLocale;
    store.dispatch(getCurrentLanguage(lang.substring(0, 2)));
    return callback(lang.substring(0, 2));
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: "fr",
    fallbackLng: "fr",
    resources: {
      fr,
      en,
      ar
    },
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    cache: {
      enabled: true
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  });

export default i18n;
