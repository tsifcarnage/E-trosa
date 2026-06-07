import type { ColDef } from "ag-grid-community";
import type { IDebts } from "./debts.interfaces";

export interface IDataTableProps {
  sortDate?: boolean;
  filterAll?: boolean;
  userTitle?: string;
  title?: string;
  rowData: Object[];
  columnDefs: ColDef[];
  height?: string;
  onDelete: (row: IDebts) => void;
  onOpenModal: (debtData: IDebts) => void;
}
