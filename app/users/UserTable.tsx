import Link from 'next/link';
import { sort } from 'fast-sort';

import ProductCard from '../components/ProductCard';
import { User } from '../types';

interface UserTableProps {
  sortOrder: string;
}

export default async function UserTable({ sortOrder }: UserTableProps) {
  const usersResponse = await fetch(
    'https://jsonplaceholder.typicode.com/users',
    { cache: 'no-store' }
    // { next: { revalidate: 10 } } // Gets data from BE every 10 seconds
  );
  const users: User[] = await usersResponse.json();

  const sortedUsers = sort(users).asc(
    sortOrder === 'name' ? (user) => user.name : (user) => user.email
  );

  return (
    <div>
      <table className='table table-zebra table-pin-cols table-bordered'>
        <thead>
          <tr>
            <th>
              <Link href='/users?sortOrder=name'>Name</Link>
            </th>
            <th>
              <Link href='/users?sortOrder=email'>Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user: User) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductCard />
    </div>
  );
}
