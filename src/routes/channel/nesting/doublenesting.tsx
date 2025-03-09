import { useParams } from "../../../AppRouter/components/hooks";

export default function DoubleNesting() {
  const params = useParams();
  // console.log(params);
  return <p style={{ color: "red" }}>I am nested so deep I can see stuff</p>;
}
