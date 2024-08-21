import { Game } from '@/utils/endpoint';
import React from 'react';

interface Props {
  products: Game[];
}

const OrdenSummary = ({ products }: Props) => {
  return (
    <>
      <div className='border rounded-lg border-neutral-400 p-6'>
        <h2 className='text-2xl font-bold'>Order Summary</h2>
        <h5 className='text-lg pt-3'>3 Items</h5>
        <ul className='list-none pt-10 text-lg'>
          {products.map((product) => (
            <li className='flex justify-between pb-3'>
              <span>{product.name}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
        <hr className='border-t mt-3 pb-5 border-neutral-400' />
        <p className='font-bold flex justify-between text-xl'>
          <span>Order Total</span>
          <span>${products.reduce((accumulator, item) => accumulator + item.price, 0)}</span>
        </p>
      </div>
      <button className='w-full bg-zinc-600 hover:bg-zinc-700 font-bold rounded-md text-white px-6 py-4 mt-8'>Checkout</button>
    </>
  );
};

export default OrdenSummary;
