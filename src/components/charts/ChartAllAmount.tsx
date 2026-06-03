import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatEuro } from "../../utils/debts.logic"
import type { IChartRow } from "../../models/debts.interfaces"

export const ChartAllAmount = ({ chartData }: { chartData: IChartRow[] }) => {
    return (
        <div style={{ width: "100%", padding: "2rem", height: 450 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 40, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#1e293b" />
                    <YAxis
                        stroke="grey"
                        width={80}
                        tickFormatter={(value: number) => formatEuro(value)}
                    />

                    <XAxis
                        dataKey="date"
                        stroke="grey"
                        interval={"preserveEnd"}
                        axisLine={false}
                        tickFormatter={(value: string) => {
                            return value.split("-").reverse().slice(0, 2).join("/")
                        }}
                    />
                    <Tooltip
                        cursor={{
                            radius: 4,
                            stroke: "#1e293b",
                        }}
                        content={({ active, payload }: any) => {
                            if (!active || !payload || payload.length === 0) {
                                return null;
                            }

                            const debtNames = payload[0]?.payload?.debtNames || [];
                            const creditNames = payload[1]?.payload?.creditNames || [];

                            return (
                                <div className="rounded-lg bg-neutral text-neutral-content border border-neutral p-2 shadow-sm">
                                    <div className="flex gap-3">
                                        <div>
                                            <div className="flex flex-col col-span-2">
                                                <span className="text-sm uppercase text-slate-400">Dettes:</span>
                                                <span className="text-xs text-error font-bold">{debtNames.join(", ")}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm uppercase text-slate-400">Montant Dette:</span>
                                                <span className="text-xs text-error font-bold">{formatEuro(payload[0]?.value)}</span>
                                            </div>
                                        </div>
                                        {creditNames.length > 0 && (
                                            <div>
                                                <div className="flex flex-col col-span-2">
                                                    <span className="text-sm uppercase text-slate-400">Crédits:</span>
                                                    <span className="text-xs font-bold text-success">{creditNames.join(", ")}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm uppercase text-slate-400">Montant Crédit:</span>
                                                    <span className="text-xs font-bold text-success">{formatEuro(payload[1]?.value)}</span>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }}
                    />
                    <Line type="monotone" dataKey="debtAmount" stroke="#ef4444" name="Dette" />
                    <Line type="monotone" dataKey="creditAmount" stroke="#22c55e" name="Créance" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}