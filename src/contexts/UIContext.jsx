import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("uk");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    isModalOpen,
    setIsModalOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI має використовуватись в UIProvider");
  }
  return context;
}
    