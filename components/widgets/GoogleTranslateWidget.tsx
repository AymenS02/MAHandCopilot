"use client";
// components/GoogleTranslate.tsx
import { useEffect } from "react";

export function GoogleTranslateWidget({ id = "google_translate_element" }) {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src*="translate_a/element.js"]'
    );

    if (!existingScript) {
      // Define the init function
      window.googleTranslateElementInit = () => {
        window.google.translate.TranslateElement({ pageLanguage: "en" }, id);
      };

      // Append the script
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      // Script exists, manually initialize for this instance
      window.google.translate.TranslateElement({ pageLanguage: "en" }, id);
    }

    return () => {
      // Optional: clean up if the component unmounts
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    };
  }, [id]);

  return <div id={id}></div>;
}
