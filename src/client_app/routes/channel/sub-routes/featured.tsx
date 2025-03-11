import { useRouteProperties } from "@/client_app/AppRouter/components/hooks";
import Player from "@/client_app/global/player/player";
import { useAppSelector } from "@/client_app/store/hooks/hooks";

export default function ChannelFeaturedPage() {
  const { featured } = useAppSelector((state) => state.channel);

  const { featuredVideo } = featured;

  const { isHidden } = useRouteProperties();

  return (
    <div className='featured_-age'>
      <h3>This is the featured page</h3>
      <Player
        videoDetails={isHidden ? null : featuredVideo}
        scope='featured_page'
      />
    </div>
  );
}
