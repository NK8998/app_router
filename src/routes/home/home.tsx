import Link from "../../AppRouter/components/link";

export default function Home() {
  return (
    <div className='home-container'>
      <Link href='/watch'>Watch page</Link>
      <Link href='/channel/@WebDevSimplified/content'>WebDevSimplified</Link>
      <h1>This is the home page</h1>
      <div className='moving-ball'></div>
    </div>
  );
}
