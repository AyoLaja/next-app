'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className='flex bg-blue-400 p-5 justify-between'>
      <div className='flex gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/users'>Users</Link>
        <Link href='/admin'>Admin</Link>
        <Link href='/upload'>Upload</Link>
        {status === 'authenticated' ? (
          <Link href='api/auth/signout'>Sign Out</Link>
        ) : (
          <Link href='api/auth/signin'>Sign In</Link>
        )}
      </div>
      {status === 'authenticated' && <p>Welcome, {session.user?.name}</p>}
    </nav>
  );
}
