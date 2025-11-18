import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>
        The resource you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href='/' className='btn btn-primary'>
        Go to Home
      </Link>
    </div>
  );
}
