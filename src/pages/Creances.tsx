import { useEffect, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import type { ColDef } from "ag-grid-community";
import { formatDate, formatEuro, formatInterestRate } from "../utils/debts.logic";
import { MOCK_RECEIVABLES } from "../data/debts.mock";
import DebtStats from "../components/cardHeader/CardMemo";
import TableAggrid from "../components/TableAggrid";
import RepayDebtModal from "../components/modal/RepayDebtModal";
import { statusCellRenderer } from "../components/cellRenderers/StatusCell";
import { actionsCellRenderer } from "../components/cellRenderers/ActionsCell";

function Creances() {
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

    //maj de la creance 
    const handleRepayDebt = (updatedDebt: IDebts) => {
        const updatedDebts = debtsRow.map(debt =>
            debt.id === updatedDebt.id ? updatedDebt : debt
        );
        setDebtsRow(updatedDebts);
    };

    // maj nouvelle creance
    const handleAddDebt = (newDebt: IDebts) => {
    setDebtsRow(prev => [...prev, newDebt]);
};
    const debtsCol: ColDef<IDebts>[] = ([
        {
            field: "dueDate", headerName: "Date échéance", flex: 1, headerClass: 'header-center', valueFormatter: p => formatDate(p.value)
        },
        { field: "creditor", headerName: "Débiteur", flex: 1, headerClass: 'header-center' },
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
        setDebtsRow(MOCK_RECEIVABLES);
    }, []);

    return (
        <div>
            <DebtStats debts={debtsRow} nbrUsers="Débiteurs" totalTitle="créances"/>
            <TableAggrid rowData={debtsRow} columnDefs={debtsCol} title="créance" userTitle="Débiteur" onDelete={handleDelete} onOpenModal={handleOpenModal} onAddDebt={handleAddDebt} />

            {isModalOpen && selectedDebt && (
                <RepayDebtModal
                    debt={selectedDebt}
                    onClose={handleCloseModal}
                    onRepay={handleRepayDebt}
                    titleUsers="Créances clients"
                />
            )}
        </div>
    )
}

export default Creances
