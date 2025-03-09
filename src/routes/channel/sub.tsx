import { useParams } from "../../AppRouter/components/hooks";
import OutLet from "../../AppRouter/components/outLet";

export default function Sub() {
  const params = useParams();
  // console.log(params);
  return (
    <div className='sub'>
      <h1>I am a child within Channel page</h1>
      <OutLet />
    </div>
  );
}
