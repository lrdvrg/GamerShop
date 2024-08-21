export const fetchGames = async (actualPage: number, selectedFilter: string): Promise<any> => {
  try {
    const response = await fetch(`/api/games?page=${actualPage}&genre=${selectedFilter}`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetchData:', error);
    throw error; // Lanzar el error para manejarlo en el componente
  }
};
