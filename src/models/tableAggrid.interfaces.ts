import type { ColDef } from "ag-grid-community";

export interface IDataTableProps {
  rowData: object[];
  columnDefs: ColDef[];
  height?: string;
}
