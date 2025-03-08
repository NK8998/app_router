import { MouseEvent, ReactNode } from "react";
import { useNavigate } from "./hooks";
import { useAppRouterContext } from "./contexts/AppRouterContext";

interface LinkProps {
  children: ReactNode;
  href: string;
}
export default function Link({ children, href }: LinkProps) {
  const { setIsFetching } = useAppRouterContext();

  const navigate = useNavigate();
  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href) {
      setIsFetching(true);

      navigate(href);
    }
  };

  return (
    <a href={href} onClick={(e) => handleLinkClick(e)}>
      {children}
    </a>
  );
}
