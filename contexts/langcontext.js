import React from "react";
import { useState } from "react";

export const LangContext = React.createContext();

export const LangProvider = ({ children }) => {
  const [Lang, setLang] = useState("en");

  return (
    <LangContext.Provider value={{ Lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
