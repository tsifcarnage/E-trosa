import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { IDebts } from "../../models/debts.interfaces"
import ModalLayout from "../../layouts/ModalLayout"
import { formatEuro } from "../../utils/debts.logic"

export const ChartDebtModal = ({ onClose, rowData }: { onClose: () => void, rowData: IDebts[] }) => {
    return (
        <ModalLayout onClose={onClose}>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={rowData}
                        margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#1e293b" />
                        <Area dataKey="debtAmount" type={"monotone"} />

                        <YAxis
                            dataKey="debtAmount"
                            stroke="grey"
                            width={80}
                            tickFormatter={(value:number) => formatEuro(value)}
                        />

                        <XAxis
                            dataKey="dueDate"
                            stroke="grey"
                            interval={"preserveEnd"}
                            axisLine={false}
                            tickFormatter={(value: string) => {
                                return value.split("-").reverse().slice(0, 2).join("/")
                            }}
                        />

                        <Tooltip cursor={{
                            radius: 4,
                            stroke: "#1e293b"
                        }}
                            content={({ active, payload }:any) => {
                                if (!active || !payload || payload.length === 0) {
                                    return null;
                                }
                                return (
                                    <div className="rounded-lg bg-neutral text-neutral-content border border-neutral p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm uppercase text-slate-400">Nom: </span>
                                                <span className="text-xs font-bold">{payload[0].payload.creditor}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm uppercase text-slate-400">Montant: </span>
                                                <span className="text-xs font-bold">{formatEuro(payload[0].payload.debtAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </ModalLayout>
    )
}