import type { IChartRow, IDebts } from "../../models/debts.interfaces";


export const BuildChartData = (debts: IDebts[], credits: IDebts[]) => {
    const result: Record<string, IChartRow> = {};

    debts.forEach((item) => {
        if (!result[item.dueDate]) {
            result[item.dueDate] = {
                date: item.dueDate,
                debtAmount: 0,
                creditAmount: 0,
                debtNames: [],
                creditNames: [],
            };
        }
        result[item.dueDate].debtAmount += item.debtAmount;
        if (!result[item.dueDate].debtNames.includes(item.creditor)) {
            result[item.dueDate].debtNames.push(item.creditor);
        }
    });

    credits.forEach((item) => {
        if (!result[item.dueDate]) {
            result[item.dueDate] = {
                date: item.dueDate,
                debtAmount: 0,
                creditAmount: 0,
                debtNames: [],
                creditNames: [],
            };
        }
        result[item.dueDate].creditAmount += item.debtAmount;
        if (!result[item.dueDate].creditNames.includes(item.creditor)) {
            result[item.dueDate].creditNames.push(item.creditor);
        }
    });

    return Object.values(result).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
};