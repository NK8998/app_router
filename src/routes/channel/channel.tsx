import { useParams } from "../../AppRouter/components/hooks";
import Link from "../../AppRouter/components/link";
import OutLet from "../../AppRouter/components/outLet";

export default function Channel() {
  const params = useParams();
  // console.log(params);
  return (
    <div className='channel'>
      <h1>this is the channel page</h1>
      <Link href='/'>Home</Link>
      <div className='button-row'>
        <Link href={`/channel/${params.channel}/content`}>Content</Link>
        <Link href={`/channel/${params.channel}/videos`}>Videos</Link>
        <Link href={`/channel/${params.channel}/live`}>Live</Link>
      </div>
      <OutLet />
    </div>
  );
}
