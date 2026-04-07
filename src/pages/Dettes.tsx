import { useEffect, useState } from "react"
import Card from "../components/Card"
import type { ICardGrad } from "../models/ui.interfaces"
import { MOCK_DEBT } from "../data/debts.mock";
import type { IDebts } from "../models/debts.interfaces";

const cardDette: ICardGrad[] = [
    { title: "Total dettes", label: 12450, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "Montant à payer", label: 5300, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "Montant restant", label: 7150, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
    { title: "Créanciers", label: 8, unit: "Créanciers", color: "text-blue-300", grad: "blue-card-grad" },
]
function Dettes() {
    const [debts, setDebts] = useState<IDebts[]>([]);

    useEffect(() => {
        setDebts(MOCK_DEBT);
    }, []);

    return (
        <>
            <div>
                <Card cards={cardDette} />
            </div>
            <div className="grid gap-6">
                {debts.map((debt, index) => (
                    <div key={index} className="card bg-base-200 shadow-xl border border-base-300">
                        <div className="card-body flex-row justify-between items-center">
                            <div>
                                <h3 className="card-title text-xl">{debt.creditor}</h3>
                                <p className="text-sm opacity-60 font-medium">Échéance : {debt.dueDate}</p>
                                <div className="mt-2">
                                    <span className={`badge font-bold`}>
                                        {debt.status}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-xs opacity-50 uppercase font-bold">Reste à payer</div>
                                <div className="text-2xl font-mono font-black text-secondary">
                                    {debt.remainingAmount} €
                                </div>
                                <div className="text-xs opacity-70">
                                    Initial : {debt.debtAmount}€ (+{debt.interestAmount}€ intérêts)
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Dettes
