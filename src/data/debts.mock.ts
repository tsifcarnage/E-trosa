import { Status } from "../enums/status.enum";
import type { IDebts } from "../models/debts.interfaces";

const createDebt = (
  creditor: string,
  amount: number,
  paid: number,
  rate: number,
): IDebts => {
  const interest = amount * (rate / 100);
  const totalToPay = amount + interest;
  const remaining = totalToPay - paid;

  // LOGIQUE DE CALCUL DU STATUS
  let computedStatus: Status;

  if (remaining <= 0) {
    computedStatus = Status.PAID;
  } else if (paid > 0) {
    computedStatus = Status.IN_PROGRESS;
  } else {
    computedStatus = Status.LATE;
  }

  return {
    creditor: creditor,
    debtAmount: amount,
    interestRate: rate,
    paidAmount: paid,
    interestAmount: interest,
    remainingAmount: remaining,
    status: computedStatus,
  };
};

export const MOCK_DEBT: IDebts[] = [
  createDebt("Tsifcarnage", 1000, 200, 5),
  createDebt("Paul", 800, 0, 0),
  createDebt("Carla", 100, 105, 3),
];
