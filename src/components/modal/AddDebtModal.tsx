import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import type { IDebts, INewDebt } from "../../models/debts.interfaces";
import { addDebt } from "../../utils/buildDebt";

const AddDebtModal = ({ onClose,onDebtAdded }: { onClose: () => void,onDebtAdded: (d: IDebts) => void }) => {
  const [formData, setFormData] = useState<INewDebt>({
    creditor: "",
    debtAmount: 0,
    interestRate: 0,
    dueDate: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <ModalLayout onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => addDebt(e, formData, onClose, onDebtAdded)}
      >
        <h3 className="font-bold text-lg mb-2 ">Ajouter une dette</h3>
        <div className="flex gap-1">
          <label className="flex-1 self-center">Créancier:</label>
          <input
          name="creditor"
            type="text"
            value={formData.creditor}
            onChange={handleChange}
            className="input input-sm input-secondary"
          />
        </div>

        <div className="flex gap-1">
          <label className="flex-1 self-center">Montant:</label>
          <input
          name="debtAmount"
            type="text"
            value={formData.debtAmount=== 0 ?"":formData.debtAmount}
            placeholder="0.00"
            onChange={handleChange}
            className="input input-sm input-secondary"
          />
        </div>

        <div className="flex gap-1">
          <label className="flex-1 self-center">Taux en pourcent:</label>
          <input
          name="interestRate"
            type="number"
            value={formData.interestRate}
            onChange={handleChange}
            className="input input-sm input-secondary"
          />
        </div>

        <div className="flex gap-1">
          <label className="flex-1 self-center">Date échéance:</label>
          <input
          name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="input input-sm input-secondary"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button type="submit" className="btn btn-secondary">
            Ajouter dette
          </button>
          <button className="btn btn-ghost" onClick={onClose}>
            Annuler
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddDebtModal;
