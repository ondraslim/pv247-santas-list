import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import en from "../localization/en";
import es from "../localization/es";
import fr from "../localization/fr";
import cs from "../localization/cs";
import de from "../localization/de";
import it from "../localization/it";
import pt from "../localization/pt";
import ru from "../localization/ru";
import fi from "../localization/fi";
import hi from "../localization/hi";
import pl from "../localization/pl";
import sk from "../localization/sk";

const resources = {
    en, es, fr, cs, de, it, pt, ru, fi, hi, pl, sk
}

export const languageLabels: Array<string> = [
  "EN", "ES", "FR", "CS", "DE", "IT", "PT", "RU", "FI", "HI", "PL", "SK"
];

export const languages: Array<string> = [
  "en", "es", "fr", "cs", "de", "it", "pt", "ru", "fi", "hi", "pl", "sk"
];

export const flags: Array<string> = [
  "gb", "es", "fr", "cz", "de", "it", "pt", "ru", "fi", "in", "pl", "sk"
]


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",    
    fallbackLng: "en",// default language, good for testing
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;