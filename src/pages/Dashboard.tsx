import { useEffect, useMemo, useState } from "react";
import type { IDebts } from "../models/debts.interfaces";
import { AllStats } from "../components/cardHeader/CardMemo";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";
import { BuildChartData } from "../components/charts/BuildChartData";
import { ChartAllAmount } from "../components/charts/ChartAllAmount";
import Dettes from "./Dettes";
import Creances from "./Creances";
import { useQuery } from "@tanstack/react-query";
import { fetchDebts, fetchCredits } from "../utils/debts.service";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    // Mode connecté
    const { data: supabaseDebts = [] } = useQuery<IDebts[]>({
        queryKey: ['debts', user?.id],
        queryFn: fetchDebts,
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
    });

    const { data: supabaseCredits = [] } = useQuery<IDebts[]>({
        queryKey: ['credits', user?.id],
        queryFn: fetchCredits,
        enabled: !!user,
        staleTime: 1000 * 60 * 5,
    });

    // Source selon mode
    const debtsRow = user ? supabaseDebts : MOCK_DEBT;
    const creditRow = user ? supabaseCredits : MOCK_RECEIVABLES;

    const chartData = useMemo(() => BuildChartData(debtsRow, creditRow), [debtsRow, creditRow]);

    return (
        <div className="w-full pb-20 md:pb-4">

            <AllStats debts={debtsRow} receivables={creditRow} />

            <div className="w-full pb-5">
                <ChartAllAmount chartData={chartData} />
            </div>

            <div className="m-4 p-4 sm:m-6 sm:p-6">
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

export default Dashboard;