import { useMemo } from "react";
import { numberCreditor, totalDebt, totalPaidAmount, totalRemainAmount } from "../../utils/debts.calculation";
import { formatEuro } from "../../utils/debts.logic";
import type { ICardGrad } from "../../models/ui.interfaces";
import type { IDebts } from "../../models/debts.interfaces";
import Card from "./Card";

interface TitleProps {
    totalTitle: string;
    nbrUsers: string;
}

interface Props extends TitleProps {
    debts: IDebts[];
}
export default function DebtStats({ debts, totalTitle, nbrUsers }: Props) {

    const stats = useMemo(() => {
        return {
            totalDebts: formatEuro(totalDebt(debts)),
            totalPaid: formatEuro(totalPaidAmount(debts)),
            totalRemain: formatEuro(totalRemainAmount(debts)),
            creditors: numberCreditor(debts),
        };
    }, [debts]);
    const cards: ICardGrad[] = useMemo(() => [
        {
            title: `Total ${totalTitle}`,
            label: stats.totalDebts,
            color: "text-red-500",
            grad: "red-card-grad"
        },
        {
            title: "Montant déjà payé",
            label: stats.totalPaid,
            color: "text-green-500",
            grad: "green-card-grad"
        },
        {
            title: "Montant restant",
            label: stats.totalRemain,
            color: "text-orange-500",
            grad: "orange-card-grad"
        },
        {
            title: nbrUsers,
            label: stats.creditors,
            unit: nbrUsers,
            color: "text-blue-300",
            grad: "blue-card-grad"
        }
    ], [stats]);
    return <Card cards={cards} />;
}
interface allProps {
    debts: IDebts[];        // Tes dettes (à payer)
    receivables: IDebts[];  // Tes créances (à recevoir)
}

export function AllStats({ debts, receivables }: allProps) {

    const stats = useMemo(() => {
        // 1. Total restant à payer (Dettes)
        const toPay = totalRemainAmount(debts);

        // 2. Total restant à recevoir (Créances)
        const toReceive = totalRemainAmount(receivables);

        // 3. Solde net (Ce qu'on doit recevoir - Ce qu'on doit payer)
        const netBalance = toReceive - toPay;

        // 4. Nombre de dettes et créances en retard
        const overdueCount = [...debts, ...receivables].filter(item => {
            const remain = totalRemainAmount([item]);
            const isPastDue = new Date(item.dueDate) < new Date();
            return remain > 0 && isPastDue;
        }).length;

        return {
            totalToPay: formatEuro(toPay),
            totalToReceive: formatEuro(toReceive),
            netBalance: formatEuro(netBalance),
            netBalanceRaw: netBalance, // Conservé pour la logique de couleur (positif/négatif)
            overdue: overdueCount.toString()
        };
    }, [debts, receivables]);

    const cards: ICardGrad[] = useMemo(() => [
        {
            title: "Total à payer",
            label: stats.totalToPay,
            color: "text-red-500",
            grad: "red-card-grad"
        },
        {
            title: "Total à recevoir",
            label: stats.totalToReceive,
            color: "text-green-500",
            grad: "green-card-grad"
        },
        {
            title: "Solde Net",
            label: stats.netBalance,
            // Devient vert si positif (bénéfice) ou rouge si négatif (déficit)
            color: stats.netBalanceRaw >= 0 ? "text-emerald-400" : "text-rose-500",
            grad: stats.netBalanceRaw >= 0 ? "green-card-grad" : "red-card-grad"
        },
        {
            title: "Dettes et créances en retard",
            label: stats.overdue,
            unit: "en retard",
            color: "text-orange-500",
            grad: "orange-card-grad"
        }
    ], [stats]);

    return <Card cards={cards} />;
}