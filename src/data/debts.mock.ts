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
  createDebt("Kaka", 8000, 0, 5, "2026-04-27"),
  createDebt("Tony", 500, 400, 5, "2026-04-27"),
  createDebt("Serge", 8000, 1000, 5, "2026-04-27"),
  createDebt("Cafard", 8000, 0, 5, "2024-04-27"),
  createDebt("Miggles", 8000, 0, 5, "2026-04-27"),
  createDebt("Fifi", 50, 50, 3, "2026-04-27"),
  createDebt("Riri", 50, 50, 3, "2026-04-27"),
  createDebt("Loulou", 50, 50, 3, "2026-04-27"),
];
