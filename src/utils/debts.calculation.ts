import type { IDebts } from "../models/debts.interfaces";
/**
 * Calcul sur un seul montant de la dette
 * @param amount
 * @param rate
 * @returns
 */

export const calcInterestAmount = (amount: number, rate: number): number => {
  return amount * (rate / 100);
};

export const calcTotalToPay = (amount: number, rate: number): number => {
  return amount + calcInterestAmount(amount, rate);
};

export const calcRemainingAmount = (
  amount: number,
  rate: number,
  paid: number,
): number => {
  return calcTotalToPay(amount, rate) - paid;
};

/**
 * Calcul sur plusieur dettes
 * @param debtAmount
 * @returns total
 */

export const totalDebt = (debtAmount: IDebts[]) => {
  return debtAmount.reduce(
    (acc, curr) => acc + calcTotalToPay(curr.debtAmount, curr.interestRate),
    0,
  );
};

export const totalPaidAmount = (paidAmount: IDebts[]) => {
  return paidAmount.reduce((acc, curr) => acc + curr.paidAmount, 0);
};

export const totalRemainAmount = (remainAmount: IDebts[]) => {
  return remainAmount.reduce(
    (acc, curr) =>
      acc +
      calcRemainingAmount(curr.debtAmount, curr.interestRate, curr.paidAmount),
    0,
  );
};

export const numberCreditor = (nbrCreditor: IDebts[]) => {
  return new Set(nbrCreditor.map((nbr) => nbr.creditor)).size;
};
