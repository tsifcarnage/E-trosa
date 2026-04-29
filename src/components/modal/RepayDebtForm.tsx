
import type { IModalFormProps } from "../../models/debts.interfaces";
import { formatDate, formatEuro } from "../../utils/debts.logic";

export const RepaymentForm = ({ repaymentAmount, setRepaymentAmount, remainingToPay, debt }: IModalFormProps) => (
    <div className="space-y-4">
        <div className="form-control">
            <label className="label">
                <span className="label-text font-medium mb-3">Montant à verser avant le {formatDate(debt?.dueDate)} (Reste: {formatEuro(remainingToPay)})</span>
            </label>
            <input
                type="number"
                value={repaymentAmount}
                step="0.50"
                onChange={(e) => setRepaymentAmount(Number(e.target.value))}
                className="input input-bordered w-full border-primary"
                placeholder="0.00"
            />
        </div>
    </div>
);