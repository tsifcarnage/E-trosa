import type { IDebts } from "../models/debts.interfaces";
import { calcStatus } from "./debts.logic";
import * as calc from "../utils/debts.calculation";

export const createDebt = (
  creditor: string,
  amount: number,
  paid: number,
  rate: number,
  dueDate: string,
): IDebts => {
  const today = new Date();
  const deadline = new Date(dueDate);
  let finalRate = rate;
  
  if(today>deadline){
    finalRate+=2;
  }
  const interest = calc.calcInterestAmount(amount, finalRate);
  const remaining = calc.calcRemainingAmount(amount, finalRate, paid);
  return {
    id: crypto.randomUUID(),
    creditor: creditor,
    debtAmount: amount,
    dueDate: dueDate,
    interestRate: finalRate,
    paidAmount: paid,
    interestAmount: interest,
    remainingAmount: remaining,
    status: calcStatus(remaining, paid, dueDate),
  };
};

