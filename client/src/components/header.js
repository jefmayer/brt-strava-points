import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about/">About</Link>
          </li>
          <li>
            <Link href="/request-access/">Request Access</Link>
          </li>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
