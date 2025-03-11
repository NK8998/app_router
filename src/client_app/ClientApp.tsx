"use client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { AppRouterProvider } from "./AppRouter/components/contexts/AppRouterContext.tsx";
import Main from "./Main.tsx";

export default function ClientApp() {
  return (
    <Provider store={store}>
      <AppRouterProvider persist>
        <Main />
      </AppRouterProvider>
    </Provider>
  );
}
