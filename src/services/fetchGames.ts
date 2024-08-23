export const fetchGames = async (actualPage: number, selectedFilter: string): Promise<any> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?page=${actualPage}&genre=${selectedFilter}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
