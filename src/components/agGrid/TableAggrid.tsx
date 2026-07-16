import { themeQuartz } from "ag-grid-community";
import type { IDataTableProps } from "../../models/tableAggrid.interfaces";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import AddData from "./AddData";
import { ImStatsDots } from "react-icons/im";
import AddDebtModal from "../modal/AddDebtModal";
import type { IDebts } from "../../models/debts.interfaces";
import { ChartDebtModal } from "../charts/ChartDebtModal";
import { AG_GRID_LOCALE_FR } from "@ag-grid-community/locale";

const themeAgGrid = themeQuartz.withParams({
  backgroundColor: "var(--color-base-100)",
  headerBackgroundColor: "var(--color-neutral)",
  headerTextColor: "var(--color-slate-400)",
  foregroundColor: "var(--color-base-content)",
  fontSize: 14,
  headerFontSize: 16,
  fontFamily: "Inter, sans-serif",
});

export default function TableAggrid({
  sortDate,
  filterAll,
  userTitle,
  title,
  rowData,
  columnDefs,
  height = "h-100",
  onDelete,
  onOpenModal, onAddDebt
}: IDataTableProps & { onAddDebt: (debt: IDebts) => void }) {
  const statusContent = { filterType: 'text', type: 'equals', filter: 'Payé' }
  const dateFilterContent = {
    colId: 'dueDate',
    sort: 'asc'
  } as const;
  const [searchText, setSearchText] = useState("");
  const [openDebtForm, setOpenDebtForm] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  return (
    <>
      <div className="mt-10 mx-6 flex flex-col sm:flex-row justify-between gap-2">
        <h2 className="self-center text-center sm:text-left">Liste des {title}s</h2>
        <div className="flex justify-center flex-wrap gap-3 items-center">
          {!filterAll && !sortDate && (
            <>
              <h3
                onClick={() => setOpenChart(true)}
                className="flex justify-center self-center cursor-pointer transition-colors duration-300 text-primary font-medium hover:text-success"
              >
                <ImStatsDots size={25} className="self-center mx-2" />
                Graphique
              </h3>
              {openChart && (
                <ChartDebtModal
                  onClose={() => setOpenChart(false)}
                  rowData={rowData as IDebts[]}
                />
              )}
              <AddData title={title ?? ""} onClick={() => setOpenDebtForm(true)} />
            </>
          )}
          {openDebtForm && (
            <AddDebtModal
              onClose={() => setOpenDebtForm(false)}
              onDebtAdded={onAddDebt}
              addTitle={title ?? ""}
              userTitleForm={userTitle ?? ""}
            />
          )}
          <input
            className="p-2 border border-secondary rounded-md w-full sm:w-auto"
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className={`${height} text-center w-full my-5 mb-24 md:mb-0`}>
        <AgGridReact
          localeText={AG_GRID_LOCALE_FR}
          theme={themeAgGrid}
          rowData={rowData}
          columnDefs={columnDefs}
          quickFilterText={searchText}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20]}
          context={{ onDelete, onOpenModal }}
          initialState={{
            filter: {
              filterModel: {
                status: filterAll ? { ...statusContent } : undefined,
              }
            },
            sort: sortDate
              ? {
                sortModel: [dateFilterContent],
              }
              : undefined,
          }}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            minWidth: 120,
            flex: 1
          }}
        />
      </div>
    </>
  );
}
