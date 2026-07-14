import { useState } from "react";
import type { IDebts } from "../../models/debts.interfaces";
import { calcStatus } from "../../utils/debts.logic";
import { Status } from "../../enums/status.enum";
import { calcTotalToPay } from "../../utils/debts.calculation";
import ModalLayout from "../../layouts/ModalLayout";
import { DebtDetails, PaymentSuggestions } from "./RepayDebtHeader";
import { AlreadyPaid, AmountTooHigh, RepaymentForm } from "./RepayDebtForm";

const RepayDebtModal = ({ debt, onClose, onRepay, titleUsers }: { debt: IDebts, onClose: () => void, onRepay: (updatedDebt: IDebts) => void, titleUsers: string }) => {
    const [repaymentAmount, setRepaymentAmount] = useState<number>(0);

    const remainingToPay = calcTotalToPay(debt.debtAmount, debt.interestRate) - debt.paidAmount;
    const isAlreadyPaid = (debt.remainingAmount ?? 0) <= 0 || debt.status === Status.PAID;
    // const isAmountTooHigh = repaymentAmount > remainingToPay;
    // On multiplie par 100 et on arrondit à l'entier le plus proche pour comparer des centimes :
    const isAmountTooHigh = Math.round(repaymentAmount * 100) > Math.round(remainingToPay * 100);
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

            <h3 className="font-bold text-lg"> {titleUsers} - {debt.creditor}</h3>
            <DebtDetails debt={debt} />

            <hr className="my-2 opacity-20" />

            {!isAlreadyPaid && (
                <PaymentSuggestions remainingToPay={remainingToPay} setRepaymentAmount={setRepaymentAmount} repaymentAmount={repaymentAmount} />
            )}

            {isAlreadyPaid ? (

                <AlreadyPaid onClose={onClose} />

            ) : isAmountTooHigh ? (

                <AmountTooHigh remainingToPay={remainingToPay} repaymentAmount={repaymentAmount} setRepaymentAmount={setRepaymentAmount} />

            ) : (

                <div className="modal-action  flex-wrap">
                    <div className="w-full">
                        <RepaymentForm remainingToPay={remainingToPay} repaymentAmount={repaymentAmount} setRepaymentAmount={setRepaymentAmount} debt={debt} />
                    </div>

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