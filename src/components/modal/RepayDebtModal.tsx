import { useState } from "react";
import type { IDebts } from "../../models/debts.interfaces";
import { calcStatus, formatEuro } from "../../utils/debts.logic";
import { Status } from "../../enums/status.enum";
import { calcTotalToPay } from "../../utils/debts.calculation";
import ModalLayout from "../../layouts/ModalLayout";
import { DebtDetails, PaymentSuggestions } from "./RepayDebtHeader";
import { RepaymentForm } from "./RepayDebtForm";

const RepayDebtModal = ({ debt, onClose, onRepay }: { debt: IDebts, onClose: () => void, onRepay: (updatedDebt: IDebts) => void }) => {
    const [repaymentAmount, setRepaymentAmount] = useState<number>(0.00);

    const remainingToPay = calcTotalToPay(debt.debtAmount, debt.interestRate) - debt.paidAmount;
    const isAlreadyPaid = (debt.remainingAmount ?? 0) <= 0 || debt.status === Status.PAID;
    const isAmountTooHigh = repaymentAmount > remainingToPay;

    const handleRepayment = () => {
        const newPaidAmount = debt.paidAmount + repaymentAmount;
        const newRemainingAmount = calcTotalToPay(debt.debtAmount, debt.interestRate) - newPaidAmount;

        const updatedDebt = {
            ...debt,
            paidAmount: newPaidAmount,
            remainingAmount: newRemainingAmount,
            status: calcStatus(newRemainingAmount, newPaidAmount, debt.dueDate)
        };

        onRepay(updatedDebt);
        onClose();
    };

    return (

        <ModalLayout onClose={onClose}>

            <h3 className="font-bold text-lg">Aperçu des dettes envers : {debt.creditor}</h3>
            <DebtDetails debt={debt} />

            <hr className="my-2 opacity-20" />

            {!isAlreadyPaid && (
                <PaymentSuggestions remainingToPay={remainingToPay} setRepaymentAmount={setRepaymentAmount} repaymentAmount={repaymentAmount} />
            )}

            {isAlreadyPaid ? (
                /* CAS 1 : La dette est déjà payée */
                <div className="flex flex-col items-center justify-center p-6 bg-success/10 rounded-xl border border-success/30">
                    <div className="text-success text-3xl mb-2">✓</div>
                    <p className="text-success font-bold text-lg uppercase tracking-wide">
                        Paiement déjà remboursé
                    </p>
                    <button className="btn btn-ghost mt-4" onClick={onClose}>Fermer</button>
                </div>
            ) : isAmountTooHigh ? (
                /* CAS 2 : Le montant saisi est trop grand */
                <div className="space-y-4">
                    <div className="alert alert-error shadow-sm">
                        <span>Le montant ({formatEuro(repaymentAmount)}) dépasse le reste à payer ({formatEuro(remainingToPay)}).</span>
                    </div>
                    <button className="btn btn-outline btn-error w-full" onClick={() => setRepaymentAmount(0)}>
                        Corriger le montant
                    </button>
                </div>
            ) : (
                /* CAS 3 : Formulaire normal */
                <div className="modal-action  flex-wrap">
                    <RepaymentForm remainingToPay={remainingToPay} repaymentAmount={repaymentAmount} setRepaymentAmount={setRepaymentAmount} debt={debt} />
                    <div className="mt-4 flex gap-2">
                        <button className="btn btn-primary" onClick={handleRepayment}>
                            Confirmer le remboursement
                        </button>
                        <button className="btn btn-ghost" onClick={onClose}>
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </ModalLayout>
    );
};

export default RepayDebtModal;