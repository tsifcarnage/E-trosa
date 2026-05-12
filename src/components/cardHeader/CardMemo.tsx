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
export default function DebtStats({ debts,totalTitle,nbrUsers }: Props) {

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