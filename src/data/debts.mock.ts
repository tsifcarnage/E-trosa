import type { IDebts } from "../models/debts.interfaces";
import * as calc from "../utils/debts.calculation";
import { calcStatus } from "../utils/debts.logic";

const createDebt = (
  creditor: string,
  amount: number,
  paid: number,
  rate: number,
  dueDate: string,
): IDebts => {
  const interest = calc.calcInterestAmount(amount, rate);
  const remaining = calc.calcRemainingAmount(amount, rate, paid);

  return {
    creditor: creditor,
    debtAmount: amount,
    dueDate: dueDate,
    interestRate: rate,
    paidAmount: paid,
    interestAmount: interest,
    remainingAmount: remaining,
    status: calcStatus(remaining, paid, dueDate),
  };
};

export const MOCK_DEBT: IDebts[] = [
  createDebt("Tsifcarnage", 1000, 900, 5, "2026-12-01"),
  createDebt("Paul", 800, 0, 0, "2025-12-31"),
  createDebt("Kyara", 100, 103, 3, "2024-10-10"),
  createDebt("kaka", 8000, 0, 5, "2026-04-27"),
];
