import { useEffect, useState } from "react"
import { MOCK_DEBT } from "../data/debts.mock";
import type { IDebts } from "../models/debts.interfaces";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import TableAggrid from "../components/agGrid/TableAggrid";
import DebtStats from "../components/cardHeader/CardMemo";
import RepayDebtModal from "../components/modal/RepayDebtModal";
import { debtsCol } from "../utils/aggridData";
import type { IfilterProps } from "../models/ui.interfaces";
import { deleteDebt, fetchDebts, insertDebt, updateDebtPayment } from "../utils/debts.service";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

ModuleRegistry.registerModules([AllCommunityModule]);

function Dettes({ sortDescDate, filterStatus, filterCard, filterTitle }: IfilterProps) {
    const [user, setUser] = useState<User | null>(null);
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState<IDebts | null>(null);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDebts()
            .then(setDebtsRow)
            .catch((err) => setError(err.message))
        // .finally(() => setLoading(false))
    }, [])
    // Écoute la session
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    // Recharge les dettes quand user change
    useEffect(() => {
        if (!user) {
            setDebtsRow([]);
            return;
        }
        // setLoading(true);
        fetchDebts()
            .then(setDebtsRow)
            .catch((err) => setError(err.message))
        // .finally(() => setLoading(false));
    }, [user]);

    const handleDelete = async (row: IDebts) => {
        try {
            await deleteDebt("debts", row.id);
            setDebtsRow(prev => prev.filter(r => r.id !== row.id));
        } catch (err: any) {
            setError(err.message);
        }
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
    const handleRepayDebt = async (updatedDebt: IDebts) => {
        try {
            await updateDebtPayment("debts", updatedDebt.id, updatedDebt.paidAmount);
            setDebtsRow(prev =>
                prev.map(d => d.id === updatedDebt.id ? updatedDebt : d)
            );
        } catch (err: any) {
            setError(err.message);
        }
    };

    // maj nouvelle dette
    const handleAddDebt = async (newDebt: IDebts) => {
        try {
            const saved = await insertDebt({
                creditor: newDebt.creditor,
                debtAmount: newDebt.debtAmount,
                interestRate: newDebt.interestRate,
                dueDate: newDebt.dueDate,
            });
            setDebtsRow(prev => [...prev, saved]);
        } catch (err: any) {
            setError(err.message);
        }
    };
    // useEffect(() => {
    //     setDebtsRow(MOCK_DEBT);
    // }, []);
    // if (loading) return (
    //     <div className="pb-4 animate-pulse">
    //         <div className="h-24 bg-base-300 rounded-xl mb-4" />
    //         <div className="h-96 bg-base-300 rounded-xl" />
    //     </div>
    // );
    if (error) return <p className="text-red-500">Erreur : {error}</p>;

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
