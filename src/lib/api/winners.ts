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

export { getWinners };
