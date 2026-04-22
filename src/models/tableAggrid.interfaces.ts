import type { ColDef } from "ag-grid-community";

export interface IDataTableProps {
  title?: string;
  children?: React.ReactNode;
  rowData: object[];
  columnDefs: ColDef[];
  height?: string;
}
