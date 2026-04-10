import { themeQuartz } from "ag-grid-community";
import type { IDataTableProps } from "../models/tableAggrid.interfaces";
import { AgGridReact } from "ag-grid-react";

const themeAgGrid = themeQuartz.withParams({
    backgroundColor: "#0f172a",
    headerBackgroundColor: "#1e293b",
    headerTextColor: "#f16900",
    foregroundColor: "white",
    fontSize: 14,
    headerFontSize: 16,
    fontFamily: "Inter, sans-serif"
});
export default function TableAggrid({ rowData, columnDefs, height = "h-70" }: IDataTableProps) {
    return (
        <div className={`${height} text-center w-full my-10`} >
            <AgGridReact
                theme={themeAgGrid}
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
    )
}
