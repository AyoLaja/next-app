import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex flex-col gap-4'>
      <h1>Home</h1>
      {session && <p>Hello, {session.user?.name}</p>}
    </div>
  );
}
