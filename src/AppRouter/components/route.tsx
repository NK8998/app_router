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
  const { isFetching, setIsFetching } = useAppRouterContext();
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
    if (shouldRender) {
      console.log("My action will run", path);
      handleAction()
        .then((res) => {
          console.log(res);
          setIsFetching(false);
        })
        .catch((err) => {
          console.error("Something went wrong", err);
        });
    }

    if (!isFetching) {
      setShouldRender(shouldRender);
    }
  }, [pathname, isFetching]);
  return shouldRender || index ? (
    <ComponentProvider
      initialValue={{ componentChildren: children, parentPath: fullParentPath }}
    >
      {element}
    </ComponentProvider>
  ) : null;
};
