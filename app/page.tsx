import { getServerSession } from 'next-auth';
import Image from 'next/image';

import { authOptions } from './api/auth/[...nextauth]/route';
import collectionsImage from '@/public/images/collections_image.png';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex flex-col gap-4'>
      <h1>Home</h1>
      {session && <p>Hello, {session.user?.name}</p>}

      <main>
        <Image
          src={collectionsImage}
          // src='https://bit.ly/react-cover'
          alt='collections'
          width={100}
          height={100}
          // fill
        />
      </main>
    </div>
  );
}
