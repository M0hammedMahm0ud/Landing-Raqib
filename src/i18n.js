import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./locales/en";
import { ar } from "./locales/ar";

// Function to update document attributes based on language
const updateDocumentDirection = (lng) => {
  const root = document.documentElement;

  // Set language attribute
  root.setAttribute("lang", lng);

  // Set direction based on language
  if (lng === "ar") {
    root.setAttribute("dir", "rtl");
    localStorage.setItem("admin_language", "ar");
  } else {
    root.setAttribute("dir", "ltr");
    localStorage.setItem("admin_language", "en");
  }
};

// CRITICAL: Set initial direction IMMEDIATELY based on stored language
// This runs BEFORE i18n initializes to prevent layout shift
const initialLng = localStorage.getItem("admin_language") || "en";
updateDocumentDirection(initialLng);

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    fallbackLng: "en", // Fallback language
    lng: initialLng, // Use the same initial language
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "admin_language",
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Set initial direction immediately after init (backup)
i18n.on("initialized", (options) => {
  updateDocumentDirection(i18n.language);
});

// Handle language changes
i18n.on("languageChanged", (lng) => {
  updateDocumentDirection(lng);
});

export default i18n;
