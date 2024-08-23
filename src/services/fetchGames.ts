export const fetchGames = async (actualPage: number, selectedFilter: string, signal: AbortSignal): Promise<any> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?page=${actualPage}&genre=${selectedFilter}`, { signal });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Request was aborted', error);
    } else {
      console.error(error);
    }
    throw error;
  }
};
