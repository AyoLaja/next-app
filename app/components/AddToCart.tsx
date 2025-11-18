'use client';

export default function AddToCart() {
  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <button className='btn btn-primary' onClick={handleClick}>
      Add to cart
    </button>
  );
}
