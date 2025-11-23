'use client';

import { useState } from 'react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import dynamic from 'next/dynamic';
// import _ from 'lodash';

import { authOptions } from './api/auth/authOptions';
import collectionsImage from '@/public/images/rewwind_logos/Transparent PNG and Hi-res JPG/JPG-03.jpg';
// import HeavyComponent from './components/HeavyComponent';

// const HeavyComponent = dynamic(() => import('./components/HeavyComponent'), {
//   // ssr: false,
//   loading: () => <div>Loading...</div>,
// });

export default function Home() {
  // const session = await getServerSession(authOptions);
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const handleShowHeavyComponent = () => {
    setShowHeavyComponent(!showHeavyComponent);
  };

  const handleClick = async () => {
    const lodash = (await import('lodash')).default;
    const users = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      },
      {
        name: 'Jim Doe',
        email: 'jim.doe@example.com',
      },
    ];

    const sortedUsers = lodash.sortBy(users, 'name');

    console.log(sortedUsers);
  };

  return (
    // <div className='flex flex-col gap-4'>
    //   <h1>Home</h1>
    //   {session && <p>Hello, {session.user?.name}</p>}

    <div className='relative h-screen'>
      {/* {showHeavyComponent && <HeavyComponent />} */}
      {/* <button className='btn btn-accent' onClick={handleShowHeavyComponent}> */}
      <button className='btn btn-accent' onClick={handleClick}>
        Show Heavy Component
      </button>
      <Image
        src={collectionsImage}
        alt='collections'
        width={100}
        height={100}
        // className='object-cover'
        sizes='(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw'
        quality={100}
        priority
        // fill
      />
    </div>
    // </div>
  );
}
