import { themeQuartz } from "ag-grid-community";
import type { IDataTableProps } from "../models/tableAggrid.interfaces";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import AddData from "./AddData";
import { ImStatsDots } from "react-icons/im";
import AddDebtModal from "./modal/AddDebtModal";
import type { IDebts } from "../models/debts.interfaces";
import { ChartDebtModal } from "./charts/ChartDebtModal";

const themeAgGrid = themeQuartz.withParams({
  backgroundColor: "#0f172a",
  headerBackgroundColor: "#1e293b",
  headerTextColor: "#f16900",
  foregroundColor: "white",
  fontSize: 14,
  headerFontSize: 16,
  fontFamily: "Inter, sans-serif",
});

export default function TableAggrid({
  userTitle,
  title,
  rowData,
  columnDefs,
  height = "h-100",
  onDelete,
  onOpenModal, onAddDebt
}: IDataTableProps & { onAddDebt: (debt: IDebts) => void }) {

  const [searchText, setSearchText] = useState("");
  const [openDebtForm, setOpenDebtForm] = useState(false);
  const [openChart, setOpenChart] = useState(false);
  return (
    <>
      <div className="mt-10 mx-6 flex justify-between gap-2">
        <h2 className=" self-center">Liste des {title}s</h2>
        <div className="flex justify-center flex-wrap gap-5">
          <h3 onClick={() => setOpenChart(true)} className="flex justify-center self-center cursor-pointer transition-colors duration-300 text-primary font-medium hover:text-success">
            <ImStatsDots size={25} className="self-center mx-2" /> Graphique
          </h3>
          {openChart && <ChartDebtModal onClose={() => setOpenChart(false)} rowData={rowData as IDebts[]} />}

          <AddData title={title ?? ""} onClick={() => setOpenDebtForm(true)} />
          {openDebtForm && <AddDebtModal onClose={() => setOpenDebtForm(false)} onDebtAdded={onAddDebt} addTitle={title??""} userTitleForm={userTitle??""}/>}
          <input
            className="px-2 border border-secondary rounded-xl"
            type="text"
            placeholder="Rechercher..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className={`${height} text-center w-full my-5`}>
        <AgGridReact
          theme={themeAgGrid}
          rowData={rowData}
          columnDefs={columnDefs}
          quickFilterText={searchText}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20]}
          context={{ onDelete, onOpenModal }}
        />
      </div>
    </>
  );
}
