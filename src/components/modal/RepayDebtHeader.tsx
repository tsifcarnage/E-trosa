import type { IDebts, IModalFormProps } from "../../models/debts.interfaces";
import { formatEuro, formatInterestRate } from "../../utils/debts.logic";

export const DebtDetails = ({ debt }: { debt: IDebts }) => {
    return (
        <div className="py-4 space-y-1">
            <p>Montant total : <span className="font-semibold">{formatEuro(debt.debtAmount)} </span></p>
            <p>Intérêt : <span className="text-error font-medium">{formatInterestRate(debt.interestRate, debt.dueDate).displayRate}</span></p>
            <p>Déjà réglé : <span className="text-success font-medium">{formatEuro(debt.paidAmount)} </span></p>
        </div>
    )
}

export const PaymentSuggestions = ({ repaymentAmount, setRepaymentAmount, remainingToPay }: IModalFormProps) => {
    const suggestions = [0.50, 1.50, 5, 10, 50];
    return (
        <div className="flex justify-center flex-wrap gap-2 my-4">
            {suggestions.map((amount) => (
                <button
                    key={amount}
                    type="button"
                    className={`btn btn-soft btn-sm ${repaymentAmount === amount ? 'btn-primary' : ''}`}
                    onClick={() => setRepaymentAmount(amount)}
                >
                    {formatEuro(amount)}
                </button>
            ))}
            <button
                type="button"
                className="btn btn-outline btn-sm btn-secondary"
                onClick={() => setRepaymentAmount(Number(remainingToPay.toFixed(2)))}
            >
                Tout solder
            </button>
        </div>
    );
};