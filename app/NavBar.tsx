import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='flex bg-blue-400 p-5 gap-4'>
      <Link href='/'>Home</Link>
      <Link href='/users'>Users</Link>
      <Link href='/admin'>Admin</Link>
    </nav>
  );
}
