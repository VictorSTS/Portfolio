import React, { createContext, useContext, useState } from "react";
import { fr } from "../locales/fr";
import { en } from "../locales/en";

const translations = { fr, en };

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("fr");

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};