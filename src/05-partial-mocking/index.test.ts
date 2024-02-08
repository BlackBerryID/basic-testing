// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return originalModule;
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockedFunc = jest.fn();
    console.log = mockedFunc;

    mockOne();
    mockTwo();
    mockThree();

    expect(mockedFunc).toHaveBeenCalledTimes(3);

    mockedFunc.mockRestore();

    expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
