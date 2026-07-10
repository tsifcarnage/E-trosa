import { useQuery } from "@tanstack/react-query";
import { fetchDebts, fetchCredits } from "../../utils/debts.service";
import { Link } from "react-router-dom";
import type { IProfileStatsProps } from "../../models/profils.interfaces";
import { supabase } from "../../utils/supabaseClient";

const getFinancialStatus = (totalDebt: number, totalCredit: number) => {
    if (totalCredit > totalDebt) return { label: "Financièrement bon", className: "text-success" };
    if (totalCredit === totalDebt) return { label: "Financièrement moyen", className: "text-warning" };
    return { label: "Financièrement mauvais", className: "text-error" };
};

export default function ProfileStats({ user, onLogout, onDeleteAccount }: IProfileStatsProps) {
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
};
    return (
        <section className="flex-2 flex flex-wrap justify-between items-center bg-neutral p-5 rounded-[10px]">
            <div>
                <h3>Total dette: {totalDebt.toFixed(2)}€</h3>
                <h3>Total créance: {totalCredit.toFixed(2)}€</h3>
                <h3 className={status.className}>{status.label}</h3>
            </div>
            <div className="flex flex-col gap-3">
                <Link to={"/dashboard"} className="btn btn-info">Dashboard</Link>
                <button className="btn btn-warning" onClick={onDeleteAccount}>
                    Supprimer le compte
                </button>
                <button className="btn btn-error" onClick={onLogout}>Déconnexion</button>
            </div>

            <dialog id="delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Supprimer le compte</h3>
                    <p className="py-4">Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Annuler</button>
                        </form>
                        <button className="btn btn-error" onClick={handleConfirmDelete}>
                            Confirmer la suppression
                        </button>
                    </div>
                </div>
            </dialog>
        </section>
    );
}