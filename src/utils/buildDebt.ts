import type { IDebts, INewDebt } from "../models/debts.interfaces";
import { calcStatus } from "./debts.logic";
import * as calc from "../utils/debts.calculation";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";

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

  if (today > deadline) {
    finalRate += 2;
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

export const addDebt = (
  e: React.SubmitEvent,
  formData: INewDebt,
  onClose: () => void,
  onDebtAdded: (d: IDebts) => void,
) => {
  e.preventDefault();

  const newDebt = createDebt(
    formData.creditor,
    Number(formData.debtAmount),
    0,
    Number(formData.interestRate),
    formData.dueDate,
  );

  const mutableDebts = [...MOCK_DEBT];
  mutableDebts.push(newDebt);
  onDebtAdded(newDebt);
  console.log("Nouvelle dette ajoutée :", newDebt);

  onClose();
};

export const addReceive = (
  e: React.SubmitEvent,
  formData: INewDebt,
  onClose: () => void,
  onDebtAdded: (d: IDebts) => void,
) => {
  e.preventDefault();

  const newDebt = createDebt(
    formData.creditor,
    Number(formData.debtAmount),
    0,
    Number(formData.interestRate),
    formData.dueDate,
  );

  const mutableDebts = [...MOCK_RECEIVABLES];
  mutableDebts.push(newDebt);
  onDebtAdded(newDebt);
  console.log("Nouvelle dette ajoutée :", newDebt);

  onClose();
};