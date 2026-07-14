import { useEffect, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { MOCK_RECEIVABLES } from "../data/debts.mock";
import DebtStats from "../components/cardHeader/CardMemo";
import TableAggrid from "../components/agGrid/TableAggrid";
import RepayDebtModal from "../components/modal/RepayDebtModal";
import { creditCol } from "../utils/aggridData";
import type { IfilterProps } from "../models/ui.interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { deleteDebt, fetchCredits, insertDebt, updateDebtPayment } from "../utils/debts.service";

function Creances({ sortDescDate, filterStatus, filterCard, filterTitle }: IfilterProps) {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState<IDebts | null>(null);

    // Mode démo : état local
    const [demoDebts, setDemoDebts] = useState<IDebts[]>(MOCK_RECEIVABLES);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    // Mode connecté : TanStack Query
    const { data: supabaseDebts = [], isLoading, error } = useQuery<IDebts[], Error>({
        queryKey: ['credits', user?.id],
        queryFn: fetchCredits,
        enabled: !!user, // seulement si connecté
        staleTime: 1000 * 60 * 5,
    });

    // Source de données selon le mode
    const debtsRow = user ? supabaseDebts : demoDebts;

    // Mutations Supabase
    const deleteMutation = useMutation({
        mutationFn: (row: IDebts) => deleteDebt("credits", row.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['credits', user?.id] }),
    });

    const repayMutation = useMutation({
        mutationFn: (updatedDebt: IDebts) => updateDebtPayment("credits", updatedDebt.id, updatedDebt.paidAmount),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['credits', user?.id] }),
    });

    const addMutation = useMutation({
        mutationFn: (newDebt: IDebts) => insertDebt({
            creditor: newDebt.creditor,
            debtAmount: newDebt.debtAmount,
            interestRate: newDebt.interestRate,
            dueDate: newDebt.dueDate,
        }, "credits"),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['credits', user?.id] }),
    });

    const handleDelete = (row: IDebts) => {
        if (!user) {
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
        <div className="pb-4">
            {!filterCard && <DebtStats debts={debtsRow} nbrUsers="Débiteurs" totalTitle="créances" />}
            <TableAggrid sortDate={sortDescDate} rowData={debtsRow} filterAll={filterStatus} columnDefs={creditCol} title={filterTitle ?? "créance"} userTitle="Débiteur" onDelete={handleDelete} onOpenModal={handleOpenModal} onAddDebt={handleAddDebt} />

            {isModalOpen && selectedDebt && (
                <RepayDebtModal
                    debt={selectedDebt}
                    onClose={() => setIsModalOpen(false)}
                    onRepay={handleRepayDebt}
                    titleUsers="Créances clients"
                />
            )}
        </div>
    )
}

export default Creances
