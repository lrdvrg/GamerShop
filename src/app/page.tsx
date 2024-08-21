'use client';
import { availableFilters, Game } from '@/utils/endpoint';
import { act, useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import Filter from '@/components/Filter';
import { fetchGames } from './api/fetchGames';
import { useParams, useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const defaultFilter = searchParams.get('genre') ?? '';
  const [products, setProducts] = useState<Array<Game>>([]);

  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);

  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  return (
    <>
      {isLoading ? (
        <div className='flex flex-grow justify-center items-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-b-2 border-neutral-700' />
        </div>
      ) : (
        <div>
          <div className='px-5 lg:px-32 py-12'>
            <h1 className='text-neutral-700 text-4xl font-bold'>Top Sellers {isLoading}</h1>
            <div className='flex justify-end pt-12'>
              <h3 className='font-bold'>GENRE</h3> <span className='px-4'>|</span>
              <div className='pl-2'>
                <Filter defaultFilter={defaultFilter} updateFilter={setSelectedFilter} selectOptions={availableFilters}></Filter>
              </div>
            </div>
          </div>
          <hr className='border-t border-gray-100' />
          <div className='px-5 lg:px-32 py-12'>
            <ProductList products={products}></ProductList>
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
