import { createContext, useContext, useState } from "react";
import { ComponentContextProps, ComponentProviderProps } from "../types";
import { useLocation } from "../hooks";

const ComponentContext = createContext<ComponentContextProps | null>(null);

export const ComponentProvider = ({
  children,
  initialValue,
}: ComponentProviderProps) => {
  const { componentChildren, parentPath } = initialValue;
  const [params, setParams] = useState(null);

  return (
    <ComponentContext.Provider value={{ componentChildren, parentPath }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => {
  const ctx = useContext(ComponentContext);
  if (!ctx)
    throw new Error(
      "This context is not available. Check the render method of the component"
    );
  return ctx;
};
