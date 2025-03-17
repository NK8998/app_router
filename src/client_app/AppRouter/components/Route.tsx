import { useEffect, useState } from "react";
import {
  ComponentProvider,
  useComponentContext,
} from "./contexts/ComponentContext";
import { initiateRouteMatching, useLocation } from "./hooks";
import { RouteProps } from "./types";
import { useAppRouterContext } from "./contexts/AppRouterContext";
import { nanoid } from "@reduxjs/toolkit";

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
  const { persist, transitioning, setIsIsTransitioning, setLocation } =
    useAppRouterContext();
  const [params, setParams] = useState({});
  const { parentPath } = useComponentContext();
  const fullParentPath = parentPath + path;

  useEffect(() => {
    if (transitioning) return;
    setUpdateUI(shouldRender);
    setIsVisited(shouldRender);
  }, [transitioning, shouldRender]);

  useEffect(() => {
    const { render, urlParams } = initiateRouteMatching(
      fullParentPath,
      window.location.pathname
    );
    setShouldRender(render);
    handleTransition(render);
    setParams(urlParams);
  }, [transitioning]);

  const handleTransition = async (render: boolean) => {
    if (render && action) {
      await action()
        .catch((err) => {
          console.error("Something went wrong", err);
        })
        .finally(() => {
          setIsIsTransitioning(false);
          setLocation({
            key: nanoid(6),
            pathname: window.location.pathname,
            search: window.location.search,
            pathnamewithsearch:
              window.location.pathname + window.location.search,
          });
        });
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
