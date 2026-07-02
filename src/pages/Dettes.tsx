import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState<IDebts | null>(null);

    // authentification Supabase 
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    const { data: debtsRow = [], isLoading, error } = useQuery<IDebts[], Error>({
        queryKey: ['debts', user?.id], // Cache lié à l'ID de l'utilisateur
        queryFn: fetchDebts,           // Ta fonction dans debts.service.ts
        enabled: !!user,               // Ne fetch PAS si l'user n'est pas connecté
        staleTime: 1000 * 60 * 5,      // Les données restent "fraîches" 5 min, pas de re-fetch agressif au changement d'onglet
    });

    // Mutation pour Supprimer
    const deleteMutation = useMutation({
        mutationFn: (row: IDebts) => deleteDebt("debts", row.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debts'] });
        }
    });

    // Mutation pour Rembourser / Solder
    const repayMutation = useMutation({
        mutationFn: (updatedDebt: IDebts) => updateDebtPayment("debts", updatedDebt.id, updatedDebt.paidAmount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debts'] });
        }
    });

    // Mutation pour Ajouter une dette
    const addMutation = useMutation({
        mutationFn: (newDebt: IDebts) => insertDebt({
            creditor: newDebt.creditor,
            debtAmount: newDebt.debtAmount,
            interestRate: newDebt.interestRate,
            dueDate: newDebt.dueDate,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['debts'] });
        }
    });

    // Liens avec tableau Ag-Grid
    const handleDelete = (row: IDebts) => deleteMutation.mutate(row);
    const handleRepayDebt = (updatedDebt: IDebts) => repayMutation.mutate(updatedDebt);
    const handleAddDebt = (newDebt: IDebts) => addMutation.mutate(newDebt);

    const handleOpenModal = (debtData: IDebts) => {
        setSelectedDebt(debtData);
        setIsModalOpen(true);
    };

    if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

    // LE SQUELETTE : Ne s'affiche QU'À FROID (première ouverture de l'app)
    // Dès que les données sont en cache, isLoading passe à false directement au changement de page !
    if (isLoading && debtsRow.length === 0) return (
        <div className="pb-4 animate-pulse">
            <div className="h-24 bg-base-300 rounded-xl mb-4" />
            <div className="h-96 bg-base-300 rounded-xl" />
        </div>
    );

    return (
        <div className="pb-4">
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
    )
}

export default Dettes;