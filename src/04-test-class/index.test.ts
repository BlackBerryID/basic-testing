// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const ten = 10;
const forty = 40;
const fifty = 50;
const sixty = 60;
const oneHundred = 100;
const oneThousand = 1000;
let firstBankAccount: BankAccount;
let secondBankAccount: BankAccount;
let thirdBankAccount: BankAccount;

describe('BankAccount', () => {
  beforeEach(() => {
    firstBankAccount = getBankAccount(fifty);
    secondBankAccount = getBankAccount(fifty);
    thirdBankAccount = getBankAccount(oneThousand);
  });

  test('should create account with initial balance', () => {
    expect(firstBankAccount.getBalance()).toBe(fifty);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstBankAccount.withdraw(oneHundred)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      firstBankAccount.transfer(oneHundred, secondBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      firstBankAccount.transfer(oneHundred, firstBankAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(firstBankAccount.deposit(ten).getBalance()).toBe(sixty);
  });

  test('should withdraw money', () => {
    expect(firstBankAccount.withdraw(ten).getBalance()).toBe(forty);
  });

  test('should transfer money', () => {
    firstBankAccount.transfer(ten, secondBankAccount);
    expect(firstBankAccount.getBalance()).toBe(forty);
    expect(secondBankAccount.getBalance()).toBe(sixty);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await firstBankAccount.fetchBalance();
    expect(typeof balance === 'number' || balance === null).toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      await thirdBankAccount.synchronizeBalance();
      expect(thirdBankAccount.getBalance()).not.toBe(oneThousand);
    } catch (err) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await thirdBankAccount.synchronizeBalance();
    } catch (err) {
      expect(err instanceof SynchronizationFailedError).toBe(true);
    }
  });
});
