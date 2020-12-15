import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from "../localization/en";
import es from "../localization/es";
import fr from "../localization/fr";

const resources = {
    en, es, fr
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",    // default language, good for testing
    interpolation: {
      escapeValue: false
    }
  });


export default i18n;