// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path = require('path');

const trueFileNameExample = 'true-example.txt';
const falseFileNameExample = 'false-example.txt';
const trueFileContent = 'lorem ipsum...';
const falseFileContent = 'no content because there is no such file';

jest.mock('fs', () => ({
  existsSync: (path: string) => path.includes(trueFileNameExample),
}));

jest.mock('fs/promises', () => ({
  readFile: async (path: string) =>
    path.includes(trueFileNameExample) ? trueFileContent : falseFileContent,
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');
    const mockFunc = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(mockFunc, timeout);

    expect(spySetTimeout).toBeCalledTimes(1);
    expect(spySetTimeout).toHaveBeenLastCalledWith(mockFunc, timeout);
  });

  test('should call callback only after timeout', () => {
    const mockFunc = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(mockFunc, timeout);

    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(mockFunc).toHaveBeenCalled();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval');
    const mockFunc = jest.fn();
    const timeout = 1000;
    doStuffByInterval(mockFunc, timeout);

    expect(spySetInterval).toBeCalledTimes(1);
    expect(spySetInterval).toHaveBeenLastCalledWith(mockFunc, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFunc = jest.fn();
    const timeout = 1000;

    doStuffByInterval(mockFunc, timeout);

    expect(mockFunc).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(mockFunc).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout);
    expect(mockFunc).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(timeout);
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');
    const pathToFile = 'example.txt';
    await readFileAsynchronously(pathToFile);

    expect(spyJoin).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously(falseFileNameExample);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = await readFileAsynchronously(trueFileNameExample);
    expect(content).toBe(trueFileContent);
  });
});
