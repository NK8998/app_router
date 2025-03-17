import { useAppRouterContext } from "./contexts/AppRouterContext";

export default function RouteFetchingLoader() {
  const { transitioning } = useAppRouterContext();
  return (
    <div className={`fetching-loader ${transitioning ? "show" : "done"}`}>
      <div className='fetching-loader__sliding-window sliding-window__one'></div>
    </div>
  );
}
