'use client';
import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import useLocalStorage from '@/services/useLocalStorage';
import { availableFilters, Game } from '@/utils/endpoint';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { fetchGames } from '../services/fetchGames';

export default function Home() {
  const searchParams = useSearchParams();
  const defaultFilter = searchParams.get('genre') ?? '';

  const [products, setProducts] = useState<Array<Game>>([]);

  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [localStorageProducts, setLocalStorageProducts] = useLocalStorage('products', []);

  const previousSelectedFilter = useRef<string>();
  const previousActualPage = useRef<number>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (products.length === 0) {
      setIsLoading(true);
    } else {
      setIsButtonLoading(true);
    }

    const loadData = async () => {
      try {
        const response = await fetchGames(actualPage, selectedFilter, signal);

        if (!signal.aborted) {
          if (previousSelectedFilter.current !== selectedFilter) {
            setProducts([...response.games]);
            setTotalPages(response.totalPages);
          } else {
            setProducts((prevProducts) => [...prevProducts, ...response.games]);
            setTotalPages(response.totalPages);
          }
        }
        previousSelectedFilter.current = selectedFilter;
        previousActualPage.current = actualPage;
      } catch (error) {
        setIsLoading(false);
        setIsButtonLoading(false);
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error(error);
        }
      } finally {
        if (!signal.aborted) {
          setIsButtonLoading(false);
          setIsLoading(false);
        }
      }
    };

    if (selectedFilter || actualPage) {
      loadData();
    }

    return () => {
      controller.abort();
    };
  }, [selectedFilter, actualPage]);

  const seeMorePages = () => {
    setActualPage(actualPage + 1);
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
                <Filter defaultFilter={selectedFilter} updateFilter={setSelectedFilter} updatePage={setActualPage} selectOptions={availableFilters}></Filter>
              </div>
            </div>
          </div>
          <hr className='border-t border-gray-100' />
          <div className='px-5 lg:px-32 py-12'>
            <ProductList products={products} displayType='grid' localStorageProducts={localStorageProducts} setLocalStorageProducts={setLocalStorageProducts}></ProductList>
            {(isButtonLoading || actualPage < totalPages) && (
              <button onClick={seeMorePages} className='bg-zinc-600 hover:bg-zinc-700 font-bold rounded-md text-white px-6 py-4 mt-12'>
                {!isButtonLoading ? 'SEE MORE' : <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-white' />}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
