import { ReactNode, SetStateAction } from "react";

export interface RouteProps {
  children?: ReactNode;
  element?: ReactNode;
  index?: boolean;
  path: string;
  componentID?: string;
  action?: () => Promise<string>;
}

export interface RouteEntry extends RouteProps {}

export interface AppRouterProps {
  children: ReactNode;
  persist?: boolean;
}

export type Location = {
  key: string;
  pathname: string;
  search: Object;
  pathnamewithsearch: string;
};

export interface AppRouterContextProps {
  location: Location;
  isFetching: boolean;
  setIsFetching: React.Dispatch<SetStateAction<boolean>>;
}

export interface ComponentContextProps {
  componentChildren: ReactNode;
  parentPath: string;
}

interface InitialValueProps {
  componentChildren?: ReactNode;
  parentPath: string;
}

export interface ComponentProviderProps {
  children: ReactNode;
  initialValue: InitialValueProps;
}
