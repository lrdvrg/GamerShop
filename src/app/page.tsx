'use client';
import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import useLocalStorage from '@/services/useLocalStorage';
import { availableFilters, Game } from '@/utils/endpoint';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchGames } from './api/fetchGames';

export default function Home() {
  const searchParams = useSearchParams();
  const defaultFilter = searchParams.get('genre') ?? '';

  const [products, setProducts] = useState<Array<Game>>([]);

  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [localStorageProducts, setLocalStorageProducts] = useLocalStorage('products', []);

  useEffect(() => {
    const loadData = async () => {
      setIsError(false);
      try {
        const response = await fetchGames(actualPage, selectedFilter);
        setProducts([...products, ...response.games]);
        setTotalPages(response.totalPages);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedFilter || actualPage) {
      loadData();
    }
  }, [selectedFilter, actualPage]);

  const seeMorePages = () => {
    setActualPage(actualPage + 1);
  };

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
      {isLoading ? (
        <div className='flex flex-grow justify-center items-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-neutral-700' />
        </div>
      ) : (
        <div>
          <div className='px-5 lg:px-32 py-12'>
            <h1 className='text-neutral-700 text-4xl font-bold'>Top Sellers</h1>
            <div className='flex justify-end pt-12'>
              <h3 className='font-bold'>GENRE</h3> <span className='px-4'>|</span>
              <div className='pl-2'>
                <Filter defaultFilter={defaultFilter} updateFilter={setSelectedFilter} selectOptions={availableFilters}></Filter>
              </div>
            </div>
          </div>
          <hr className='border-t border-gray-100' />
          <div className='px-5 lg:px-32 py-12'>
            <ProductList products={products} displayType='grid' isInCart={isInCart} handleProductsCart={handleProductsCart}></ProductList>
            {actualPage < totalPages && (
              <button onClick={seeMorePages} className='bg-zinc-600 hover:bg-zinc-700 font-bold rounded-md text-white px-6 py-4 mt-12'>
                SEE MORE
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
