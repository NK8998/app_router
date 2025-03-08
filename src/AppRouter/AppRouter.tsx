import { ComponentProvider } from "./components/contexts/componentContext";
import { AppRouterProps } from "./components/types";

export const AppRouter = ({ children }: AppRouterProps) => {
  return (
    <ComponentProvider
      initialValue={{ componentChildren: <></>, parentPath: "" }}
    >
      {children}
    </ComponentProvider>
  );
};
