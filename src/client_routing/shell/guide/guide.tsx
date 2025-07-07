"use client";
import { useAppSelector } from "../../store/hooks/hooks";
import "./guide.css";
import MainGuide from "./components/main_guide";
import MiniGuide from "./components/mini_guide";
import { useLayoutEffect, useState } from "react";
import { useAppRouterContext } from "@/client_routing/AppRouter/components/contexts/AppRouterContext";
import { usePathname } from "next/navigation";

export default function Guide() {
  const { windowWidth } = useAppSelector((state) => state.app);
  const { targetRoute } = useAppRouterContext();
  const [resizeStyle, setResizeStyle] = useState("");
  const [watchStyle, setWatchStyle] = useState("watch-active");

  useLayoutEffect(() => {
    if (!targetRoute) return;
    if (!targetRoute.includes("/watch") && windowWidth <= 1200) {
      setResizeStyle("mini-active");
    } else {
      setResizeStyle("");
    }

    if (targetRoute.includes("/watch")) {
      setWatchStyle("watch-active");
    } else {
      setWatchStyle("");
    }
  }, [windowWidth, targetRoute]);

  return (
    <div className={`guide-wrapper ${watchStyle} ${resizeStyle}`}>
      <MainGuide />
      <MiniGuide />
    </div>
  );
}
