import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppRouterContextProps } from "../types";
import { useLocationInitiator } from "../hooks";

const AppRouterContext = createContext<AppRouterContextProps | null>(null);

export const AppRouterProvider = ({ children }: { children: ReactNode }) => {
  const { location, isFetching, setIsFetching } = useLocationInitiator();

  if (!location) return;
  return (
    <AppRouterContext.Provider value={{ location, isFetching, setIsFetching }}>
      {children}
    </AppRouterContext.Provider>
  );
};

export const useAppRouterContext = () => {
  const ctx = useContext(AppRouterContext);

  if (!ctx) {
    throw new Error(
      "useAppRouterContext must be used within a AppRouterProvider"
    );
  }

  return ctx;
};
