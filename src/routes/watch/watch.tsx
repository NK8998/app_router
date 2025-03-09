import Link from "../../AppRouter/components/link";

export default function Watch() {
  return (
    <div className='watch-page'>
      <h1>This is the watch page</h1>
      <Link href='/watch?v=uiBUOn34'>First item</Link>
      <Link href='/watch?v=uiBUOn39'>Second item</Link>
    </div>
  );
}
