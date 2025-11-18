'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  console.log(error);
  return (
    <div>
      <h1>Error</h1>
      <p>An error occurred</p>
      <button onClick={() => reset()} className='btn btn-primary'>
        Reload
      </button>
    </div>
  );
}
