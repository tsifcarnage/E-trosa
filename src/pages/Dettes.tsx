import { useEffect, useState } from "react"
import Card from "../components/Card"
import type { ICardGrad } from "../models/ui.interfaces"
import { MOCK_DEBT } from "../data/debts.mock";
import type { IDebts } from "../models/debts.interfaces";
// import { statusBadge } from "../utils/debts.logic";

import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import TableAggrid from "../components/TableAggrid";
import { statusBadge } from "../utils/debts.logic";
import type { CustomCellEditorProps } from "ag-grid-react";

// On enregistre TOUTES les fonctionnalités communautaires d'un coup
ModuleRegistry.registerModules([AllCommunityModule]);
const cardDette: ICardGrad[] = [
    { title: "Total dettes", label: 12450, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "Montant à payer", label: 5300, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "Montant restant", label: 7150, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
    { title: "Créanciers", label: 8, unit: "Créanciers", color: "text-blue-300", grad: "blue-card-grad" },
]
const statusCellRenderer = (params: CustomCellEditorProps) => {
    const badgeClass = statusBadge(params.value);
    return (
        <div className="w-full">
            <span className={`${badgeClass} text-xs w-full max-w-20 font-medium`}>{params.value}</span>
        </div>
    );
};
function Dettes() {
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const [debtsCol] = useState<ColDef<IDebts>[]>([
        { field: "dueDate", headerName: "Date échéance", flex: 1, headerClass: 'header-center' },
        { field: "creditor", headerName: "Créancier", flex: 1, headerClass: 'header-center' },
        { field: "debtAmount", headerName: "Montant", flex: 1, headerClass: 'header-center' },
        { field: "remainingAmount", headerName: "Restant", flex: 1, headerClass: 'header-center' },
        { field: "status", headerName: "Status", flex: 1, headerClass: 'header-center', cellRenderer: statusCellRenderer },
        { field: "actions", headerName: "Actions", flex: 1, headerClass: 'header-center' },
    ])

    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
    }, []);

    return (
        <div>
            <Card cards={cardDette} />
            <TableAggrid rowData={debtsRow} columnDefs={debtsCol} />
        </div>
    )
}

export default Dettes
