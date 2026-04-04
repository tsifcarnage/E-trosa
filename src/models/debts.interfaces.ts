import type { Actions } from "../enums/actions.enum";
import type { Status } from "../enums/status.enum";

export interface IDebts {
  creditor: string;
  debtAmount: number;
  paidAmount: number; // NB: ce que j'ai deja rembourser
  interestRate: number;
  interestAmount?: number;
  remainingAmount?: number;
  status?: Status;
  actions?: Actions;
}
