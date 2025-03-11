import {
  useNavigate,
  useParams,
} from "@/client_app/AppRouter/components/hooks";
import Link from "@/client_app/AppRouter/components/Link";
import OutLet from "@/client_app/AppRouter/components/OutLet";
import "./style.css";

export default function Channel() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className='channel-page'>
      <div className='button-row'>
        <div onClick={() => navigate(`/channel/${params.channel}/featured`)}>
          Featured
        </div>
        <Link href={`/channel/${params.channel}/videos`}>Videos</Link>
        <Link href={`/channel/${params.channel}/live`}>Live</Link>
      </div>
      <OutLet />
    </div>
  );
}
