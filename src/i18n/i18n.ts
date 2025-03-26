import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import HomeTH from "@/lang/pages/Home/th.json";
import HomeEN from "@/lang/pages/Home/en.json";

import NavbarTH from "@/lang/pages/Navbar/th.json";
import NavbarEN from "@/lang/pages/Navbar/en.json";

import TestNumberOneTH from "@/lang/pages/TestNumberOne/th.json";
import TestNumberOneEN from "@/lang/pages/TestNumberOne/en.json";

import TestNumberTwoTH from "@/lang/pages/TestNumberTwo/th.json";
import TestNumberTwoEN from "@/lang/pages/TestNumberTwo/en.json";

const resources = {
  en: {
    translation: {
      ...HomeEN,
      ...NavbarEN,
      ...TestNumberOneEN,
      ...TestNumberTwoEN,
    },
  },
  th: {
    translation: {
      ...HomeTH,
      ...NavbarTH,
      ...TestNumberOneTH,
      ...TestNumberTwoTH,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
