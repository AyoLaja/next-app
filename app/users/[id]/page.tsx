import React from 'react';
import { User } from '@/app/types';
import { notFound } from 'next/navigation';

interface UserPageProps {
  params: {
    id: number;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  if (id > 10) {
    notFound();
  }

  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user: User = await userResponse.json();

  return <div>User {user.name}</div>;
}
