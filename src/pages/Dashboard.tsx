import { useEffect, useMemo, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { AllStats } from "../components/cardHeader/CardMemo";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";
import { BuildChartData } from "../components/charts/BuildChartData";
import { ChartAllAmount } from "../components/charts/ChartAllAmount";
import Dettes from "./Dettes";

function Dashboard() {
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const [creditRow, setCreditRow] = useState<IDebts[]>([]);
    const chartData = useMemo(() => BuildChartData(debtsRow, creditRow), [debtsRow, creditRow])
    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
        setCreditRow(MOCK_RECEIVABLES);
    }, [])
    return (
        <div>
            <AllStats debts={debtsRow} receivables={creditRow} />
            <div>
                <ChartAllAmount chartData={chartData} />
            </div>
            <Dettes filterTitle="dettes proches de l'échéance" filterStatus={false} sortDescDate={true} filterCard={true} />
        </div>
    )
}

export default Dashboard
