import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import { LanguageProvider } from "./i18n/Context";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <HeroUIProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </HeroUIProvider>
    </LanguageProvider>
  </React.StrictMode>
);
