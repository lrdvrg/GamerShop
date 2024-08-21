'use client';

import ProductList from '@/components/ProductList';
import useLocalStorage from '@/services/useLocalStorage';
import { Game } from '@/utils/endpoint';
import Image from 'next/image';
import Link from 'next/link';
import OrdenSummary from '../../components/OrdenSummary';

const Cart = () => {
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

  const isInCart = (productId: string): boolean => {
    return localStorageProducts.find((localStorageProduct: Game) => localStorageProduct.id === productId);
  };

  return (
    <>
      <div className='px-5 lg:px-32 text-neutral-700'>
        <Link className='flex py-8' href={'/'}>
          <Image src={'/arrow-left.svg'} alt='Go Back Icon' width={24} height={24}></Image>
          <span className='ml-2'>Back to Catalog</span>
        </Link>
        <div className='py-12'>
          <h1 className='text-4xl font-bold'>Your Cart</h1>
          <h3 className='text-2xl font-normal pt-6'>{localStorageProducts.length} items</h3>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-7'>
            <ProductList displayType='list' products={localStorageProducts as Game[]} isInCart={isInCart} handleProductsCart={handleProductsCart}></ProductList>
          </div>
          <div className='col-span-5 pl-12'>
            <OrdenSummary products={localStorageProducts as Game[]}></OrdenSummary>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
