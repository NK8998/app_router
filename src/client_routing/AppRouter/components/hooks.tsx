import { useEffect, useState } from "react";
import { Location } from "./types";
import { nanoid } from "nanoid";
import { useAppRouterContext } from "./contexts/AppRouterContext";
import { replaceDynamicParts } from "./util";
import { useComponentContext } from "./contexts/ComponentContext";

export const useLocationInitiator = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const updateLocation = () => {
      setLocation({
        pathname: window.location.pathname,
        key: nanoid(5),
        pathnamewithsearch: window.location.pathname + window.location.search,
        search: new URLSearchParams(window.location.search),
      });
    };

    window.addEventListener("popstate", updateLocation);

    updateLocation();

    //is clean up needed ??
    return () => {
      window.removeEventListener("popstate", updateLocation);
    };
  }, []);

  return { location, setLocation, isFetching, setIsFetching };
};

export const useLocation = () => {
  const { location } = useAppRouterContext();

  return location;
};

export const initiateRouteMatching = (
  fullParentPath: string,
  pathname: string
) => {
  let params = {};
  const { replacedUrl, urlParams, reducedPath } = replaceDynamicParts(
    fullParentPath,
    pathname,
    params
  );
  const render = replacedUrl === reducedPath;

  return { render, urlParams };
};

export const useNavigate = () => {
  const { pathname, pathnamewithsearch } = useLocation();

  const navigate = (path: string) => {
    if (path === pathname || path === pathnamewithsearch) {
      console.log("same");
      return;
    }
    if (typeof path !== "string" || path.trim() === "") {
      console.warn("Invalid path passed to navigate.");
      return;
    }

    // Push the new path to the history stack
    window.history.pushState(null, "", path);

    // Trigger a popstate event manually to notify any listeners
    const popStateEvent = new PopStateEvent("popstate");
    window.dispatchEvent(popStateEvent);
  };

  return navigate;
};

export const useParams = () => {
  const ctx = useComponentContext();

  if (!ctx)
    throw new Error(
      "useParams can only be called from within a route component"
    );

  return ctx.params;
};

export const useRouteProperties = () => {
  const ctx = useComponentContext();

  if (!ctx)
    throw new Error(
      "useParams can only be called from within a route component"
    );

  return ctx;
};
