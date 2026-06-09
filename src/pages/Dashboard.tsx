import { useEffect, useMemo, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { AllStats } from "../components/cardHeader/CardMemo";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";
import { BuildChartData } from "../components/charts/BuildChartData";
import { ChartAllAmount } from "../components/charts/ChartAllAmount";
import Dettes from "./Dettes";
import Creances from "./Creances";

function Dashboard() {
    const [debtsRow, setDebtsRow] = useState<IDebts[]>([]);
    const [creditRow, setCreditRow] = useState<IDebts[]>([]);
    const chartData = useMemo(() => BuildChartData(debtsRow, creditRow), [debtsRow, creditRow])
    useEffect(() => {
        setDebtsRow(MOCK_DEBT);
        setCreditRow(MOCK_RECEIVABLES);
    }, [])
    return (
        <div className="pb-4">
            <AllStats debts={debtsRow} receivables={creditRow} />
            <div >
                <ChartAllAmount chartData={chartData} />
            </div>
            <div className=" m-6 p-6">
                <div className="flex gap-2">
                    <span className="status status-error self-center"></span>
                    <p className="text-error"> Dettes à payer</p>
                </div>
                <div className="flex gap-2">
                    <span className="status status-success self-center"></span>
                    <p className="text-success"> Créances à recevoir</p>
                </div>
            </div>
            <Dettes filterTitle="dettes proches de l'échéance" filterStatus={false} sortDescDate={true} filterCard={true} />
            <Creances filterTitle="créances proches de l'échéance" filterStatus={false} sortDescDate={true} filterCard={true} />
        </div>
    )
}

export default Dashboard
