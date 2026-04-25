import { useEffect, useRef, useState } from "react";
import type { IDebts } from "../../models/debts.interfaces";
import { calcStatus, formatEuro } from "../../utils/debts.logic";
import { Status } from "../../enums/status.enum";
import { calcTotalToPay } from "../../utils/debts.calculation";

const RepayDebtModal = ({ debt, onClose, onRepay }: { debt: IDebts, onClose: () => void, onRepay: (updatedDebt: IDebts) => void }) => {
    const [repaymentAmount, setRepaymentAmount] = useState<number>(0);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) dialogRef.current.showModal();
    }, []);

    // 1. Définition des états de l'interface
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
        <dialog ref={dialogRef} className="modal bg-[#00000094]">
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                <h3 className="font-bold text-lg">Détails de la dette : {debt.creditor}</h3>

                <div className="py-4 space-y-1">
                    <p>Montant total : <span className="font-semibold">{formatEuro(debt.debtAmount)} </span></p>
                    <p>Intérêt : <span className="text-error font-medium">{debt.interestRate} %</span></p>
                    <p>Déjà réglé : <span className="text-success font-medium">{formatEuro(debt.paidAmount)} </span></p>
                </div>

                <hr className="my-2 opacity-20" />

                {/* --- LOGIQUE D'AFFICHAGE --- */}

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
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium mb-3">Montant à verser, avec intérêt (Reste: {formatEuro(remainingToPay)})</span>
                            </label>
                            <input
                                type="number"
                                value={repaymentAmount}
                                onChange={(e) => setRepaymentAmount(Number(e.target.value))}
                                className="input input-bordered w-full border-primary focus:border-primary-focus"
                                placeholder="0.00"
                                autoFocus
                            />
                        </div>

                        <div className="modal-action flex-wrap">
                            <button className="btn btn-primary" onClick={handleRepayment}>
                                Confirmer le remboursement
                            </button>
                            <button className="btn btn-ghost" onClick={onClose}>
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <form method="dialog" className="modal-backdrop"><button onClick={onClose}>Fermer</button></form>
        </dialog>
    );
};

export default RepayDebtModal;