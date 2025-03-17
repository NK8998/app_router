import { useAppRouterContext } from "@/client_app/AppRouter/components/contexts/AppRouterContext";
import {
  toggleMainGuideVisibility,
  toggleMiniGuideVisibility,
} from "../../../store/app_store/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { BurgerSvg, HvdLogo } from "@/client_app/assets/icons";
import Link from "@/client_app/AppRouter/components/Link";
import { useLocation } from "@/client_app/AppRouter/components/hooks";

export default function GuideBtn() {
  const { windowWidth, mainGuideVisible, miniGuideVisible } = useAppSelector(
    (state) => state.app
  );

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const handleClick = () => {
    if (!pathname.includes("/watch") && windowWidth > 1200) {
      dispatch(toggleMiniGuideVisibility(!miniGuideVisible));
    } else {
      dispatch(toggleMainGuideVisibility(!mainGuideVisible));
    }
  };

  return (
    <div className='guide-button'>
      <div className='guide-switcher' onClick={handleClick}>
        <BurgerSvg />
      </div>
      <Link href='/'>
        <HvdLogo />
      </Link>
    </div>
  );
}
