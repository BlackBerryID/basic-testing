// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const mockedData = 'lorem ipsum...';

jest.mock('axios', () => ({
  create: () => ({
    get: (path: string) => ({
      data: {
        path,
        mockedData,
      },
    }),
  }),
}));

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/posts';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spyCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relativePath);

    expect(spyCreate).toHaveBeenLastCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    expect(response.path).toBe(relativePath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    expect(response.mockedData).toEqual(mockedData);
  });
});
