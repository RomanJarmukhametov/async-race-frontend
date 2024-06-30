import axios from 'axios';
import getBackendUrl from '@/lib/getBackendUrl';
import GetWinnersParams from '@/types/GetWinnersParams';

const apiClient = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

/* This function is used to fetch winners from the server. It takes an object of type `GetWinnersParams`
as an argument and returns a promise that resolves to an object containing the winners data and the
total count of winners. */
const getWinners = async ({ page, limit, sort, order }: GetWinnersParams) => {
  try {
    const response = await apiClient.get(`/winners`, {
      params: {
        _page: page,
        _limit: limit,
        _sort: sort,
        _order: order,
      },
    });

    return {
      data: response.data,
      totalCount: response.headers['x-total-count'],
    };
  } catch (error) {
    console.error('Error fetching winners:', error);
    throw error;
  }
};

/* This function is used to delete a winner from the server. It takes an id as an argument and returns a promise that resolves to an object containing the winners data and the
total count of winners. */
const deleteWinner = async (id: number) => {
  const response = await apiClient.delete(`/winners/${id}`);
  return response.data;
};

/* This function is used to create a winner on the server. It takes an object of type `Winner` as an argument and returns a promise that resolves to an object containing the winners data and the
total count of winners. */
const createWinner = async ({
  id,
  wins,
  time,
}: {
  id: number;
  wins: number;
  time: number;
}) => {
  const response = await apiClient.post('/winners', { id, wins, time });
  return response.data;
};

/* This function is used to update a winner on the server. It takes an object of type `Winner` as an argument and returns a promise that resolves to an object containing the winners data and the
total count of winners. */
const updateWinner = async ({
  id,
  wins,
  time,
}: {
  id: number;
  wins: number;
  time: number;
}) => {
  const response = await apiClient.put(`/winners/${id}`, { wins, time });
  return response.data;
};

const getWinnerByCarId = async (id: number) => {
  const response = await apiClient.get(`/winners/${id}`);
  return response.data;
};

export {
  getWinners,
  deleteWinner,
  createWinner,
  updateWinner,
  getWinnerByCarId,
};
