"use client";

// Member 2's app (exported from AI Studio), mounted inside Next.js. Was src/main.tsx.
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";

export default function Root() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
