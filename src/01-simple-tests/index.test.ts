// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const wrongArgString = 'wrong argument';
const wrongArgUndefined = undefined;
const wrongArgObject = { k: 'kmon' };

const correctArg1 = 6;
const correctArg2 = 3;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({ a: correctArg1, b: correctArg2, action: Action.Add }),
    ).toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: correctArg1,
        b: correctArg2,
        action: Action.Subtract,
      }),
    ).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: correctArg1,
        b: correctArg2,
        action: Action.Multiply,
      }),
    ).toBe(18);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: correctArg1,
        b: correctArg2,
        action: Action.Divide,
      }),
    ).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: correctArg1,
        b: correctArg2,
        action: Action.Exponentiate,
      }),
    ).toBe(216);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 4,
        b: 5,
        action: wrongArgObject,
      }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: wrongArgString,
        b: wrongArgUndefined,
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
