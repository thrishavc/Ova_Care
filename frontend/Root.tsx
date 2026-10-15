"use client";

// Entry point of the single-page frontend, mounted by app/page.tsx.
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function Root() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
