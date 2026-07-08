import type { Actions } from "../enums/actions.enum";
import type { Status } from "../enums/status.enum";

export interface IDebts {
  id: string;
  creditor: string;
  debtAmount: number;
  paidAmount: number; // NB: ce que j'ai deja rembourser
  dueDate: string;
  interestRate: number;
  interestAmount?: number;
  remainingAmount?: number;
  status?: Status;
  actions?: Actions;
}

export interface IModalFormProps {
  repaymentAmount: number;
  setRepaymentAmount: (amount: number) => void;
  remainingToPay: number;
  debt?: IDebts;
}

export interface INewDebt {
  creditor: string;
  debtAmount: number;
  dueDate: string;
  interestRate: number;
}

export interface IChartRow {
  date: string;
  debtAmount: number;
  creditAmount: number;
  debtNames: string[];
  creditNames: string[];
}

