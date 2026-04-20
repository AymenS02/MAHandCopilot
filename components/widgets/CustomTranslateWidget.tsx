"use client";
import { useState, useEffect } from "react";
import { GoogleTranslateWidget } from "./GoogleTranslateWidget";

interface GoogleTranslate {
  translate: {
    TranslateElement: (_: object, __: string) => void;
  };
}

declare global {
  interface Window {
    google: GoogleTranslate;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  //   { code: "es", name: "Español" },
  { code: "ar", name: "العربية" },
  // Add more languages as needed
];

export function CustomTranslateWidget() {
  const [language, setLanguage] = useState("en");
  // console.log(window.google);

  useEffect(() => {
    // Load Google Translate script if not loaded
    const existingScript = document.querySelector(
      'script[src*="translate_a/element.js"]'
    );

    if (!existingScript) {
      // Define a hidden element for Google to initialize with
      const hiddenElement = document.createElement("div");
      hiddenElement.id = "google_translate_element";
      hiddenElement.style.display = "none";
      document.body.appendChild(hiddenElement);

      window.googleTranslateElementInit = () => {
        window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode);

    // Use Google's translation function
    if (window.google && window.google.translate) {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        (select as HTMLSelectElement).value = langCode;
        // Trigger change event
        const event = new Event("change", { bubbles: true });
        select.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="hidden">
        <GoogleTranslateWidget />
      </div>

      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-white cursor-pointer border border-white rounded px-3 py-2 text-sm notranslate"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
