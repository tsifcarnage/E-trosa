import { useEffect, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { AllStats } from "../components/cardHeader/CardMemo";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";

// const cardDash: ICardGrad[] = [
//     { title: "Total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
//     { title: "Total à recevoir", label: 9000.00, unit: "€", color: "text-green-500", grad: "green-card-grad" },
//     { title: "Solde net", label: 9000.00, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
//     { title: "Dette en retard", label: 5, unit: "Dettes", color: "text-blue-300", grad: "blue-card-grad" },
// ]

function Dashboard() {
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const [creditRow, setCreditRow] = useState<IDebts[]>([]);
    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
        setCreditRow(MOCK_RECEIVABLES);
    }, [])
    return (
        <div>
            <AllStats debts={debtsRow} receivables={creditRow} />
        </div>
    )
}

export default Dashboard
