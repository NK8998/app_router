"use client";
import { useAppSelector } from "../../store/hooks/hooks";
import "./guide.css";
import MainGuide from "./components/main_guide";
import MiniGuide from "./components/mini_guide";
import { useLayoutEffect, useState } from "react";
import { useAppRouterContext } from "@/client_app/AppRouter/components/contexts/AppRouterContext";
import { useLocation } from "@/client_app/AppRouter/components/hooks";

export default function Guide() {
  const { windowWidth } = useAppSelector((state) => state.app);
  const { pathname } = useLocation();
  const [resizeStyle, setResizeStyle] = useState("");
  const [watchStyle, setWatchStyle] = useState("");

  useLayoutEffect(() => {
    setWatchStyle(pathname.includes("/watch") ? "watch-active" : "");
    setResizeStyle(
      !pathname.includes("/watch") && windowWidth <= 1200 ? "mini-active" : ""
    );
  }, [windowWidth, pathname]);

  if (!windowWidth || !pathname) return <></>;
  return (
    <div className={`guide-wrapper ${watchStyle} ${resizeStyle}`}>
      <MainGuide />
      <MiniGuide />
    </div>
  );
}
