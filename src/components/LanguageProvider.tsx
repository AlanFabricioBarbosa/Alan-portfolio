"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "@/i18n/translations";

type LanguageContextType = {
  locale: Locale;
  t: Translations;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem("locale") as Locale | null;
  if (stored && (stored === "pt" || stored === "en")) return stored;
  // Auto-detect browser language
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "pt" ? "pt" : "pt"; // Default to PT even for other languages
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribe(_cb: () => void) {
  return () => {};
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "pt" ? "en" : "pt";
      localStorage.setItem("locale", next);
      // Update html lang attribute
      document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
      return next;
    });
  }, []);

  const t = translations[locale];

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
