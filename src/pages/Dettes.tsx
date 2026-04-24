import { useEffect, useMemo, useState } from "react"
import Card from "../components/Card"
import type { ICardGrad } from "../models/ui.interfaces"
import { MOCK_DEBT } from "../data/debts.mock";
import type { IDebts } from "../models/debts.interfaces";
// import { statusBadge } from "../utils/debts.logic";

import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import TableAggrid from "../components/TableAggrid";
import { statusCellRenderer } from "../components/cellRenderers/StatusCell";
import { numberCreditor, totalDebt, totalPaidAmount, totalRemainAmount } from "../utils/debts.calculation";
import { formatDate, formatEuro } from "../utils/debts.logic";
import { actionsCellRenderer } from "../components/cellRenderers/ActionsCell";

ModuleRegistry.registerModules([AllCommunityModule]);

function Dettes() {
    const handleDelete = (row: IDebts) => {
        setDebtsRow(prev => prev.filter(r => r.id !== row.id));
    };
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const totalDebts = useMemo(
        () => formatEuro(totalDebt(debtsRow)),
        [debtsRow]
    );

    const totalAlreadyPaid = useMemo(
        () => formatEuro(totalPaidAmount(debtsRow)),
        [debtsRow]
    );

    const totalRemainAmounts = useMemo(
        () => formatEuro(totalRemainAmount(debtsRow)),
        [debtsRow]
    );

    const totalCreditor = useMemo(
        () => numberCreditor(debtsRow),
        [debtsRow]
    );
    const cardDette: ICardGrad[] = [
        { title: "Total dettes", label: totalDebts, color: "text-red-500", grad: "red-card-grad" },
        { title: "Montant déjà payer", label: totalAlreadyPaid, color: "text-green-500", grad: "green-card-grad" },
        { title: "Montant restant", label: totalRemainAmounts, color: "text-orange-500", grad: "orange-card-grad" },
        { title: "Créanciers", label: totalCreditor, unit: "Créanciers", color: "text-blue-300", grad: "blue-card-grad" },
    ]
    const debtsCol: ColDef<IDebts>[] = ([
        {
            field: "dueDate", headerName: "Date échéance", flex: 1, headerClass: 'header-center', valueFormatter: p => formatDate(p.value)
        },
        { field: "creditor", headerName: "Créancier", flex: 1, headerClass: 'header-center' },
        { field: "debtAmount", headerName: "Montant", valueFormatter: p => formatEuro(p.value), flex: 1, headerClass: 'header-center' },
        { field: "interestRate", headerName: "Taux d'intérêt", valueFormatter: p => p.value.toLocaleString() + "%", flex: 1, headerClass: 'header-center' },
        { field: "remainingAmount", headerName: "Restant", valueFormatter: p => formatEuro(p.value), flex: 1, headerClass: 'header-center' },
        { field: "status", headerName: "Status", flex: 1, headerClass: 'header-center', cellRenderer: statusCellRenderer },
        { field: "actions", headerName: "Actions", flex: 1, headerClass: 'header-center', cellRenderer: actionsCellRenderer },
    ])
    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
    }, []);

    return (
        <div>
            <Card cards={cardDette} />
            <TableAggrid rowData={debtsRow} columnDefs={debtsCol} title="dette" onDelete={handleDelete} />

        </div>
    )
}

export default Dettes
