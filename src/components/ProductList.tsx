import { Game } from '@/utils/endpoint';
import React from 'react';
import Image from 'next/image';
import useLocalStorage from '@/services/useLocalStorage';

interface Props {
  products: Game[];
  displayType?: 'grid' | 'list';
  handleProductsCart: (product: Game) => void;
  isInCart: (productId: string) => boolean;
}
const ProductList = ({ products, handleProductsCart, isInCart, displayType }: Props) => {
  return (
    <>
      {displayType === 'grid' ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {products.map((product) => (
            <article className='flex flex-col justify-between border border-neutral-400 rounded-xl p-6' key={product.id}>
              <div>
                <div className='relative h-60'>
                  {product.isNew && <div className='absolute float-left py-1 px-2 m-3 text-sm rounded bg-stone-100 text-neutral-700 z-40'>New</div>}
                  <Image className='rounded-t-xl z-10' src={product.image} alt={product.name} fill={true}></Image>
                </div>
                <h3 className='font-bold text-neutral-500 uppercase text-base mt-3'>{product.genre}</h3>
                <p className='flex justify-between font-bold text-lg text-neutral-700 mt-2 mb-4'>
                  <span className=''>{product.name}</span>
                  <span className='text-xl'>${product.price}</span>
                </p>
              </div>
              <button
                onClick={() => handleProductsCart(product)}
                className={'w-full border font-bold rounded-md p-4 ' + (isInCart(product.id) ? 'bg-zinc-600 hover:bg-zinc-700 text-white ' : 'hover:bg-zinc-100 border-neutral-700 text-neutral-700 ')}
              >
                {isInCart(product.id) ? 'REMOVE' : 'ADD TO CART'}
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-5'>
          {products.map((product, index) => (
            <div>
              <article className='flex flex-row justify-between p-6' key={product.id}>
                <div className='flex flex-row flex-grow'>
                  <div className='relative min-w-64 h-[156px] mr-8'>
                    {product.isNew && <div className='absolute float-left py-1 px-2 m-3 text-sm rounded bg-stone-100 text-neutral-700 z-40'>New</div>}
                    <Image className='z-10' src={product.image} alt={product.name} fill={true}></Image>
                  </div>
                  <div className='flex justify-between flex-grow'>
                    <div className=''>
                      <h3 className='font-bold text-neutral-500 uppercase text-base mt-3'>{product.genre}</h3>
                      <p className='font-bold text-lg text-neutral-700 my-2'>{product.name}</p>
                      <p className='text-md text-neutral-500'>{product.description}</p>
                    </div>
                    <span className='font-bold text-lg text-neutral-700 content-end'>${product.price}</span>
                  </div>
                </div>
                <button onClick={() => handleProductsCart(product)} className='self-start text-zync-600'>
                  x
                </button>
              </article>
              {products.length > index + 1 && <hr className='border-t border-neutral-400' />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
