
import type { IModalFormProps } from "../../models/debts.interfaces";
import { formatDate, formatEuro } from "../../utils/debts.logic";

export const RepaymentForm = ({ repaymentAmount, setRepaymentAmount, remainingToPay, debt }: IModalFormProps) => (
    <div className="">
        <div className="form-control w-full">
            <label className="text-gray-500 ">
                <span className="label-text font-medium mb-3">Montant à verser avant le {formatDate(debt?.dueDate)} (Reste: {formatEuro(remainingToPay)})</span>
            </label>
            <input
                type="number"
                value={repaymentAmount === 0 ? "" : repaymentAmount}
                step="0.50"
                onChange={(e) => setRepaymentAmount(Number(e.target.value))}
                className="input input-bordered w-full border-primary mt-2"
                placeholder="0.00"
            />
        </div>
    </div>
);

export const AlreadyPaid = ({ onClose }: { onClose: () => void }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-success/10 rounded-xl border border-success/30">
        <div className="text-success text-3xl mb-2">✓</div>
        <p className="text-success font-bold text-lg uppercase tracking-wide">
            Paiement déjà remboursé
        </p>
        <button className="btn btn-ghost mt-4" onClick={onClose}>Fermer</button>
    </div>
)

export const AmountTooHigh = ({ repaymentAmount, setRepaymentAmount, remainingToPay }: IModalFormProps) => (
    <div className="space-y-4">
        <div className="alert alert-error shadow-sm">
            <span>Le montant ({formatEuro(repaymentAmount)}) dépasse le reste à payer ({formatEuro(remainingToPay)}).</span>
        </div>
        <button className="btn btn-outline btn-error w-full" onClick={() => setRepaymentAmount(0)}>
            Corriger le montant
        </button>
    </div>
)