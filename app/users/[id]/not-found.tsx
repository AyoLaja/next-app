import Link from 'next/link';

export default function UserNotFound() {
  return (
    <div>
      <h1>User Not Found</h1>
      <p>
        The user you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href='/users' className='btn btn-primary'>
        Go to Users
      </Link>
    </div>
  );
}
