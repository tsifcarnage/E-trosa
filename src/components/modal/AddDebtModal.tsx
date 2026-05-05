import ModalLayout from "../../layouts/ModalLayout";

const AddDebtModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalLayout onClose={onClose}>
      <form action="" className="flex flex-col gap-4">
        <h3 className="font-bold text-lg mb-2 ">Ajouter une dette</h3>
        <div className="flex gap-1">
          <label htmlFor="" className="flex-1 self-center">
            Créancier:
          </label>
          <input type="text" className="input input-sm input-secondary" />
        </div>

        <div className="flex gap-1">
          <label htmlFor="" className="flex-1 self-center">
            Montant:
          </label>
          <input type="text" className="input input-sm input-secondary" />
        </div>

        <div className="flex gap-1">
          <label htmlFor="" className="flex-1 self-center">
            Taux en pourcent:
          </label>
          <input type="number" className="input input-sm input-secondary" />
        </div>

        <div className="flex gap-1">
          <label htmlFor="" className="flex-1 self-center">
            Date échéance:
          </label>
          <input type="date" className="input input-sm input-secondary" />
        </div>
          <div className="flex justify-end gap-2">
            <button className="btn btn-secondary">
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
