import Link from "@/client_app/AppRouter/components/Link";
import "./watch.css";
import { useAppSelector } from "@/client_app/store/hooks/hooks";
import Player from "@/client_app/global/player/player";
import { useRouteProperties } from "@/client_app/AppRouter/components/hooks";

export default function Watch() {
  const { selectedVideo } = useAppSelector((state) => state.watch);

  const { isHidden } = useRouteProperties();
  return (
    <div className='watch-flexy'>
      <div className='columns'>
        <div className='main-column'>
          <Player
            scope='watch_page'
            videoDetails={isHidden ? null : selectedVideo}
          />
        </div>
        <div className='secondary-column'>
          <Link href='/watch?v=qyCRPfq5dqN'>First Video</Link>
          <Link href='/watch?v=Od7PbjTYPJi'>Second Video</Link>
        </div>
      </div>
    </div>
  );
}
