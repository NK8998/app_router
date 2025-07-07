import { useEffect, useMemo, useState } from "react";
import {
  ComponentProvider,
  useComponentContext,
} from "./contexts/ComponentContext";
import { initiateRouteMatching, useLocation } from "./hooks";
import { RouteProps } from "./types";
import { useAppRouterContext } from "./contexts/AppRouterContext";

export const Route = ({
  element,
  path,
  children,
  action,
  visited = false,
}: RouteProps) => {
  const [isVisited, setIsVisited] = useState(visited);
  const [updateUI, setUpdateUI] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { persist, isFetching, setIsFetching, targetRoute, setTargetRoute } =
    useAppRouterContext();
  const [params, setParams] = useState({});
  const { pathname, pathnamewithsearch } = useLocation();
  const { parentPath } = useComponentContext();
  const fullParentPath = parentPath + path;

  useEffect(() => {
    if (isFetching) return;
    setUpdateUI(shouldRender);
    shouldRender && setIsVisited(true);
  }, [targetRoute, shouldRender, isFetching]);

  useEffect(() => {
    const { render, urlParams } = initiateRouteMatching(
      fullParentPath,
      pathname
    );

    setShouldRender(render);
    handleTransition(render);
    setParams(urlParams);
  }, [pathnamewithsearch]);

  const handleTransition = async (render: boolean) => {
    if (render && action) {
      try {
        setIsFetching(true);
        await action?.();
        setTargetRoute(pathnamewithsearch);
        setIsVisited(true);
      } catch (err) {
        console.error("Route action failed:", err);
      } finally {
        setIsFetching(false);
      }
    } else if (render && !action) {
      setTargetRoute(pathnamewithsearch);
      setIsVisited(true);
      setIsFetching(false);
    }
  };

  const regularRoute = () => {
    return updateUI ? (
      <ComponentProvider
        initialValue={{
          componentChildren: children,
          parentPath: fullParentPath,
          params,
          isHidden: !updateUI,
        }}
      >
        {element}
      </ComponentProvider>
    ) : null;
  };

  const persistedRoute = () => {
    const show = updateUI;
    return isVisited ? (
      <div className={`route-wrapper`} hidden={!show}>
        <ComponentProvider
          initialValue={{
            componentChildren: children,
            parentPath: fullParentPath,
            params,
            isHidden: !updateUI,
          }}
        >
          {element}
        </ComponentProvider>
      </div>
    ) : null;
  };

  return persist ? persistedRoute() : regularRoute();
};
