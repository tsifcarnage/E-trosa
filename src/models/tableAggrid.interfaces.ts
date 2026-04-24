import type { ColDef } from "ag-grid-community";
import type { IDebts } from "./debts.interfaces";

export interface IDataTableProps {
  title?: string;
  rowData: object[];
  columnDefs: ColDef[];
  height?: string;
  onDelete: (row: IDebts) => void;
}
