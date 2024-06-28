/* This TypeScript code defines an interface named `GetWinnersParams` that specifies the parameters
that can be used to retrieve winners. The interface includes optional properties such as `page`,
`limit`, `sort`, and `order`. */
interface GetWinnersParams {
  page: number;
  limit: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
  id: number;
  wins: number;
  time: string;
}

export default GetWinnersParams;
