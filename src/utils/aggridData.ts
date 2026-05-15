import type { ColDef } from "ag-grid-community";
import type { IDebts } from "../models/debts.interfaces";
import { formatDate, formatEuro, formatInterestRate } from "./debts.logic";
import { statusCellRenderer } from "../components/cellRenderers/StatusCell";
import { actionsCellRenderer } from "../components/cellRenderers/ActionsCell";

export const debtsCol: ColDef<IDebts>[] = [
  {
    field: "dueDate",
    headerName: "Date échéance",
    flex: 1,
    headerClass: "header-center",
    valueFormatter: (p) => formatDate(p.value),
  },
  {
    field: "creditor",
    headerName: "Créancier",
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "debtAmount",
    headerName: "Montant",
    valueFormatter: (p) => formatEuro(p.value),
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "interestRate",
    headerName: "Taux d'intérêt",
    valueFormatter: (p) => p.value + "%",
    cellStyle: (p) => {
      if (typeof p.value !== "number" || !p.data?.dueDate) return undefined;
      return formatInterestRate(p.value, p.data.dueDate).style;
    },
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "remainingAmount",
    headerName: "Restant",
    valueFormatter: (p) => formatEuro(p.value),
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerClass: "header-center",
    cellRenderer: statusCellRenderer,
    filter: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    headerClass: "header-center",
    cellRenderer: actionsCellRenderer,
  },
];

export const creditCol: ColDef<IDebts>[] = [
  {
    field: "dueDate",
    headerName: "Date échéance",
    flex: 1,
    headerClass: "header-center",
    valueFormatter: (p) => formatDate(p.value),
  },
  {
    field: "creditor",
    headerName: "Débiteur",
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "debtAmount",
    headerName: "Montant",
    valueFormatter: (p) => formatEuro(p.value),
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "interestRate",
    headerName: "Taux d'intérêt",
    valueFormatter: (p) => p.value + "%",
    cellStyle: (p) => {
      if (typeof p.value !== "number" || !p.data?.dueDate) return undefined;
      return formatInterestRate(p.value, p.data.dueDate).style;
    },
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "remainingAmount",
    headerName: "Restant",
    valueFormatter: (p) => formatEuro(p.value),
    flex: 1,
    headerClass: "header-center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerClass: "header-center",
    cellRenderer: statusCellRenderer,
    filter: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    headerClass: "header-center",
    cellRenderer: actionsCellRenderer,
  },
];
