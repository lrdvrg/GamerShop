import { Game } from '@/utils/endpoint';
import React from 'react';
import Image from 'next/image';
import useLocalStorage from '@/services/useLocalStorage';

interface Props {
  products: Game[];
}
const ProductList = ({ products }: Props) => {
  const [localStorageProducts, setLocalStorageProducts] = useLocalStorage('products', []);

  const handleProductsCart = (product: Game) => {
    if (isInCart(product.id)) {
      const newLocalStorageProducts = (localStorageProducts as Game[]).filter((localStorageProduct) => localStorageProduct.id !== product.id);
      setLocalStorageProducts(newLocalStorageProducts);
    } else {
      const newLocalStorageProducts = [...localStorageProducts, product];
      setLocalStorageProducts(newLocalStorageProducts);
    }
  };

  const isInCart = (productId: string) => {
    return localStorageProducts.find((localStorageProduct: Game) => localStorageProduct.id === productId);
  };

  return (
    <>
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
    </>
  );
};

export default ProductList;
