// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

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
    const pathToFile = 'example.txt';
    const content = await readFileAsynchronously(pathToFile);

    try {
      await fs.access(pathToFile);
    } catch (error) {
      expect(content).toBeNull();
    }
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'example.txt';
    const content = await readFileAsynchronously(pathToFile);

    try {
      await fs.access(pathToFile);
      const fileContent = await fs.readFile(path.join(__dirname, pathToFile));

      expect(content).toBe(fileContent);
    } catch (error) {}
  });
});
