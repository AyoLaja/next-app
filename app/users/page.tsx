import Link from 'next/link';
import UserTable from './UserTable';
import { Suspense } from 'react';

interface UsersPageProps {
  searchParams: {
    sortOrder: string;
  };
}

export default async function Users({ searchParams }: UsersPageProps) {
  const { sortOrder } = await searchParams;

  return (
    <div>
      <h1>Users</h1>
      <Link href='/users/new' className='btn btn-primary'>
        New User
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </div>
  );
}
