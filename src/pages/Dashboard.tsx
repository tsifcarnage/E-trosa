import { useEffect, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { AllStats } from "../components/cardHeader/CardMemo";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";

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
