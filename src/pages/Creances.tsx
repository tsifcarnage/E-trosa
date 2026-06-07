import { useEffect, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { MOCK_RECEIVABLES } from "../data/debts.mock";
import DebtStats from "../components/cardHeader/CardMemo";
import TableAggrid from "../components/agGrid/TableAggrid";
import RepayDebtModal from "../components/modal/RepayDebtModal";
import { creditCol } from "../utils/aggridData";
import type { IfilterProps } from "../models/ui.interfaces";

function Creances({ sortDescDate, filterStatus, filterCard, filterTitle }: IfilterProps) {
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
    useEffect(() => {
        setDebtsRow(MOCK_RECEIVABLES);
    }, []);

    return (
        <div>
            {!filterCard && <DebtStats debts={debtsRow} nbrUsers="Débiteurs" totalTitle="créances" />}
            <TableAggrid sortDate={sortDescDate} rowData={debtsRow} filterAll={filterStatus} columnDefs={creditCol} title={filterTitle ?? "créance"} userTitle="Débiteur" onDelete={handleDelete} onOpenModal={handleOpenModal} onAddDebt={handleAddDebt} />

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
