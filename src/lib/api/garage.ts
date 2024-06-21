import axios from 'axios';
import getBackendUrl from '@/lib/getBackendUrl';

const apiClient = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * The function `getCars` asynchronously fetches a list of cars from an API with pagination support.
 * @param [page=1] - The `page` parameter is used to specify the page number of results to retrieve
 * from the API. It determines which page of data to fetch from the `/garage` endpoint. By default, if
 * no `page` parameter is provided, the function will fetch the first page of results.
 * @param [limit=7] - The `limit` parameter in the `getCars` function specifies the maximum number of
 * cars to be retrieved from the API in a single request. By default, if no `limit` is provided when
 * calling the function, it will retrieve up to 7 cars per page. This limit helps in controlling
 * the amount of data returned from the API.
 */
const getCars = async (page = 1, limit = 7) => {
  try {
    const response = await apiClient.get(`/garage`, {
      params: {
        _page: page,
        _limit: limit,
      },
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    return {
      data: response.data,
      totalCount: response.headers['x-total-count'],
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

const getCarById = async (id: number) => {
  const response = await apiClient.get(`/garage/${id}`);
  return response.data;
};

export { getCars, getCarById };
