import { useEffect, useState } from "react";
import {
  ComponentProvider,
  useComponentContext,
} from "./contexts/componentContext";
import { initiateRouteMatching, useLocation } from "./hooks";
import { RouteProps } from "./types";
import { useAppRouterContext } from "./contexts/AppRouterContext";

export const Route = ({
  element,
  path,
  children,
  index = false,
  action,
}: RouteProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { setIsFetching } = useAppRouterContext();
  const { pathname } = useLocation();
  const { parentPath } = useComponentContext();
  const fullParentPath = parentPath + path;

  const handleAction = async () => {
    if (action) {
      return await action();
    }
  };

  useEffect(() => {
    const shouldRender = initiateRouteMatching(fullParentPath, pathname);
    setShouldRender(shouldRender);

    if (shouldRender) {
      handleAction()
        .then((res) => {
          console.log(res);
          setIsFetching(false);
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        });
    }
  }, [pathname]);

  return shouldRender || index ? (
    <ComponentProvider
      initialValue={{ componentChildren: children, parentPath: fullParentPath }}
    >
      {element}
    </ComponentProvider>
  ) : null;
};
