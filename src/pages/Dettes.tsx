import { useEffect, useState } from "react"
import { MOCK_DEBT } from "../data/debts.mock";
import type { IDebts } from "../models/debts.interfaces";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import TableAggrid from "../components/agGrid/TableAggrid";
import DebtStats from "../components/cardHeader/CardMemo";
import RepayDebtModal from "../components/modal/RepayDebtModal";
import { debtsCol } from "../utils/aggridData";
import type { IfilterProps } from "../models/ui.interfaces";

ModuleRegistry.registerModules([AllCommunityModule]);

function Dettes({ sortDescDate, filterStatus, filterCard, filterTitle }: IfilterProps) {

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

    //maj de la dette 
    const handleRepayDebt = (updatedDebt: IDebts) => {
        const updatedDebts = debtsRow.map(debt =>
            debt.id === updatedDebt.id ? updatedDebt : debt
        );
        setDebtsRow(updatedDebts);
    };

    // maj nouvelle dette
    const handleAddDebt = (newDebt: IDebts) => {
        setDebtsRow(prev => [...prev, newDebt]);
    };
    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
    }, []);

    return (
        <div className="pb-4">
            {!filterCard && <DebtStats debts={debtsRow} nbrUsers="Créanciers" totalTitle="dettes" />}
            <TableAggrid sortDate={sortDescDate} filterAll={filterStatus} rowData={debtsRow} columnDefs={debtsCol} title={filterTitle ?? "dette"} userTitle="Créancier" onDelete={handleDelete} onOpenModal={handleOpenModal} onAddDebt={handleAddDebt} />

            {isModalOpen && selectedDebt && (
                <RepayDebtModal
                    debt={selectedDebt}
                    onClose={handleCloseModal}
                    onRepay={handleRepayDebt}
                    titleUsers="Dettes fournisseurs"
                />
            )}
        </div>
    )
}

export default Dettes
