import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { MotionConfig } from "framer-motion";

const EcoModeContext = createContext({
  isEcoMode: false,
  wasAutoEnabled: false,
  toggleEcoMode: () => {},
});

export const EcoModeProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return { isEcoMode: false, wasAutoEnabled: false };
    }
    const saved = localStorage.getItem("best_eco_mode");
    if (saved !== null) {
      return { isEcoMode: saved === "true", wasAutoEnabled: false };
    }
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return {
      isEcoMode: Boolean(prefersReduced),
      wasAutoEnabled: Boolean(prefersReduced),
    };
  });

  useEffect(() => {
    const root = document.documentElement;
    if (state.isEcoMode) {
      root.classList.add("eco-mode");
    } else {
      root.classList.remove("eco-mode");
    }
  }, [state.isEcoMode]);

  const toggleEcoMode = useCallback(() => {
    setState((prev) => {
      const next = !prev.isEcoMode;
      localStorage.setItem("best_eco_mode", String(next));
      return { isEcoMode: next, wasAutoEnabled: false };
    });
  }, []);

  return (
    <EcoModeContext.Provider
      value={{
        isEcoMode: state.isEcoMode,
        wasAutoEnabled: state.wasAutoEnabled,
        toggleEcoMode,
      }}
    >
      <MotionConfig reducedMotion={state.isEcoMode ? "always" : "never"}>
        {children}
      </MotionConfig>
    </EcoModeContext.Provider>
  );
};

export const useEcoMode = () => useContext(EcoModeContext);