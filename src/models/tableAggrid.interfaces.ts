import type { ColDef } from "ag-grid-community";

export interface IDataTableProps {
  title?: string;
  rowData: object[];
  columnDefs: ColDef[];
  height?: string;
}
