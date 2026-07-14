import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IDebts } from "../models/debts.interfaces";
import TableAggrid from "../components/agGrid/TableAggrid";
import DebtStats from "../components/cardHeader/CardMemo";
import RepayDebtModal from "../components/modal/RepayDebtModal";
import { debtsCol } from "../utils/aggridData";
import type { IfilterProps } from "../models/ui.interfaces";
import { deleteDebt, fetchDebts, insertDebt, updateDebtPayment } from "../utils/debts.service";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { MOCK_DEBT } from "../data/debts.mock";

function Dettes({ sortDescDate, filterStatus, filterCard, filterTitle }: IfilterProps) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState<IDebts | null>(null);

    // Mode démo : état local
    const [demoDebts, setDemoDebts] = useState<IDebts[]>(MOCK_DEBT);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    // Mode connecté : TanStack Query
    const { data: supabaseDebts = [], isLoading, error } = useQuery<IDebts[], Error>({
        queryKey: ['debts', user?.id],
        queryFn: fetchDebts,
        enabled: !!user, // seulement si connecté
        staleTime: 1000 * 60 * 5,
    });

    // Source de données selon le mode
    const debtsRow = user ? supabaseDebts : demoDebts;

    // Mutations Supabase
    const deleteMutation = useMutation({
        mutationFn: (row: IDebts) => deleteDebt("debts", row.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['debts', user?.id] }),
    });

    const repayMutation = useMutation({
        mutationFn: (updatedDebt: IDebts) => updateDebtPayment("debts", updatedDebt.id, updatedDebt.paidAmount),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['debts', user?.id] }),
    });

    const addMutation = useMutation({
        mutationFn: (newDebt: IDebts) => insertDebt({
            creditor: newDebt.creditor,
            debtAmount: newDebt.debtAmount,
            interestRate: newDebt.interestRate,
            dueDate: newDebt.dueDate,
        }, "debts"),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['debts', user?.id] }),
    });

    const handleDelete = (row: IDebts) => {
        if (!user) {
            // Mode démo → état local
            setDemoDebts(prev => prev.filter(d => d.id !== row.id));
        } else {
            deleteMutation.mutate(row);
        }
    };

    const handleRepayDebt = (updatedDebt: IDebts) => {
        if (!user) {
            setDemoDebts(prev => prev.map(d => d.id === updatedDebt.id ? updatedDebt : d));
        } else {
            repayMutation.mutate(updatedDebt);
        }
    };

    const handleAddDebt = (newDebt: IDebts) => {
        if (!user) {
            setDemoDebts(prev => [...prev, newDebt]);
        } else {
            addMutation.mutate(newDebt);
        }
    };

    const handleOpenModal = (debtData: IDebts) => {
        setSelectedDebt(debtData);
        setIsModalOpen(true);
    };

    if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

    if (isLoading && debtsRow.length === 0) return (
        <div className="pb-4 animate-pulse">
            <div className="h-24 bg-base-300 rounded-xl mb-4" />
            <div className="h-96 bg-base-300 rounded-xl" />
        </div>
    );

    return (
        <div className="pb-2">
            {!filterCard && <DebtStats debts={debtsRow} nbrUsers="Créanciers" totalTitle="dettes" />}
            <TableAggrid sortDate={sortDescDate} filterAll={filterStatus} rowData={debtsRow} columnDefs={debtsCol} title={filterTitle ?? "dette"} userTitle="Créancier" onDelete={handleDelete} onOpenModal={handleOpenModal} onAddDebt={handleAddDebt} />

            {isModalOpen && selectedDebt && (
                <RepayDebtModal
                    debt={selectedDebt}
                    onClose={() => setIsModalOpen(false)}
                    onRepay={handleRepayDebt}
                    titleUsers="Dettes fournisseurs"
                />
            )}
        </div>
    );
}

export default Dettes;