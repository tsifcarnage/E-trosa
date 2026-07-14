import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDebts, fetchCredits } from "../../utils/debts.service";
import { Link } from "react-router-dom";
import type { IProfileStatsProps } from "../../models/profils.interfaces";
import { supabase } from "../../utils/supabaseClient";
import ModalLayout from "../../layouts/ModalLayout";

const getFinancialStatus = (totalDebt: number, totalCredit: number) => {
    if (totalCredit > totalDebt) return { label: "Financièrement bon", className: "text-success" };
    if (totalCredit === totalDebt) return { label: "Financièrement moyen", className: "text-warning" };
    return { label: "Financièrement mauvais", className: "text-error" };
};

export default function ProfileStats({ user, onLogout }: IProfileStatsProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { data: debts = [] } = useQuery({
        queryKey: ['debts', user.id],
        queryFn: fetchDebts,
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
    });

    const { data: credits = [] } = useQuery({
        queryKey: ['credits', user.id],
        queryFn: fetchCredits,
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
    });

    const totalDebt = debts.reduce((acc, d) => acc + (d.remainingAmount ?? 0), 0);
    const totalCredit = credits.reduce((acc, d) => acc + (d.remainingAmount ?? 0), 0);
    const status = getFinancialStatus(totalDebt, totalCredit);

    const handleConfirmDelete = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        });

        if (response.ok) {
            await supabase.auth.signOut();
        } else {
            const msg = await response.text();
            console.error("Erreur suppression :", msg);
        }
        setIsDeleteModalOpen(false);
    };

    return (
        <section className="flex-2 flex flex-wrap justify-between items-center bg-neutral p-5 rounded-[10px]">
            <div>
                <h3>Total dette: {totalDebt.toFixed(2)}€</h3>
                <h3>Total créance: {totalCredit.toFixed(2)}€</h3>
                <h3 className={`${status.className} mb-2`}>{status.label}</h3>
            </div>
            <div className="flex flex-col gap-3 md:max-w-50 w-full">
                <Link to={"/dashboard"} className="btn btn-info">Dashboard</Link>
                <button className="btn btn-warning" onClick={() => setIsDeleteModalOpen(true)}>
                    Supprimer le compte
                </button>
                <button className="btn btn-error" onClick={onLogout}>Déconnexion</button>
            </div>

            {isDeleteModalOpen && (
                <ModalLayout onClose={() => setIsDeleteModalOpen(false)}>
                    <h3 className="font-bold text-lg text-error">Supprimer le compte</h3>
                    <p className="py-4 text-base-content">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <button className="btn btn-ghost text-base-content" onClick={() => setIsDeleteModalOpen(false)}>
                            Annuler
                        </button>
                        <button className="btn btn-error" onClick={handleConfirmDelete}>
                            Confirmer la suppression
                        </button>
                    </div>
                </ModalLayout>
            )}
        </section>
    );
}