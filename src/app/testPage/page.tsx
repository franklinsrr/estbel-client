import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h1>its alive</h1>
      <Link href="/about">About</Link>
      <Link href="/home">Home</Link>
      <Link href="/home">Dashboard</Link>
    </div>
  );
}
