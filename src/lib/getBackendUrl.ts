/**
 * The function `getBackendUrl` returns the backend URL from the environment variable
 * `NEXT_PUBLIC_BACKEND_URL` or a default URL if the variable is not set.
 * @returns The function `getBackendUrl` returns the value of the environment variable
 * `NEXT_PUBLIC_BACKEND_URL` if it is defined, otherwise it returns the default value
 * `'http://127.0.0.1:1337'`.
 */
const getBackendUrl = () =>
  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://127.0.0.1:3000';

export default getBackendUrl;
