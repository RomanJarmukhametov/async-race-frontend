import axios from 'axios';
import getBackendUrl from '@/lib/getBackendUrl';

const apiClient = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * This TypeScript function starts the engine by sending a PATCH request to the API with the specified
 * engine ID and status.
 * @param {number} id - The `id` parameter is a number that represents the identifier of the engine
 * that you want to start.
 * @returns The function `startEngine` is returning the data from the response of the API call made
 * using `apiClient.patch`.
 */
const startEngine = async (id: number) => {
  const response = await apiClient.patch(`/engine?id=${id}&status=started`);
  return response.data;
};

/**
 * This async function stops the engine with the specified ID by sending a PATCH request to the API
 * endpoint.
 * @param {number} id - The `id` parameter in the `stopEngine` function is a number that represents the
 * unique identifier of the engine that needs to be stopped.
 * @returns The function `stopEngine` is returning the data from the response of the API call made
 * using `apiClient.patch`.
 */
const stopEngine = async (id: number) => {
  const response = await apiClient.patch(`/engine?id=${id}&status=stopped`);
  return response.data;
};

export { startEngine, stopEngine };
