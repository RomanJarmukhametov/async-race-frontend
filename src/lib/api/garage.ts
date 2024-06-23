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
const getCars = async (page: number, limit = 7) => {
  try {
    const response = await apiClient.get(`/garage`, {
      params: {
        _page: page,
        _limit: limit,
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

/**
 * The `updateCar` function asynchronously updates a car in the garage using PUT request with the
 * provided data.
 * @param {number} id - The `id` parameter in the `updateCar` function is a number that represents the
 * unique identifier of the car that you want to update in the garage.
 * @param {CarProps} data - The `data` parameter in the `updateCar` function refers to an object
 * containing properties of a car that you want to update. This object should have the following
 * structure based on the `CarProps` type:
 * @returns The function `updateCar` is returning the data from the response of the PUT request made to
 * the API endpoint `/garage/` with the provided `data`.
 */
const updateCar = async (id: number, name: string, color: string) => {
  const response = await apiClient.put(`/garage/${id}`, { name, color });
  return response.data;
};

/**
 * The function `deleteCar` asynchronously deletes a car from the garage using the provided `id`.
 * @param {number} id - The `id` parameter in the `deleteCar` function is a number that represents the
 * unique identifier of the car that needs to be deleted from the garage.
 * @returns The function `deleteCar` is returning the data from the response of the DELETE request made
 * to the API endpoint `/garage/`.
 */
const deleteCar = async (id: number) => {
  const response = await apiClient.delete(`/garage/${id}`);
  return response.data;
};

/**
 * The `getCarById` function asynchronously fetches a car from the garage by its ID.
 * @param {number} id - The `id` parameter in the `getCarById` function is a number that represents the
 * unique identifier of the car that you want to fetch from the garage.
 * @returns The function `getCarById` is returning the data from the response of the GET request made to
 * the API endpoint `/garage/` with the provided `id`.
 */
const getCarById = async (id: number) => {
  const response = await apiClient.get(`/garage/${id}`);
  return response.data;
};

export { getCars, getCarById, updateCar, deleteCar };
