'use client';

import ProductList from '@/components/ProductList';
import useLocalStorage from '@/services/useLocalStorage';
import { Game } from '@/utils/endpoint';
import Image from 'next/image';
import Link from 'next/link';
import OrdenSummary from '../../components/OrdenSummary';

const Cart = () => {
  const [localStorageProducts, setLocalStorageProducts] = useLocalStorage('products', []);

  return (
    <>
      <div className='px-2 md:px-5 lg:px-32 text-neutral-700 flex flex-col flex-grow'>
        <Link className='flex py-8' href={'/'}>
          <Image src={'/arrow-left.svg'} alt='Go Back Icon' width={24} height={24}></Image>
          <span className='ml-2'>Back to Catalog</span>
        </Link>
        <div>
          {localStorageProducts?.length < 1 ? (
            <div className='py-12 '>
              <h1 className='text-4xl font-bold'>Your Cart is empty...</h1>
              <h3 className='text-2xl font-normal pt-6'>
                Add games from the{' '}
                <Link className='font-semibold' href={'/'}>
                  catalog
                </Link>
              </h3>
            </div>
          ) : (
            <div>
              <div className='py-12'>
                <h1 className='text-4xl font-bold'>Your Cart</h1>
                <h3 className='text-2xl font-normal pt-6'>{localStorageProducts?.length} items</h3>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-12 pb-16'>
                <div className='lg:col-span-7'>
                  <ProductList displayType='list' products={localStorageProducts as Game[]} localStorageProducts={localStorageProducts} setLocalStorageProducts={setLocalStorageProducts}></ProductList>
                </div>
                <div className='lg:col-span-5 lg:pl-12'>
                  <OrdenSummary products={localStorageProducts as Game[]}></OrdenSummary>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
