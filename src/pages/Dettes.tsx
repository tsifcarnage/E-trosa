import { useEffect, useState } from "react"
import { MOCK_DEBT } from "../data/debts.mock";
import type { IDebts } from "../models/debts.interfaces";
// import { statusBadge } from "../utils/debts.logic";

import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import TableAggrid from "../components/TableAggrid";
import { statusCellRenderer } from "../components/cellRenderers/StatusCell";
import { formatDate, formatEuro, formatInterestRate } from "../utils/debts.logic";
import { actionsCellRenderer } from "../components/cellRenderers/ActionsCell";
import DebtStats from "../components/CardMemo";
import RepayDebtModal from "../components/modal/RepayDebtModal";

ModuleRegistry.registerModules([AllCommunityModule]);

function Dettes() {
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState<IDebts | null>(null);

    const handleDelete = (row: IDebts) => {
        setDebtsRow(prev => prev.filter(r => r.id !== row.id));
    };

    const handleOpenModal = (debtData: IDebts) => {
        setSelectedDebt(debtData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDebt(null);
    };

    // Fonction pour gérer le remboursement (mise à jour de la dette)
    const handleRepayDebt = (updatedDebt: IDebts) => {
        const updatedDebts = debtsRow.map(debt =>
            debt.id === updatedDebt.id ? updatedDebt : debt
        );
        setDebtsRow(updatedDebts);
    };
    const debtsCol: ColDef<IDebts>[] = ([
        {
            field: "dueDate", headerName: "Date échéance", flex: 1, headerClass: 'header-center', valueFormatter: p => formatDate(p.value)
        },
        { field: "creditor", headerName: "Créancier", flex: 1, headerClass: 'header-center' },
        { field: "debtAmount", headerName: "Montant", valueFormatter: p => formatEuro(p.value), flex: 1, headerClass: 'header-center' },
        {
            field: "interestRate", headerName: "Taux d'intérêt", valueFormatter: p => p.value + '%',
            cellStyle: (p) => {
                if (typeof p.value !== "number" || !p.data?.dueDate) return undefined;
                return formatInterestRate(p.value, p.data.dueDate).style;
            }, flex: 1, headerClass: 'header-center'
        },
        { field: "remainingAmount", headerName: "Restant", valueFormatter: p => formatEuro(p.value), flex: 1, headerClass: 'header-center' },
        { field: "status", headerName: "Status", flex: 1, headerClass: 'header-center', cellRenderer: statusCellRenderer },
        { field: "actions", headerName: "Actions", flex: 1, headerClass: 'header-center', cellRenderer: actionsCellRenderer },
    ])
    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
    }, []);

    return (
        <div>
            <DebtStats debts={debtsRow} />
            <TableAggrid rowData={debtsRow} columnDefs={debtsCol} title="dette" onDelete={handleDelete} onOpenModal={handleOpenModal} />

            {isModalOpen && selectedDebt && (
                <RepayDebtModal
                    debt={selectedDebt}
                    onClose={handleCloseModal}
                    onRepay={handleRepayDebt}
                />
            )}
        </div>
    )
}

export default Dettes
