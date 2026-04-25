import type { CustomCellEditorProps } from "ag-grid-react";
import { MdDelete } from "react-icons/md";
import { TbMoneybagMoveBack } from "react-icons/tb";

export const actionsCellRenderer = (params: CustomCellEditorProps) => {
    const handleDelete = () => {
        params.context.onDelete(params.data);
    };
    const handleModal = () => {
        params.context.onOpenModal(params.data);
    };
    return (
        <div className="flex justify-center gap-2">
            <div onClick={handleModal} className="cursor-pointer text-success self-center hover:scale-110" title="Rembourser"><TbMoneybagMoveBack size={22} /></div>
            <p>|</p>
            <div onClick={handleDelete} className="cursor-pointer text-error self-center hover:scale-110" title="Supprimer"><MdDelete size={22} /></div>
        </div>
    )
}
